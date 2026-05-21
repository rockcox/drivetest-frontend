import Link from 'next/link'

interface Props {
  icon: string
  service: string
  tagline: string
  description: string
  estimatedPrice: string
  province: string
  slug: string
}

export default function ComingSoonPage({ icon, service, tagline, description, estimatedPrice, province, slug }: Props) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <span className="text-sm text-ink font-medium">{service}</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <span className="text-5xl mb-6 block">{icon}</span>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/8 text-ink/50 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-ink/30"></span>
          Coming soon · {province}
        </div>

        <h1 className="font-display text-4xl text-ink mb-3">{service}</h1>
        <p className="text-ink/40 text-sm mb-6">{tagline}</p>
        <p className="text-ink/60 leading-relaxed mb-10 max-w-md mx-auto">{description}</p>

        <div className="card max-w-sm mx-auto text-left mb-8">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-4">When we launch</p>
          <div className="space-y-3">
            {[
              '24/7 monitoring of government booking systems',
              'Instant booking when your slot appears',
              'SMS + email notification',
              `Service fee: ${estimatedPrice} (pay on success only)`,
            ].map(f => (
              <div key={f} className="flex items-start gap-2 text-sm text-ink/60">
                <span className="text-ink/20 mt-0.5">◦</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ink rounded-2xl p-8 text-center mb-10">
          <h2 className="font-display text-xl text-lime mb-2">Get notified when we launch</h2>
          <p className="text-paper/50 text-sm mb-5">Leave your email and we&apos;ll tell you the moment {service.toLowerCase()} booking goes live.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-paper placeholder:text-paper/30 text-sm focus:outline-none focus:border-lime/40"
            />
            <button className="btn-lime px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap">
              Notify me
            </button>
          </div>
        </div>

        <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">
          ← Back to all services
        </Link>
      </div>

      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-center gap-6 text-sm text-ink/30">
          <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
