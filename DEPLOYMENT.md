# Deployment Guide

This guide covers deploying the CV Portfolio project using **Vercel (Frontend)** + **Railway (Backend)**.

---

## Prerequisites

- GitHub account with repository pushed
- Vercel account ([sign up](https://vercel.com))
- Railway account ([sign up](https://railway.app))
- OpenAI API key ([get one](https://platform.openai.com/api-keys))

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub and select your repository: `cv-vsevolod-berdutin`
5. Railway will detect your monorepo

### Step 2: Configure Backend Service

1. After project creation, click "New Service" → "GitHub Repo"
2. In the service settings:
   - **Root Directory**: `backend`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `yarn start`
   - **Watch Paths**: `backend/**`

### Step 3: Set Environment Variables

In Railway project settings → Variables, add:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=8080
```

**Important:** Replace `your_actual_openai_api_key_here` with your real OpenAI API key (starts with `sk-`)

### Step 4: Deploy

1. Railway will automatically deploy your backend
2. Wait for deployment to complete (usually 2-3 minutes)
3. Railway will provide a URL like: `https://your-backend-name.up.railway.app`
4. **Copy this URL** - you'll need it for Vercel configuration

### Step 5: Test Backend

Test your backend is running:
```bash
curl https://your-backend-name.up.railway.app/health
```

Expected response:
```json
{"status":"ok","timestamp":"2025-01-11T..."}
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `cv-vsevolod-berdutin`
4. Vercel will auto-detect the configuration from `vercel.json`

### Step 2: Configure Build Settings

Vercel should automatically use these settings (from `vercel.json`):

- **Framework Preset**: Other
- **Build Command**: `cd apps/cv-portfolio && yarn build`
- **Output Directory**: `apps/cv-portfolio/dist`
- **Install Command**: `yarn install`

### Step 3: Set Environment Variables

In Vercel project settings → Environment Variables, add:

**Variable Name:** `VITE_API_URL`
**Value:** `https://your-backend-name.up.railway.app` (your Railway backend URL from Part 1)

**Important:** Use the exact Railway URL (without trailing slash)

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend (usually 1-2 minutes)
3. You'll get a URL like: `https://cv-vsevolod-berdutin.vercel.app`

### Step 5: Test Frontend

1. Visit your Vercel URL
2. Navigate to the chat feature in your CV
3. Try sending a message to verify backend connection

---

## Part 3: Update Frontend to Use Backend URL

After deployment, you need to update your frontend code to use the Railway backend URL.

### Option A: Using Environment Variable (Recommended)

Update your API service to use the environment variable:

```typescript
// apps/cv-portfolio/src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

Then use `API_URL` in your fetch calls instead of hardcoded localhost.

### Option B: Check Current Implementation

Let me know if you need help finding and updating the API calls in your code.

---

## Environment Variables Summary

### Railway (Backend)
```env
OPENAI_API_KEY=sk-...your-key
PORT=8080
```

### Vercel (Frontend)
```env
VITE_API_URL=https://your-backend-name.up.railway.app
```

---

## Troubleshooting

### Backend Issues

**Problem:** Backend deployment fails
**Solution:** Check Railway logs for errors. Ensure `OPENAI_API_KEY` is set correctly.

**Problem:** `/health` endpoint returns 404
**Solution:** Ensure Railway root directory is set to `backend`

### Frontend Issues

**Problem:** API calls fail with CORS error
**Solution:** Verify `VITE_API_URL` is set correctly in Vercel. Check Railway backend allows CORS (already configured in your Express app).

**Problem:** Build fails
**Solution:** Ensure all dependencies are in `package.json`. Check Vercel build logs.

### Connection Issues

**Problem:** Frontend can't reach backend
**Solution:**
1. Verify Railway backend is running: `curl https://your-backend.up.railway.app/health`
2. Check `VITE_API_URL` in Vercel matches Railway URL exactly
3. Redeploy frontend after changing environment variables

---

## Post-Deployment

### Automatic Deployments

Both Vercel and Railway are now connected to your GitHub repo:

- **Push to `main` branch** → Automatic deployment to both platforms
- **Pull Requests** → Vercel creates preview deployments

### Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Railway:**
1. Go to Service Settings → Domain
2. Add custom domain
3. Update DNS records

---

## Next Steps

1. ✅ Test your live application
2. ✅ Update README with production URLs
3. ✅ Monitor Railway usage (free tier: $5/month credit)
4. ✅ Monitor Vercel usage (free tier: generous limits)
5. ✅ Set up monitoring/analytics if needed

---

## Support

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Issues:** Open an issue in your GitHub repository
