export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          DeFi Dashboard
        </h1>
        <p className="text-xl text-text-secondary mb-6">
          Real-time Cryptocurrency Trading
        </p>
        <p className="text-text-secondary">
          This dashboard demonstrates Next.js rendering strategies (SSG, SSR, ISR)
          with real-time cryptocurrency data.
        </p>
      </div>
    </main>
  )
}
