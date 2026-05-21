import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Driver's Test — Alberta | AppointMe" }

export default function ABPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2 text-sm">
          <Link href="/" className="text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <Link href="/drivers-test" className="text-ink/40 hover:text-ink transition-colors">Driver&apos;s Test</Link>
          <span className="text-ink/20">/</span>
          <span className="text-ink font-medium">Alberta</span>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-sm">
          <h1 className="font-display text-4xl text-ink mb-4">Alberta</h1>
          <p className="text-ink/45 leading-relaxed mb-8 text-sm">
            We&apos;re not in Alberta yet. Leave your email and we&apos;ll let
            you know when we launch here.
          </p>
          <a
            href="mailto:hello@appointme.ca?subject=Alberta driver test"
            className="btn-primary px-6 py-3 rounded-xl text-sm font-medium inline-flex"
          >
            Get notified
          </a>
          <div className="mt-8">
            <Link href="/drivers-test" className="text-sm text-ink/35 hover:text-ink transition-colors">
              ← Change province
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
