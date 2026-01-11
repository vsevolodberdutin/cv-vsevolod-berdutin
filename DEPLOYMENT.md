# Deployment Guide

This guide covers deploying the CV Portfolio project using **Vercel (Frontend)** + **Render (Backend)**.

---

## Prerequisites

- GitHub account with repository pushed
- Vercel account ([sign up](https://vercel.com))
- Render account ([sign up](https://render.com))
- OpenAI API key ([get one](https://platform.openai.com/api-keys))

---

## Part 1: Deploy Backend to Render (FREE)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easy deployment)
3. Authorize Render to access your repositories

### Step 2: Create Web Service

1. From Render dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository: `cv-vsevolod-berdutin`
3. Render will detect the `render.yaml` configuration file
4. Click "Apply" to use the Blueprint

**Or manually configure:**
- **Name**: `cv-backend` (or your choice)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `yarn install && yarn build`
- **Start Command**: `yarn start`
- **Plan**: **Free** (important!)

### Step 3: Set Environment Variables

In the Render service settings → Environment tab, add:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=8080
```

**Important:** Replace `your_actual_openai_api_key_here` with your real OpenAI API key (starts with `sk-`)

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy (usually 3-5 minutes)
3. Render will provide a URL like: `https://cv-backend-xxxx.onrender.com`
4. **Copy this URL** - you'll need it for Vercel configuration

### Step 5: Test Backend

Test your backend is running:
```bash
curl https://cv-backend-xxxx.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-01-11T..."}
```

**Note:** Free tier services spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds to wake up.

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
**Value:** `https://cv-backend-xxxx.onrender.com` (your Render backend URL from Part 1)

**Important:** Use the exact Render URL (without trailing slash)

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

After deployment, you need to update your frontend code to use the Render backend URL.

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

### Render (Backend)
```env
OPENAI_API_KEY=sk-...your-key
PORT=8080
```

### Vercel (Frontend)
```env
VITE_API_URL=https://cv-backend-xxxx.onrender.com
```

---

## Troubleshooting

### Backend Issues

**Problem:** Backend deployment fails
**Solution:** Check Render logs for errors. Ensure `OPENAI_API_KEY` is set correctly.

**Problem:** `/health` endpoint returns 404
**Solution:** Ensure Render root directory is set to `backend`

**Problem:** Backend is slow to respond (first request)
**Solution:** This is normal on Render's free tier - services spin down after 15 minutes of inactivity

### Frontend Issues

**Problem:** API calls fail with CORS error
**Solution:** Verify `VITE_API_URL` is set correctly in Vercel. Check Render backend allows CORS (already configured in your Express app).

**Problem:** Build fails
**Solution:** Ensure all dependencies are in `package.json`. Check Vercel build logs.

### Connection Issues

**Problem:** Frontend can't reach backend
**Solution:**
1. Verify Render backend is running: `curl https://cv-backend-xxxx.onrender.com/health`
2. Check `VITE_API_URL` in Vercel matches Render URL exactly
3. Redeploy frontend after changing environment variables

---

## Post-Deployment

### Automatic Deployments

Both Vercel and Render are now connected to your GitHub repo:

- **Push to `main` branch** → Automatic deployment to both platforms
- **Pull Requests** → Vercel creates preview deployments
- **Note:** Render free tier may have slower builds than paid tiers

### Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Render:**
1. Go to Service Settings → Custom Domain
2. Add custom domain (requires paid plan for custom domains)
3. Update DNS records

---

## Next Steps

1. ✅ Test your live application
2. ✅ Update README with production URLs
3. ✅ Be aware: Render free tier spins down after 15 min inactivity
4. ✅ Monitor Vercel usage (free tier: generous limits)
5. ✅ Set up monitoring/analytics if needed

---

## Render Free Tier Limitations

**Important to know:**
- ✅ **Completely FREE** (no credit card required)
- ⏰ Services spin down after 15 minutes of inactivity
- 🐌 First request after spin-down takes 30-60 seconds to wake up
- 💾 750 hours/month of instance time (enough for a portfolio)
- 🔄 Auto-deploys from GitHub included

**For production with high traffic**, consider upgrading to Render's paid plan ($7/month) for always-on service.

---

## Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Issues:** Open an issue in your GitHub repository
