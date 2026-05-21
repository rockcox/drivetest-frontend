'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function PassportPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/8 sticky top-0 bg-paper/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2 text-sm">
          <Link href="/" className="text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <span className="text-ink font-medium">Passport</span>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-sm w-full">
          <h1 className="font-display text-4xl text-ink mb-4">Passport</h1>
          <p className="text-ink/45 text-sm leading-relaxed mb-10">
            We are building passport appointment booking. Leave your email and we will let you know when it is ready.
          </p>
          {submitted ? (
            <p className="text-ink/50 text-sm">Got it — we will be in touch.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="field flex-1 text-sm" />
              <button type="submit" className="btn-primary px-4 py-2.5 rounded-xl text-sm whitespace-nowrap">Notify me</button>
            </form>
          )}
          <div className="mt-8"><Link href="/" className="text-sm text-ink/30 hover:text-ink transition-colors">← All services</Link></div>
        </div>
      </div>
    </div>
  )
}
