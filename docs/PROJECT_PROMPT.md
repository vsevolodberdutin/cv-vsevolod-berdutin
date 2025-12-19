# Project: Interactive CV Portfolio with DeFi Demo Dashboard

## Project Overview
Create a modern, interactive portfolio application showcasing Vsevolod Berdutin's professional experience through two micro-frontend applications demonstrating advanced React/Next.js capabilities and architectural patterns.

---

## Application Structure

### Micro-Frontend Architecture
- **Two separate applications** using Module Federation
- **Independent deployment** capability
- **Shared dependencies** optimization
- **Runtime integration** between frontends

---

## Application 1: Interactive CV Portfolio (Main Page)

### Technical Requirements
- **Framework**: Next.js 14 with App Router
- **Rendering**: Client-Side Rendering (CSR)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Zustand (lightweight for UI state)

### Layout & Design
**Inspiration**: Claude.ai chat interface (clean, modern, minimalist)

#### Page Structure (Single Column Layout):

**1. Header Section (Fixed/Sticky)**
```
- Professional name: "VSEVOLOD BERDUTIN"
- Title: "Senior Frontend Engineer"
- Subtitle: "React • TypeScript • Next.js • Team Leadership"
```

**2. Hero/About Section (Hardcoded)**
```
Content from CV Summary:
- 8+ years of experience
- Led distributed teams (3-5 engineers)
- 50,000+ internal users at Eastern Europe's largest financial institution
- Fintech, cryptocurrency, and corporate B2B expertise
- AI integration experience (OpenAI GPT, GigaChat)
- Fluent: English (C1), Hebrew (B1/B2), Russian (Native)
```

**3. Interactive Content Sections**
Three prominent buttons that expand/collapse content:

```typescript
interface Section {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

sections = [
  {
    id: 'stack',
    label: 'Tech Stack',
    icon: '🛠️',
    content: [Technical Skills from CV]
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    content: [Professional Experience with expandable job details]
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    content: [Education & Languages]
  }
]
```

**Button Behavior:**
- Click to expand/show content below
- Smooth animations (slide down/fade in)
- Only one section open at a time OR all can be open simultaneously
- Responsive accordion-style component

**4. AI Chat Interface**
```
Component: LLMChatWidget
- Multiline text input (similar to Claude.ai)
- "Ask me about my experience" placeholder
- Send button (arrow icon)
- Chat history display above input
- Loading state with typing indicator
- Responses use OpenAI API or similar LLM
- Context: Pre-loaded with CV information
- Suggested prompts:
  - "What projects have you led?"
  - "Tell me about your AI integration work"
  - "What's your experience with crypto/fintech?"
  - "Describe your team leadership approach"
```

**LLM Integration:**
```typescript
// Backend API route
POST /api/chat
Body: {
  message: string;
  conversationHistory: Message[];
}

Response: {
  reply: string;
  model: string;
}

// Use context injection:
systemPrompt = `You are Vsevolod Berdutin's AI assistant. 
Answer questions about his professional background based on this CV:
[CV_CONTENT_HERE]

Be conversational, professional, and helpful. 
Provide specific examples from the CV when relevant.`
```

**5. Footer Section**
```
Contact Information:
- Phone: +972 555 0 737 02 (click to call)
- Email: vsevolodberdutin@gmail.com (click to email)
- LinkedIn: linkedin.com/in/vsevolodberdutin (icon + link)
- Telegram: t.me/vsevolodberdutin (icon + link)

Actions:
- [Download CV as PDF] button
  - On click: trigger download of pre-generated PDF
  - File: CV_Berdutin_Vsevolod_Senior_Frontend.pdf
- [Upload Your CV] button
  - File input for PDF upload
  - Process and display basic info from uploaded CV
  - Optional: compare user's CV to Vsevolod's stack
```

### Design System
```css
/* Color Palette (inspired by Claude.ai) */
--background: #FFFFFF
--background-secondary: #F7F7F8
--text-primary: #2D2D2D
--text-secondary: #6B6B6B
--accent: #D97706 (amber-600)
--border: #E5E5E5

/* Typography */
- Font Family: Inter or System UI
- Headings: font-weight: 600-700
- Body: font-weight: 400
- Code/Tech: font-family: 'JetBrains Mono', monospace

/* Spacing */
- Container max-width: 768px
- Padding: px-6 md:px-8
- Section gaps: space-y-8 md:space-y-12
```

### Key Features
1. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

2. **Performance Optimization**
   - Code splitting per section
   - Lazy loading for heavy components
   - Optimized images (WebP with fallback)
   - Minimal JavaScript bundle

3. **Accessibility**
   - ARIA labels on all interactive elements
   - Keyboard navigation support
   - Screen reader friendly
   - Focus management for expanded sections

4. **Animations**
   - Smooth transitions (200-300ms)
   - Framer Motion or Tailwind transitions
   - Skeleton loaders for async content

---

## Application 2: DeFi Dashboard Demo (Second Page)

### Technical Requirements
- **Framework**: Next.js 14 with App Router
- **Rendering Strategy**: Mixed (SSR, SSG, ISR demonstration)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Zustand + WebSocket state
- **Charts**: Recharts or Chart.js
- **Real-time Data**: WebSocket connection

### Purpose
Demonstrate advanced Next.js rendering patterns and real-time data handling capabilities in a financial/crypto context.

### Layout (3-Block Architecture)

#### Block 1: Static Market Overview (SSG)
```typescript
// app/defi/market-overview/page.tsx
export async function generateStaticParams() {
  // Pre-render at build time
}

Content:
- Top cryptocurrencies table (static snapshot)
- Market cap rankings
- 24h volume leaders
- Data source: CoinGecko API or mock data
- Regenerated at build time
```

#### Block 2: Live Trading Dashboard (SSR)
```typescript
// app/defi/trading/page.tsx
// Server-side rendered on each request

Content:
- Real-time price ticker (BTC, ETH, SOL, etc.)
- WebSocket connection for live prices
- Interactive candlestick chart
- Order book visualization (mock or real)
- Recent trades feed
- Data source: Binance WebSocket API or mock WebSocket server
```

#### Block 3: Historical Analytics (ISR)
```typescript
// app/defi/analytics/page.tsx
export const revalidate = 3600; // Revalidate every hour

Content:
- 30-day price history charts
- Volume analysis graphs
- Market trend indicators
- Performance metrics
- Data source: Historical API data
- Revalidated periodically
```

### Features

**1. Real-Time Price Updates**
```typescript
// WebSocket integration
const useCryptoWebSocket = (symbols: string[]) => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update prices
    };
    
    return () => ws.close();
  }, [symbols]);
  
  return prices;
};
```

**2. Interactive Charts**
```typescript
Components:
- CandlestickChart (price action)
- LineChart (historical trends)
- BarChart (volume)
- DonutChart (portfolio allocation)

Libraries:
- Recharts (preferred for simplicity)
- Or lightweight-charts for advanced features
```

**3. Currency Converter Widget**
```typescript
Component: CryptoConverter
- Input: Amount in crypto
- Output: Value in USD/EUR/ILS
- Real-time conversion rates
- Swap button for reverse conversion
```

**4. Mock Order Book**
```typescript
Component: OrderBook
- Bids (buy orders) in green
- Asks (sell orders) in red
- Price levels visualization
- Depth chart
- WebSocket updates (simulated)
```

### Design Specifications
```css
/* DeFi Dashboard Theme */
--bg-primary: #0F1419 (dark mode)
--bg-secondary: #1A1F26
--text-primary: #E7E9EA
--text-secondary: #8B98A5
--green-positive: #00D46A
--red-negative: #F6465D
--chart-grid: #2F3336

/* Layout */
- Three-column grid on desktop
- Stacked on mobile
- Fixed header with navigation
- Sticky section headers
```

### Data Sources

**Option 1: Real APIs**
```
- Binance WebSocket: wss://stream.binance.com:9443/ws
- CoinGecko API: https://api.coingecko.com/api/v3
- CryptoCompare: https://min-api.cryptocompare.com
```

**Option 2: Mock Data**
```typescript
// /app/api/mock/prices/route.ts
// Generate realistic price movements
// Simulate WebSocket updates via Server-Sent Events
```

### Rendering Strategy Demonstration

**Visual Indicators:**
```typescript
// Add badges to show rendering method
<Badge variant="ssg">Static Generation</Badge>
<Badge variant="ssr">Server-Side Rendering</Badge>
<Badge variant="isr">Incremental Static Regeneration</Badge>

// Timestamp showing when page was generated/fetched
<div className="text-xs text-gray-500">
  Generated: {new Date().toISOString()}
  Revalidate: {revalidate}s
</div>
```

---

## Backend Implementation

### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes (built-in backend)
- **Additional**: Express.js if separate backend needed
- **WebSocket**: ws library or Socket.io
- **Database** (optional): PostgreSQL or MongoDB for chat history

### API Routes

**1. Chat Endpoint**
```typescript
// /app/api/chat/route.ts
import { OpenAI } from 'openai';

export async function POST(request: Request) {
  const { message, history } = await request.json();
  
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: CV_CONTEXT },
      ...history,
      { role: "user", content: message }
    ],
  });
  
  return Response.json({
    reply: completion.choices[0].message.content
  });
}
```

**2. CV Upload Endpoint**
```typescript
// /app/api/cv/upload/route.ts
import { PDFExtract } from 'pdf.js-extract';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('cv') as File;
  
  // Extract text from PDF
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extractBuffer(await file.arrayBuffer());
  
  // Parse key information
  const parsedCV = parseCVText(data.text);
  
  return Response.json(parsedCV);
}
```

**3. Mock WebSocket Server**
```typescript
// /app/api/ws/prices/route.ts (or separate server)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  // Simulate price updates
  const interval = setInterval(() => {
    const prices = generateMockPrices();
    ws.send(JSON.stringify(prices));
  }, 1000);
  
  ws.on('close', () => clearInterval(interval));
});
```

---

## Module Federation Setup

### Webpack Configuration

**Host Application (Main App)**
```javascript
// next.config.js (App 1 - CV Portfolio)
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cv_portfolio',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Header': './components/Header',
          './Footer': './components/Footer',
          './ChatWidget': './components/ChatWidget',
        },
        remotes: {
          defi_dashboard: `defi_dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18' },
          'react-dom': { singleton: true, requiredVersion: '^18' },
          'next': { singleton: true, requiredVersion: '^14' },
        },
      })
    );
    return config;
  },
};
```

**Remote Application (DeFi Dashboard)**
```javascript
// next.config.js (App 2 - DeFi Dashboard)
module.exports = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'defi_dashboard',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Dashboard': './components/Dashboard',
          './PriceChart': './components/PriceChart',
          './OrderBook': './components/OrderBook',
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'next': { singleton: true },
        },
      })
    );
    return config;
  },
};
```

### Integration Pattern
```typescript
// In CV Portfolio, dynamically import DeFi Dashboard
import dynamic from 'next/dynamic';

const RemoteDashboard = dynamic(
  () => import('defi_dashboard/Dashboard').catch(() => {
    return () => <div>Dashboard unavailable</div>;
  }),
  { ssr: false }
);
```

---

## Docker Setup

### Multi-Container Architecture

**docker-compose.yml**
```yaml
version: '3.8'

services:
  cv-portfolio:
    build:
      context: ./apps/cv-portfolio
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - backend
    networks:
      - app-network

  defi-dashboard:
    build:
      context: ./apps/defi-dashboard
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - cv-portfolio
      - defi-dashboard
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

**Dockerfile (Next.js App)**
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**Nginx Configuration**
```nginx
upstream cv_portfolio {
    server cv-portfolio:3000;
}

upstream defi_dashboard {
    server defi-dashboard:3000;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://cv_portfolio;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /defi {
        proxy_pass http://defi_dashboard;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ws {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## Architecture: Feature-Sliced Design (FSD)

This project follows **Feature-Sliced Design** methodology for better scalability, maintainability, and team collaboration. FSD organizes code by business features rather than technical concerns.

### FSD Principles

1. **Layers** (bottom-up dependency flow):
   - `shared` → `entities` → `features` → `widgets` → `pages` → `app`
   
2. **Slices**: Business domain units (e.g., `cv`, `chat`, `crypto`, `trading`)

3. **Segments**: Technical purposes within slices (e.g., `ui`, `model`, `api`, `lib`)

### FSD Benefits for This Project

- **Isolation**: Each feature is self-contained
- **Reusability**: Shared components/logic in proper layers
- **Scalability**: Easy to add new features without touching existing code
- **Team Collaboration**: Clear boundaries between features
- **Module Federation**: Natural fit for micro-frontend architecture

---

## Project Structure (FSD-based)

```
portfolio-project/
├── apps/
│   ├── cv-portfolio/          # App 1: Main CV site
│   │   ├── src/
│   │   │   ├── app/           # Layer 6: App configuration
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── providers.tsx
│   │   │   │   ├── styles/
│   │   │   │   │   └── globals.css
│   │   │   │   └── api/       # Next.js API routes
│   │   │   │       ├── chat/route.ts
│   │   │   │       └── cv/upload/route.ts
│   │   │   │
│   │   │   ├── pages/         # Layer 5: Page compositions
│   │   │   │   ├── home/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── HomePage.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── widgets/       # Layer 4: Composite blocks
│   │   │   │   ├── header/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   └── Navigation.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── useNavigation.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── hero-section/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   │   └── ProfileInfo.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── chat-widget/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── ChatWidget.tsx
│   │   │   │   │   │   ├── ChatMessage.tsx
│   │   │   │   │   │   ├── ChatInput.tsx
│   │   │   │   │   │   └── SuggestedPrompts.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── useChatStore.ts
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   └── chatSlice.ts
│   │   │   │   │   ├── api/
│   │   │   │   │   │   └── chatApi.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── cv-sections/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── CVSections.tsx
│   │   │   │   │   │   ├── SectionButton.tsx
│   │   │   │   │   │   └── SectionContent.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── useSectionsStore.ts
│   │   │   │   │   │   └── sectionsData.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   └── footer/
│   │   │   │       ├── ui/
│   │   │   │       │   ├── Footer.tsx
│   │   │   │       │   ├── ContactInfo.tsx
│   │   │   │       │   └── CVActions.tsx
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   ├── features/      # Layer 3: User interactions
│   │   │   │   ├── send-message/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── SendMessageForm.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── useSendMessage.ts
│   │   │   │   │   ├── api/
│   │   │   │   │   │   └── sendMessage.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── toggle-section/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── ToggleButton.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── useToggleSection.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── download-cv/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── DownloadButton.tsx
│   │   │   │   │   ├── lib/
│   │   │   │   │   │   └── downloadPDF.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   └── upload-cv/
│   │   │   │       ├── ui/
│   │   │   │       │   ├── UploadButton.tsx
│   │   │   │       │   └── UploadModal.tsx
│   │   │   │       ├── model/
│   │   │   │       │   └── useUploadCV.ts
│   │   │   │       ├── api/
│   │   │   │       │   └── uploadCV.ts
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   ├── entities/      # Layer 2: Business entities
│   │   │   │   ├── cv/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── CVPreview.tsx
│   │   │   │   │   │   └── SkillBadge.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── cvData.ts
│   │   │   │   │   │   └── cvSchema.ts
│   │   │   │   │   ├── lib/
│   │   │   │   │   │   ├── parseCVText.ts
│   │   │   │   │   │   └── formatExperience.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── message/
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── MessageCard.tsx
│   │   │   │   │   │   └── MessageAvatar.tsx
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   └── user/
│   │   │   │       ├── ui/
│   │   │   │       │   └── UserProfile.tsx
│   │   │   │       ├── model/
│   │   │   │       │   └── types.ts
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   └── shared/        # Layer 1: Shared resources
│   │   │       ├── ui/
│   │   │       │   ├── Button/
│   │   │       │   │   ├── Button.tsx
│   │   │       │   │   ├── Button.module.css
│   │   │       │   │   └── index.ts
│   │   │       │   ├── Card/
│   │   │       │   │   ├── Card.tsx
│   │   │       │   │   └── index.ts
│   │   │       │   ├── Input/
│   │   │       │   │   ├── Input.tsx
│   │   │       │   │   └── index.ts
│   │   │       │   ├── Modal/
│   │   │       │   ├── Badge/
│   │   │       │   ├── Spinner/
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── lib/
│   │   │       │   ├── hooks/
│   │   │       │   │   ├── useDebounce.ts
│   │   │       │   │   ├── useMediaQuery.ts
│   │   │       │   │   └── useClickOutside.ts
│   │   │       │   ├── utils/
│   │   │       │   │   ├── cn.ts
│   │   │       │   │   ├── formatDate.ts
│   │   │       │   │   └── validators.ts
│   │   │       │   └── constants/
│   │   │       │       ├── routes.ts
│   │   │       │       └── config.ts
│   │   │       │
│   │   │       ├── api/
│   │   │       │   ├── client.ts
│   │   │       │   ├── types.ts
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       └── config/
│   │   │           ├── env.ts
│   │   │           └── theme.ts
│   │   │
│   │   ├── public/
│   │   │   ├── CV_Berdutin_Vsevolod.pdf
│   │   │   └── assets/
│   │   │
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── defi-dashboard/        # App 2: DeFi demo
│       ├── src/
│       │   ├── app/           # Layer 6: App configuration
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── providers.tsx
│       │   │   ├── market-overview/
│       │   │   │   └── page.tsx  # SSG
│       │   │   ├── trading/
│       │   │   │   └── page.tsx  # SSR
│       │   │   ├── analytics/
│       │   │   │   └── page.tsx  # ISR
│       │   │   └── api/
│       │   │       └── mock/
│       │   │           └── prices/route.ts
│       │   │
│       │   ├── pages/         # Layer 5: Page compositions
│       │   │   ├── dashboard/
│       │   │   │   ├── ui/
│       │   │   │   │   └── DashboardPage.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   │
│       │   ├── widgets/       # Layer 4: Composite blocks
│       │   │   ├── price-ticker/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── PriceTicker.tsx
│       │   │   │   │   └── PriceCard.tsx
│       │   │   │   ├── model/
│       │   │   │   │   ├── usePriceStore.ts
│       │   │   │   │   └── types.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── order-book/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── OrderBook.tsx
│       │   │   │   │   ├── OrderRow.tsx
│       │   │   │   │   └── DepthChart.tsx
│       │   │   │   ├── model/
│       │   │   │   │   ├── useOrderBookStore.ts
│       │   │   │   │   └── types.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── trading-chart/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── TradingChart.tsx
│       │   │   │   │   ├── CandlestickChart.tsx
│       │   │   │   │   └── VolumeChart.tsx
│       │   │   │   ├── model/
│       │   │   │   │   ├── useChartStore.ts
│       │   │   │   │   └── chartConfig.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── market-stats/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── MarketStats.tsx
│       │   │   │   │   └── StatCard.tsx
│       │   │   │   ├── model/
│       │   │   │   │   └── useMarketStats.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── crypto-converter/
│       │   │       ├── ui/
│       │   │       │   ├── CryptoConverter.tsx
│       │   │       │   └── ConversionResult.tsx
│       │   │       ├── model/
│       │   │       │   └── useConverter.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── features/      # Layer 3: User interactions
│       │   │   ├── subscribe-price/
│       │   │   │   ├── model/
│       │   │   │   │   └── useSubscribePrice.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── select-trading-pair/
│       │   │   │   ├── ui/
│       │   │   │   │   └── TradingPairSelector.tsx
│       │   │   │   ├── model/
│       │   │   │   │   └── useSelectPair.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── change-timeframe/
│       │   │   │   ├── ui/
│       │   │   │   │   └── TimeframeButtons.tsx
│       │   │   │   ├── model/
│       │   │   │   │   └── useTimeframe.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── convert-currency/
│       │   │       ├── ui/
│       │   │       │   └── ConvertForm.tsx
│       │   │       ├── model/
│       │   │       │   └── useConvert.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── entities/      # Layer 2: Business entities
│       │   │   ├── crypto/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── CryptoIcon.tsx
│       │   │   │   │   └── CryptoSymbol.tsx
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── cryptoList.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── price/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── PriceDisplay.tsx
│       │   │   │   │   └── PriceChange.tsx
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── formatPrice.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── order/
│       │   │   │   ├── ui/
│       │   │   │   │   └── OrderItem.tsx
│       │   │   │   ├── model/
│       │   │   │   │   └── types.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── market/
│       │   │       ├── model/
│       │   │       │   ├── types.ts
│       │   │       │   └── marketData.ts
│       │   │       └── index.ts
│       │   │
│       │   └── shared/        # Layer 1: Shared resources
│       │       ├── ui/
│       │       │   ├── Chart/
│       │       │   ├── Table/
│       │       │   ├── Badge/
│       │       │   └── index.ts
│       │       │
│       │       ├── lib/
│       │       │   ├── websocket/
│       │       │   │   ├── WebSocketClient.ts
│       │       │   │   ├── useWebSocket.ts
│       │       │   │   └── types.ts
│       │       │   ├── hooks/
│       │       │   │   ├── useRealTimePrice.ts
│       │       │   │   └── useMarketData.ts
│       │       │   └── utils/
│       │       │       ├── formatNumber.ts
│       │       │       ├── calculateChange.ts
│       │       │       └── chartHelpers.ts
│       │       │
│       │       ├── api/
│       │       │   ├── marketApi.ts
│       │       │   ├── priceApi.ts
│       │       │   └── types.ts
│       │       │
│       │       └── config/
│       │           ├── websocket.ts
│       │           └── api.ts
│       │
│       ├── public/
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       ├── package.json
│       └── Dockerfile
│
├── backend/                    # Optional separate backend
│   ├── src/
│   │   ├── server.ts
│   │   ├── websocket/
│   │   │   ├── priceStream.ts
│   │   │   └── handlers.ts
│   │   ├── routes/
│   │   │   ├── chat.ts
│   │   │   └── market.ts
│   │   └── utils/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── nginx.conf
├── package.json               # Root workspace config
└── README.md
```

---

## FSD Layer Descriptions

### Layer 1: `shared`
**Purpose**: Reusable code with no business logic

**Contains**:
- UI components (Button, Input, Modal, etc.)
- Utility functions (formatters, validators)
- Common hooks (useDebounce, useMediaQuery)
- API clients and configs
- Constants and theme

**Rules**:
- ❌ Cannot import from any other layer
- ✅ Can be used by all layers above
- ✅ Pure, reusable, business-agnostic

**Example**:
```typescript
// shared/ui/Button/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Layer 2: `entities`
**Purpose**: Business entities and their representations

**Contains**:
- Entity UI components (CVPreview, CryptoIcon)
- Entity models and types
- Entity-specific utilities
- Data schemas

**Rules**:
- ✅ Can import from `shared`
- ❌ Cannot import from `features`, `widgets`, `pages`, `app`
- ✅ Represents domain objects

**Example**:
```typescript
// entities/cv/model/types.ts
export interface CV {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

// entities/cv/ui/CVPreview.tsx
import { Card } from '@/shared/ui';
import { CV } from '../model/types';

export const CVPreview: React.FC<{ cv: CV }> = ({ cv }) => {
  return (
    <Card>
      <h2>{cv.name}</h2>
      <p>{cv.title}</p>
      {/* ... */}
    </Card>
  );
};
```

### Layer 3: `features`
**Purpose**: User interactions and business operations

**Contains**:
- Interactive features (send-message, toggle-section)
- Feature-specific UI
- Business logic hooks
- API calls for features

**Rules**:
- ✅ Can import from `shared`, `entities`
- ❌ Cannot import from `widgets`, `pages`, `app`
- ✅ Implements user actions

**Example**:
```typescript
// features/send-message/ui/SendMessageForm.tsx
import { Button, Input } from '@/shared/ui';
import { useSendMessage } from '../model/useSendMessage';

export const SendMessageForm = () => {
  const { message, setMessage, sendMessage, isLoading } = useSendMessage();
  
  return (
    <form onSubmit={sendMessage}>
      <Input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about my experience..."
      />
      <Button type="submit" disabled={isLoading}>
        Send
      </Button>
    </form>
  );
};

// features/send-message/model/useSendMessage.ts
import { useState } from 'react';
import { sendMessage as apiSendMessage } from '../api/sendMessage';

export const useSendMessage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await apiSendMessage(message);
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };
  
  return { message, setMessage, sendMessage, isLoading };
};
```

### Layer 4: `widgets`
**Purpose**: Composite UI blocks combining multiple features/entities

**Contains**:
- Complex UI compositions (Header, ChatWidget, OrderBook)
- Widget-specific state management
- Integration of features and entities

**Rules**:
- ✅ Can import from `shared`, `entities`, `features`
- ❌ Cannot import from `pages`, `app`
- ✅ Represents page sections

**Example**:
```typescript
// widgets/chat-widget/ui/ChatWidget.tsx
import { Card } from '@/shared/ui';
import { MessageCard } from '@/entities/message';
import { SendMessageForm } from '@/features/send-message';
import { useChatStore } from '../model/useChatStore';

export const ChatWidget = () => {
  const { messages } = useChatStore();
  
  return (
    <Card className="chat-widget">
      <div className="messages">
        {messages.map(msg => (
          <MessageCard key={msg.id} message={msg} />
        ))}
      </div>
      <SendMessageForm />
    </Card>
  );
};

// widgets/chat-widget/model/useChatStore.ts
import { create } from 'zustand';

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}));
```

### Layer 5: `pages`
**Purpose**: Page-level compositions (route handlers in Next.js)

**Contains**:
- Page layouts
- Widget compositions
- Page-specific logic

**Rules**:
- ✅ Can import from `shared`, `entities`, `features`, `widgets`
- ❌ Cannot import from `app`
- ✅ Represents full pages

**Example**:
```typescript
// pages/home/ui/HomePage.tsx
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { CVSections } from '@/widgets/cv-sections';
import { ChatWidget } from '@/widgets/chat-widget';
import { Footer } from '@/widgets/footer';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroSection />
        <CVSections />
        <ChatWidget />
      </main>
      <Footer />
    </div>
  );
};
```

### Layer 6: `app`
**Purpose**: Application initialization and configuration

**Contains**:
- Next.js App Router files (layout.tsx, page.tsx)
- Global providers (Theme, State, Auth)
- Global styles
- API routes

**Rules**:
- ✅ Can import from all layers
- ✅ Application entry point

**Example**:
```typescript
// app/layout.tsx
import { Providers } from './providers';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// app/page.tsx
import { HomePage } from '@/pages/home';

export default function Home() {
  return <HomePage />;
}

// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};
```

---

## FSD Import Rules

### Public API Pattern
Each slice exports a public API through `index.ts`:

```typescript
// features/send-message/index.ts
export { SendMessageForm } from './ui/SendMessageForm';
export { useSendMessage } from './model/useSendMessage';
export type { Message } from './model/types';

// Import from outside
import { SendMessageForm, useSendMessage } from '@/features/send-message';
```

### Path Aliases (tsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["src/app/*"],
      "@/pages/*": ["src/pages/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/features/*": ["src/features/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
```

### Import Example
```typescript
// ✅ Good - following FSD hierarchy
import { Button } from '@/shared/ui';
import { CVPreview } from '@/entities/cv';
import { SendMessageForm } from '@/features/send-message';
import { ChatWidget } from '@/widgets/chat-widget';

// ❌ Bad - violating hierarchy (feature importing from widget)
import { ChatWidget } from '@/widgets/chat-widget'; // from feature
```

---

## FSD Segments

Within each slice, use these standard segments:

### `ui/` - User Interface
- React components
- Styles (if not using Tailwind)
- Component-specific assets

### `model/` - Business Logic
- State management (Zustand stores)
- Types and interfaces
- Business logic hooks
- Data transformations

### `api/` - External Interactions
- API calls
- WebSocket connections
- External service integrations

### `lib/` - Internal Utilities
- Helper functions specific to the slice
- Constants
- Utilities that don't fit in shared

### `config/` - Configuration
- Slice-specific configuration
- Constants that control behavior

---

## FSD Benefits in This Project

### 1. Module Federation Isolation
```typescript
// Each widget can be exposed through Module Federation
// webpack.config.js
exposes: {
  './ChatWidget': './src/widgets/chat-widget',
  './OrderBook': './src/widgets/order-book',
}
```

### 2. Feature Independence
```typescript
// features/send-message can be:
// - Developed independently
// - Tested in isolation
// - Reused across pages
// - Modified without breaking other features
```

### 3. Clear Team Boundaries
```
Team A works on: features/send-message, widgets/chat-widget
Team B works on: features/upload-cv, widgets/cv-sections
No conflicts - clear ownership
```

### 4. Easy Testing
```typescript
// Test a feature in isolation
import { useSendMessage } from '@/features/send-message';

test('sends message correctly', () => {
  // Test only the feature logic
  // No need to mount entire app
});
```

### 5. Incremental Adoption
```
Start with basic structure:
src/
├── app/
├── shared/
└── features/

Add layers as needed:
src/
├── app/
├── pages/      ← Add when multiple routes exist
├── widgets/    ← Add when components become complex
├── features/
├── entities/   ← Add when domain models emerge
└── shared/
```

---

## Migration Strategy

### Phase 1: Set Up Structure
1. Create FSD folder structure
2. Configure path aliases in tsconfig.json
3. Move existing components to appropriate layers

### Phase 2: Refactor by Layer
1. **Start with `shared`**: Extract reusable UI components
2. **Create `entities`**: Define domain models (CV, Message, Crypto)
3. **Extract `features`**: Identify user interactions
4. **Compose `widgets`**: Combine features and entities
5. **Create `pages`**: Assemble widgets into pages
6. **Configure `app`**: Set up providers and routing

### Phase 3: Establish Conventions
1. Create public APIs (`index.ts`) for each slice
2. Document import rules
3. Set up ESLint rules to enforce boundaries
4. Add architectural decision records (ADRs)

---

## FSD Linting Rules

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // Enforce import boundaries
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'shared',
            allow: ['shared'],
          },
          {
            from: 'entities',
            allow: ['shared', 'entities'],
          },
          {
            from: 'features',
            allow: ['shared', 'entities', 'features'],
          },
          {
            from: 'widgets',
            allow: ['shared', 'entities', 'features', 'widgets'],
          },
          {
            from: 'pages',
            allow: ['shared', 'entities', 'features', 'widgets', 'pages'],
          },
          {
            from: 'app',
            allow: ['shared', 'entities', 'features', 'widgets', 'pages', 'app'],
          },
        ],
      },
    ],
  },
};
```

---

## FSD Documentation

### Slice README Template
```markdown
# Feature: Send Message

## Overview
Allows users to send messages in the chat widget.

## Public API
- `SendMessageForm` - UI component for message input
- `useSendMessage` - Hook for message sending logic

## Dependencies
- `@/shared/ui` - Button, Input components
- `@/entities/message` - Message type

## Usage
\`\`\`typescript
import { SendMessageForm } from '@/features/send-message';

<SendMessageForm />
\`\`\`

## Testing
\`\`\`bash
npm test features/send-message
\`\`\`
```

---

## Implementation Roadmap

### Phase 0: FSD Foundation (Week 0)
0. **Set Up FSD Structure**
   - Create layer folders (app, pages, widgets, features, entities, shared)
   - Configure TypeScript path aliases
   - Set up ESLint boundaries plugin
   - Create documentation for FSD principles
   - Set up public API pattern (index.ts files)

### Phase 1: Foundation (Week 1)
1. **Project Setup**
   - Initialize monorepo with workspaces
   - Set up Next.js apps with TypeScript
   - Configure Tailwind CSS
   - Set up ESLint + Prettier

2. **Shared Layer Development**
   - Create UI components (Button, Input, Card, Modal, Badge)
   - Set up utility functions (formatters, validators)
   - Create common hooks (useDebounce, useMediaQuery)
   - Configure API client
   - Set up constants and theme

3. **CV Portfolio - Basic Layout (shared/entities)**
   - Create CV entity model and types
   - Build Header widget
   - Build Hero/About section widget
   - Build Footer widget
   - Responsive grid system

### Phase 2: Interactive Features (Week 2)
4. **Entities Layer**
   - CV entity (model, UI, lib)
   - Message entity (types, UI components)
   - User entity (profile, types)

5. **Features Layer**
   - toggle-section feature
   - download-cv feature
   - upload-cv feature
   - send-message feature (foundation for chat)

6. **Widgets Layer - CV Portfolio**
   - cv-sections widget (compose toggle features)
   - chat-widget widget (compose message entities + send feature)
   - Smooth animations
   - Mobile responsive behavior

7. **LLM Chat Integration**
   - OpenAI API integration in shared/api
   - Chat model in chat-widget/model
   - Chat UI in chat-widget/ui
   - Conversation history management
   - CV context injection

### Phase 3: DeFi Dashboard (Week 3)
8. **DeFi Entities Layer**
   - crypto entity (icons, symbols, types)
   - price entity (display, formatting)
   - order entity (types, UI)
   - market entity (data models)

9. **DeFi Features Layer**
   - subscribe-price feature (WebSocket logic)
   - select-trading-pair feature
   - change-timeframe feature
   - convert-currency feature

10. **DeFi Widgets Layer**
    - price-ticker widget (SSR block)
    - order-book widget (SSR block)
    - trading-chart widget (SSR block)
    - market-stats widget (SSG block)
    - crypto-converter widget (ISR block)

11. **DeFi Pages Composition**
    - Dashboard page (compose all widgets)
    - SSG/SSR/ISR implementation
    - WebSocket integration
    - Chart integration (Recharts)

### Phase 4: Integration (Week 4)
12. **Module Federation**
    - Configure webpack for both apps
    - Set up remote/host relationship
    - Expose widgets through Module Federation
    - Test cross-app component sharing

13. **Docker & Deployment**
    - Create Dockerfiles
    - Set up docker-compose
    - Configure Nginx reverse proxy
    - Production optimization

### Phase 5: Polish (Week 5)
14. **Performance Optimization**
    - Code splitting by FSD layers
    - Image optimization
    - Lazy loading for widgets
    - Bundle analysis

15. **Testing with FSD**
    - Unit tests for features (isolated)
    - Integration tests for widgets
    - E2E tests for pages
    - Test entities independently

16. **Documentation**
    - FSD architecture documentation
    - Public API documentation for each slice
    - README for each layer
    - Setup guides

---

## Development Guidelines

### FSD Code Standards

#### 1. Slice Organization
```typescript
// ✅ Good - Clear separation of concerns
features/
  send-message/
    ui/
      SendMessageForm.tsx    // UI only
    model/
      useSendMessage.ts      // Logic only
      types.ts               // Types only
    api/
      sendMessage.ts         // API only
    index.ts                 // Public API

// ❌ Bad - Mixed concerns
features/
  send-message/
    SendMessageForm.tsx      // UI + Logic + API mixed
    index.ts
```

#### 2. Public API Exports
```typescript
// ✅ Good - Explicit public API
// features/send-message/index.ts
export { SendMessageForm } from './ui/SendMessageForm';
export { useSendMessage } from './model/useSendMessage';
export type { SendMessageProps } from './model/types';
// Internal implementation details are NOT exported

// Usage
import { SendMessageForm } from '@/features/send-message';

// ❌ Bad - Direct imports bypass public API
import { SendMessageForm } from '@/features/send-message/ui/SendMessageForm';
```

#### 3. Layer Dependencies
```typescript
// ✅ Good - Respects hierarchy
// widgets/chat-widget/ui/ChatWidget.tsx
import { Button } from '@/shared/ui';
import { MessageCard } from '@/entities/message';
import { SendMessageForm } from '@/features/send-message';

// ❌ Bad - Imports from higher layer
// features/send-message/ui/SendMessageForm.tsx
import { ChatWidget } from '@/widgets/chat-widget'; // ❌ feature can't import widget
```

#### 4. State Management with FSD
```typescript
// ✅ Good - State in model segment
// widgets/chat-widget/model/useChatStore.ts
import { create } from 'zustand';

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}));

// widgets/chat-widget/ui/ChatWidget.tsx
import { useChatStore } from '../model/useChatStore';

export const ChatWidget = () => {
  const { messages, addMessage } = useChatStore();
  // ...
};
```

#### 5. Entity Models
```typescript
// ✅ Good - Entity with clear structure
// entities/cv/model/types.ts
export interface CV {
  id: string;
  name: string;
  title: string;
  skills: Skill[];
}

export interface Skill {
  category: string;
  items: string[];
}

// entities/cv/lib/formatCV.ts
export const formatCVForDisplay = (cv: CV): FormattedCV => {
  // Business logic for formatting
};

// entities/cv/ui/CVCard.tsx
import { CV } from '../model/types';
import { formatCVForDisplay } from '../lib/formatCV';

export const CVCard: React.FC<{ cv: CV }> = ({ cv }) => {
  const formatted = formatCVForDisplay(cv);
  return <div>{/* render */}</div>;
};
```

#### 6. Feature Composition
```typescript
// ✅ Good - Feature is self-contained
// features/toggle-section/index.ts
export { ToggleButton } from './ui/ToggleButton';
export { useToggleSection } from './model/useToggleSection';

// features/toggle-section/model/useToggleSection.ts
import { useState, useCallback } from 'react';

export const useToggleSection = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return { isOpen, toggle };
};

// features/toggle-section/ui/ToggleButton.tsx
import { Button } from '@/shared/ui';
import { useToggleSection } from '../model/useToggleSection';

export const ToggleButton: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  return <Button onClick={onToggle}>Toggle</Button>;
};

// Usage in widget
// widgets/cv-sections/ui/CVSections.tsx
import { ToggleButton, useToggleSection } from '@/features/toggle-section';

export const CVSections = () => {
  const { isOpen, toggle } = useToggleSection();
  
  return (
    <div>
      <ToggleButton onToggle={toggle} />
      {isOpen && <div>Section content</div>}
    </div>
  );
};
```

### TypeScript Configuration for FSD
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["src/app/*"],
      "@/pages/*": ["src/pages/*"],
      "@/widgets/*": ["src/widgets/*"],
      "@/features/*": ["src/features/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Code Standards (General)
```typescript
// Use TypeScript strict mode
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}

// Component structure
export interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2
}) => {
  // Component logic
  return (
    // JSX
  );
};
```

### Commit Conventions
```
feat: Add chat widget component
fix: Resolve WebSocket reconnection issue
style: Update DeFi dashboard colors
refactor: Extract price formatting utility
docs: Add API documentation
test: Add chat widget tests
chore: Update dependencies
```

### Best Practices
1. **Component Design**
   - Small, focused components
   - Composition over inheritance
   - Props drilling max 2 levels
   - Use compound components for complex UI

2. **State Management**
   - Use Zustand for global state
   - React Query for server state
   - Local state for UI-only concerns

3. **Performance**
   - Memoize expensive calculations
   - Virtual scrolling for long lists
   - Debounce user inputs
   - Optimize images (WebP, lazy loading)

4. **Accessibility**
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Color contrast compliance

---

## Success Criteria

### Functional Requirements
✅ CV portfolio displays all information from PDF
✅ Interactive sections expand/collapse smoothly
✅ LLM chat responds accurately about experience
✅ CV upload and parsing works correctly
✅ DeFi dashboard shows real-time price updates
✅ All three rendering strategies (SSG/SSR/ISR) demonstrated
✅ Module Federation enables component sharing
✅ Docker deployment works locally

### Non-Functional Requirements
✅ Lighthouse score > 90 on all metrics
✅ First Contentful Paint < 1.5s
✅ Time to Interactive < 3s
✅ Bundle size < 200KB (gzipped)
✅ Mobile responsive (320px - 1920px)
✅ Cross-browser compatible (Chrome, Firefox, Safari)
✅ WCAG 2.1 Level AA compliance

### Demonstration Goals
✅ Showcases modern React/Next.js patterns
✅ Demonstrates micro-frontend architecture
✅ Highlights full-stack capabilities
✅ Shows real-time data handling
✅ Proves Docker/DevOps knowledge
✅ Professional UI/UX design

---

## Technologies Summary

**Frontend**
- React 18
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- Recharts / Chart.js
- Framer Motion

**Backend**
- Node.js 18+
- Next.js API Routes
- OpenAI API
- WebSocket (ws)

**Architecture**
- Module Federation
- Micro-frontends

**DevOps**
- Docker
- Docker Compose
- Nginx

**Development**
- ESLint
- Prettier
- Jest
- Playwright (optional)

---

## Environment Variables

```env
# .env.local

# OpenAI
OPENAI_API_KEY=sk-...

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# Module Federation
NEXT_PUBLIC_DEFI_DASHBOARD_URL=http://localhost:3001

# Optional: Real APIs
COINGECKO_API_KEY=...
BINANCE_WS_URL=wss://stream.binance.com:9443/ws
```

---

## References & Resources

**Architecture**
- Feature-Sliced Design: https://feature-sliced.design/
- FSD Examples: https://github.com/feature-sliced/examples
- FSD Documentation: https://feature-sliced.design/docs

**Design Inspiration**
- Claude.ai interface: https://claude.ai/new
- DeFi dashboards: Uniswap, Aave, Compound

**Documentation**
- Next.js: https://nextjs.org/docs
- Module Federation: https://module-federation.io/
- Recharts: https://recharts.org/
- Tailwind CSS: https://tailwindcss.com/docs
- Zustand: https://github.com/pmndrs/zustand

**APIs**
- OpenAI: https://platform.openai.com/docs
- CoinGecko: https://www.coingecko.com/en/api
- Binance: https://binance-docs.github.io/apidocs/

---

## Notes

This project serves as a comprehensive portfolio piece demonstrating:

1. **Frontend Mastery**: Advanced React patterns, performance optimization
2. **Modern Architecture**: Feature-Sliced Design methodology for scalable, maintainable code
3. **Micro-Frontend Skills**: Module Federation, modular design
4. **Full-Stack Capability**: API development, WebSocket integration
5. **DevOps Knowledge**: Docker, container orchestration
6. **UX/UI Design**: Clean, modern interface inspired by leading applications
7. **Real-World Application**: Fintech/DeFi domain relevance
8. **Best Practices**: Clear layer separation, public API pattern, testability

### Why Feature-Sliced Design?

**For Employers**:
- Shows understanding of scalable architecture patterns
- Demonstrates ability to organize large codebases
- Indicates experience with team collaboration structures
- Proves knowledge of modern frontend methodologies

**For Development**:
- Easy to navigate and understand codebase
- Clear boundaries between different parts of application
- Simple to test features in isolation
- Natural fit for micro-frontend architecture
- Reduces cognitive load when working on specific features

**For This Project**:
- **CV Portfolio**: Benefits from clear separation between chat, CV display, and file upload features
- **DeFi Dashboard**: Perfect for isolating trading, analytics, and market data widgets
- **Module Federation**: Each FSD widget can be independently exposed and consumed
- **Team Scalability**: Multiple developers can work on different features without conflicts

The dual-app structure allows showcasing both personal branding (CV site) and technical depth (DeFi dashboard) while demonstrating the ability to integrate separate applications using modern architectural patterns. The FSD approach ensures the code remains maintainable and scalable as the project grows.
