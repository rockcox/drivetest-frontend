import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Request a Service — AppointMe' }

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <span className="text-sm text-ink font-medium">Request a service</span>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <span className="text-5xl mb-6 block">🗂️</span>
          <h1 className="font-display text-4xl text-ink mb-4">What appointment do you need?</h1>
          <p className="text-ink/50 leading-relaxed mb-8">Tell us which government service you&apos;d like us to automate and we&apos;ll prioritize it for our next launch.</p>
          <a href="mailto:hello@appointme.ca?subject=Service request" className="btn-lime px-6 py-3 rounded-xl text-sm font-medium inline-flex">
            Request a service →
          </a>
          <div className="mt-8">
            <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">← Back to all services</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
