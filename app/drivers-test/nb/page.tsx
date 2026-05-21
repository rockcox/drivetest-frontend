import Link from 'next/link'
export default function Page() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/8 sticky top-0 bg-paper z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2 text-sm">
          <Link href="/" className="text-ink/40 hover:text-ink">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <Link href="/drivers-test" className="text-ink/40 hover:text-ink">Driver&apos;s Test</Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-sm">
          <h1 className="font-display text-4xl text-ink mb-4">Not here yet</h1>
          <p className="text-ink/45 text-sm leading-relaxed mb-8">We do not cover this province yet. Get in touch and we will let you know when we do.</p>
          <div className="flex flex-col gap-3">
            <a href="mailto:hello@appointme.ca?subject=Province request" className="btn-primary px-6 py-3 rounded-xl text-sm font-medium inline-flex justify-center">Get notified</a>
            <Link href="/drivers-test" className="text-sm text-ink/35 hover:text-ink transition-colors">← Change province</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
