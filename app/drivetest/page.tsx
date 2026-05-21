import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DriveSlot — Book Your Ontario Road Test Earlier | AppointMe',
  description: 'We scan DriveTest.ca 24/7 and book your G2, G, M2 or M road test the moment a cancellation appears. Pay only when we succeed.',
}

const testTypes = [
  { class: 'G2', label: 'G2 Road Test', desc: 'First road test — graduated licence', price: 49 },
  { class: 'G', label: 'G Road Test', desc: 'Full licence — highway included', price: 59 },
  { class: 'M2', label: 'M2 Road Test', desc: 'Motorcycle — basic skills test', price: 49 },
  { class: 'M', label: 'M Road Test', desc: 'Motorcycle — full licence', price: 59 },
]

const centres = [
  'Toronto Metro East', 'Toronto Metro West', 'Mississauga', 'Brampton',
  'Scarborough', 'North York', 'Etobicoke', 'Oakville', 'Burlington',
  'Hamilton', 'Kitchener', 'London', 'Windsor', 'Ottawa', 'Kingston',
  'Barrie', 'Sudbury', 'Thunder Bay',
]

const faqs = [
  {
    q: 'Will the booking actually be in my name?',
    a: 'Yes — we log in as you and complete the booking under your Ontario driver\'s licence. The confirmation email from DriveTest.ca goes directly to you.',
  },
  {
    q: 'How quickly do you find slots?',
    a: 'Cancellations happen daily. Most customers find a booking within 1–3 days. We check every 4–8 minutes around the clock.',
  },
  {
    q: 'What if I want to cancel my search?',
    a: 'Cancel any time before we find a slot — no charge, no questions. Just email us or click cancel in your status page.',
  },
  {
    q: 'Do you charge the MTO road test fee too?',
    a: 'The MTO fee ($53.75–$91.25 depending on test class) is charged by DriveTest.ca at the time of booking, billed to your card. Our service fee is separate and only charged on success.',
  },
  {
    q: 'Is this allowed?',
    a: 'We act as your authorized booking agent — you give us permission to book on your behalf, which is no different from a travel agent booking flights for you. We don\'t resell slots or create fake accounts.',
  },
]

export default function DriveTestPage() {
  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <span className="text-sm text-ink font-medium">Driver's Test</span>
          </div>
          <Link href="/order" className="btn-primary text-sm px-4 py-2 rounded-lg">
            Start my search →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">🚗</span>
            <span className="text-xs font-medium tracking-widest text-ink/40 uppercase">Ontario · DriveTest</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight text-balance mb-5">
            Your G2 test,<br />
            <span className="text-ink/40">months earlier.</span>
          </h1>
          <p className="text-lg text-ink/60 leading-relaxed max-w-xl mb-8">
            DriveTest centres are booked for months. We scan for cancellations
            24/7 and book the moment a slot opens. You pay only when we succeed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/order" className="btn-lime px-6 py-3 rounded-xl text-base font-medium">
              Find my slot — $49
            </Link>
            <Link href="#how" className="btn-outline px-6 py-3 rounded-xl text-base">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Test types */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">Test classes we book</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testTypes.map(t => (
            <Link href="/order" key={t.class} className="card hover:border-ink/20 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-2xl font-bold text-ink group-hover:text-ink">{t.class}</span>
                <span className="text-sm font-medium text-ink/40">${t.price}</span>
              </div>
              <p className="font-medium text-ink text-sm">{t.label}</p>
              <p className="text-xs text-ink/40 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-medium tracking-widest text-paper/30 uppercase mb-8">How it works</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '01', t: 'Tell us what you need', b: 'Pick your test class, preferred DriveTest centres, and the date range you want.' },
              { n: '02', t: 'We scan every 4–8 min', b: 'Our system checks DriveTest.ca around the clock — faster than any human could.' },
              { n: '03', t: 'Instant booking', b: 'The moment a cancellation matches your criteria, we book it before anyone else can.' },
              { n: '04', t: 'Pay only on success', b: 'No slot, no charge. Our fee is collected only after a booking is confirmed in your name.' },
            ].map(step => (
              <div key={step.n} className="flex flex-col gap-3">
                <span className="font-mono text-xs text-lime/60">{step.n}</span>
                <h3 className="font-display text-xl text-lime">{step.t}</h3>
                <p className="text-sm text-paper/60 leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">Centres we cover</p>
        <div className="flex flex-wrap gap-2">
          {centres.map(c => (
            <span key={c} className="text-sm px-3 py-1.5 bg-white border border-ink/8 rounded-full text-ink/60">
              {c}
            </span>
          ))}
          <span className="text-sm px-3 py-1.5 bg-ink/5 border border-ink/8 rounded-full text-ink/40 italic">
            + more on request
          </span>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <div className="card-ink rounded-2xl p-7">
            <p className="font-mono text-xs text-lime/60 mb-4">G2 / M2</p>
            <p className="font-display text-4xl text-lime mb-1">$49</p>
            <p className="text-paper/50 text-sm mb-5">Service fee · Pay on success</p>
            <ul className="space-y-2 text-sm text-paper/70">
              {['24/7 monitoring', 'Instant booking', 'SMS + email alerts', 'Free cancellation'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-lime">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/order" className="btn-lime mt-6 w-full flex items-center justify-center rounded-xl py-2.5 text-sm font-medium">
              Book G2 / M2 →
            </Link>
          </div>
          <div className="card-ink rounded-2xl p-7">
            <p className="font-mono text-xs text-lime/60 mb-4">G / M</p>
            <p className="font-display text-4xl text-lime mb-1">$59</p>
            <p className="text-paper/50 text-sm mb-5">Service fee · Pay on success</p>
            <ul className="space-y-2 text-sm text-paper/70">
              {['24/7 monitoring', 'Instant booking', 'SMS + email alerts', 'Free cancellation'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-lime">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/order" className="btn-lime mt-6 w-full flex items-center justify-center rounded-xl py-2.5 text-sm font-medium">
              Book G / M →
            </Link>
          </div>
        </div>
        <p className="text-xs text-ink/30 mt-4">+ MTO road test fee ($53.75–$91.25) charged by DriveTest.ca at time of booking.</p>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-8">FAQ</p>
        <div className="max-w-2xl space-y-6">
          {faqs.map(faq => (
            <div key={faq.q} className="border-b border-ink/8 pb-6 last:border-0">
              <h3 className="font-medium text-ink mb-2">{faq.q}</h3>
              <p className="text-sm text-ink/50 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-ink rounded-3xl p-10 text-center">
          <h2 className="font-display text-3xl text-lime mb-3">Stop refreshing DriveTest.ca</h2>
          <p className="text-paper/60 mb-6 text-sm max-w-sm mx-auto">We'll watch it for you and book the moment something opens.</p>
          <Link href="/order" className="btn-lime px-8 py-3 rounded-xl text-sm font-medium inline-flex">
            Start my search →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-ink/40">
            <Link href="/" className="hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <span>Driver's Test</span>
          </div>
          <div className="flex gap-5 text-sm text-ink/40">
            <Link href="/" className="hover:text-ink transition-colors">All services</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
