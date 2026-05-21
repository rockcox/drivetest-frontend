import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICBC Road Test Booking Vancouver — AppointMe',
  description: 'Can\'t get an ICBC road test appointment in Vancouver? We monitor ICBC 24/7 and book your Class 5 or Class 7 test the moment a cancellation opens. Pay only when we succeed.',
}

const classes = [
  { code: 'Class 7', name: 'Class 7 Road Test', sub: 'Novice licence (N) → full', price: 49, desc: 'Pass to move from your N to a full Class 5. Tested on city driving, lane changes, intersections.' },
  { code: 'Class 5', name: 'Class 5 Road Test', sub: 'Learner (L) → novice (N)', price: 49, desc: 'First road test after holding your L for 12 months. Tests basic vehicle control and traffic rules.' },
  { code: 'Class 6', name: 'Class 6 Road Test', sub: 'Motorcycle licence', price: 59, desc: 'Motorcycle road test for your Class 6 licence. Tested on control, cornering, and traffic scenarios.' },
]

const centres = [
  'Vancouver (Point Grey)', 'Vancouver (Boundary)', 'Surrey (Newton)',
  'Surrey (Guildford)', 'Burnaby', 'Richmond', 'Coquitlam',
  'Langley', 'Abbotsford', 'Chilliwack', 'North Vancouver', 'New Westminster',
]

const faqs = [
  {
    q: 'How does this work with ICBC?',
    a: 'We log into the ICBC appointment system as your authorized booking agent and claim an available slot the moment one opens. The appointment is created under your name and BC licence number.',
  },
  {
    q: 'How long does it typically take?',
    a: 'ICBC cancellations happen daily — particularly in the mornings when no-shows are confirmed. Most customers find a booking within 2–7 days depending on how flexible you are with location and time.',
  },
  {
    q: 'What\'s the difference between early access and live?',
    a: 'Early access means we\'re running the ICBC scanner in beta with a limited number of customers. Your order is placed in the queue and will be activated within 48 hours of signing up. You\'re only charged on success.',
  },
  {
    q: 'Do I need to do anything after signing up?',
    a: 'Nothing. We\'ll text and email you the moment a slot is confirmed. Just show up on time with your BC licence and a roadworthy vehicle.',
  },
  {
    q: 'What if I want a specific examiner or time of day?',
    a: 'You can specify morning, afternoon, weekday or weekend preferences. We can\'t target a specific examiner but we can filter for time of day.',
  },
]

export default function BCDriversTestPage() {
  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <Link href="/drivers-test" className="text-sm text-ink/40 hover:text-ink transition-colors">Driver&apos;s Test</Link>
            <span className="text-ink/20">/</span>
            <span className="text-sm text-ink font-medium">British Columbia</span>
          </div>
          <Link href="/order?province=bc" className="btn-primary text-sm px-4 py-2 rounded-lg">
            Join early access →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🏔️</span>
              <span className="text-xs font-medium tracking-widest text-ink/35 uppercase">British Columbia · ICBC</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-ink/8 text-ink/60 ml-1">Early access</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight text-balance mb-5">
              Your ICBC test,<br />
              <span className="text-ink/35">booked faster.</span>
            </h1>
            <p className="text-lg text-ink/55 leading-relaxed max-w-lg mb-8">
              ICBC appointments in Vancouver are booked weeks out.
              We monitor the ICBC system around the clock and grab
              a cancellation the moment it appears. You pay only when
              your appointment is confirmed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/order?province=bc" className="btn-lime px-6 py-3 rounded-xl text-base font-medium">
                Join early access — $49
              </Link>
              <Link href="#how" className="btn-outline px-6 py-3 rounded-xl text-base">
                How it works
              </Link>
            </div>
            <p className="text-xs text-ink/30 mt-4">Only charged if we successfully book your appointment.</p>
          </div>

          {/* Live stats card */}
          <div className="card-ink rounded-2xl p-7">
            <p className="text-xs font-medium tracking-widest text-paper/30 uppercase mb-5">System status</p>
            <div className="space-y-4">
              {[
                { label: 'Monitoring', value: 'ICBC Appointment System', status: 'active' },
                { label: 'Scan frequency', value: 'Every 4–8 minutes', status: 'active' },
                { label: 'Coverage', value: '12 centres across Metro Vancouver', status: 'active' },
                { label: 'Early access', value: 'Open — limited spots', status: 'open' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/8 last:border-0">
                  <span className="text-sm text-paper/40">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'active' ? 'bg-lime' : 'bg-yellow-400'}`}></span>
                    <span className="text-sm text-paper/80">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Test classes */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">Test classes we book</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {classes.map(c => (
            <Link href={`/order?province=bc&class=${encodeURIComponent(c.code)}`} key={c.code}
              className="card hover:border-ink/20 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-2xl font-bold text-ink">{c.code}</span>
                <span className="text-sm font-medium text-ink/40">${c.price}</span>
              </div>
              <p className="font-medium text-ink text-sm">{c.name}</p>
              <p className="text-xs text-ink/40 mt-0.5 mb-3">{c.sub}</p>
              <p className="text-sm text-ink/50 leading-relaxed">{c.desc}</p>
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
              { n: '01', t: 'Tell us what you need', b: 'Choose your test class, preferred ICBC offices in Metro Vancouver, and date range.' },
              { n: '02', t: 'We scan ICBC 24/7', b: 'Our system checks the ICBC booking portal every few minutes. No manual refreshing needed.' },
              { n: '03', t: 'Slot opens → booked', b: 'The moment a matching cancellation appears, we complete the booking before anyone else.' },
              { n: '04', t: 'You pay only on success', b: 'No appointment found? No charge. Our $49 fee is collected only on confirmed booking.' },
            ].map(step => (
              <div key={step.n} className="flex flex-col gap-3">
                <span className="font-mono text-xs text-lime/60">{step.n}</span>
                <h3 className="font-display text-xl text-lime">{step.t}</h3>
                <p className="text-sm text-paper/55 leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centres */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">ICBC offices we cover</p>
        <div className="flex flex-wrap gap-2">
          {centres.map(c => (
            <span key={c} className="text-sm px-3 py-1.5 bg-white border border-ink/8 rounded-full text-ink/55">
              {c}
            </span>
          ))}
          <span className="text-sm px-3 py-1.5 bg-ink/5 border border-dashed border-ink/15 rounded-full text-ink/35 italic">
            + Tri-Cities, Fraser Valley on request
          </span>
        </div>
      </section>

      {/* Compare Ontario */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-paper-warm rounded-2xl border border-ink/8 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="font-medium text-ink text-sm">Based in Ontario instead?</p>
            <p className="text-ink/45 text-sm mt-0.5">Full booking service is live now for DriveTest G, G2, M2, and M road tests.</p>
          </div>
          <Link href="/drivers-test/on" className="btn-outline px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shrink-0">
            Ontario — book now →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-8">FAQ</p>
        <div className="max-w-2xl space-y-6">
          {faqs.map(faq => (
            <div key={faq.q} className="border-b border-ink/8 pb-6 last:border-0">
              <h3 className="font-medium text-ink mb-2">{faq.q}</h3>
              <p className="text-sm text-ink/45 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-3xl p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-paper/60 text-xs font-medium mb-4">
            Early access · Limited spots
          </div>
          <h2 className="font-display text-3xl text-lime mb-3">Stop refreshing the ICBC portal</h2>
          <p className="text-paper/50 mb-6 text-sm max-w-sm mx-auto">Join early access and we&apos;ll monitor for you — you only pay when we deliver.</p>
          <Link href="/order?province=bc" className="btn-lime px-8 py-3 rounded-xl text-sm font-medium inline-flex">
            Join early access →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-ink/35">
            <Link href="/" className="hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <Link href="/drivers-test" className="hover:text-ink transition-colors">Driver&apos;s Test</Link>
            <span className="text-ink/20">/</span>
            <span>BC</span>
          </div>
          <div className="flex gap-5 text-sm text-ink/35">
            <Link href="/drivers-test/on" className="hover:text-ink transition-colors">Ontario</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
