import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Driver's Test — British Columbia | AppointMe",
  description: 'Book your ICBC road test in BC faster. We monitor the ICBC appointment system and secure your slot when one opens.',
}

const classes = [
  { code: 'Class 7', desc: 'Novice licence (N) — city driving, intersections, lane changes' },
  { code: 'Class 5', desc: 'Full licence — advanced road skills and highway driving' },
  { code: 'Class 6', desc: 'Motorcycle — control, cornering, and traffic scenarios' },
]

const centres = [
  'Vancouver (Point Grey)', 'Vancouver (Boundary)', 'Surrey (Newton)',
  'Surrey (Guildford)', 'Burnaby', 'Richmond', 'Coquitlam',
  'Langley', 'North Vancouver', 'New Westminster', 'Abbotsford', 'Chilliwack',
]

export default function BCPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <Link href="/drivers-test" className="text-ink/40 hover:text-ink transition-colors">Driver&apos;s Test</Link>
            <span className="text-ink/20">/</span>
            <span className="text-ink font-medium">British Columbia</span>
          </div>
          <Link href="/order?province=bc" className="btn-primary text-sm px-4 py-2 rounded-lg">
            Get started →
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-4">British Columbia · ICBC</p>
          <h1 className="font-display text-5xl text-ink mb-5">
            Your ICBC road test,<br />
            <span className="text-ink/30">booked for you.</span>
          </h1>
          <p className="text-ink/50 text-base leading-relaxed max-w-lg">
            ICBC appointments in Metro Vancouver fill up weeks in advance.
            We check the booking system around the clock and claim a spot
            in your name the moment one opens.
          </p>
        </div>

        {/* Test classes */}
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-5">Test classes</p>
          <div className="space-y-3">
            {classes.map(c => (
              <div key={c.code} className="flex items-start gap-5 p-5 bg-white rounded-xl border border-ink/8">
                <span className="font-mono font-bold text-lg text-ink w-20 shrink-0">{c.code}</span>
                <span className="text-sm text-ink/50 leading-relaxed">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-5">ICBC offices</p>
          <div className="flex flex-wrap gap-2">
            {centres.map(c => (
              <span key={c} className="text-sm px-3 py-1.5 bg-white border border-ink/8 rounded-full text-ink/50">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-5">Pricing</p>
          <div className="bg-ink rounded-2xl p-8">
            <div className="flex items-end gap-2 mb-1">
              <span className="font-display text-4xl text-lime">$49</span>
              <span className="text-paper/40 text-sm mb-1.5">service fee</span>
            </div>
            <p className="text-paper/40 text-sm mb-6">Charged only after a booking is confirmed in your name.</p>
            <ul className="space-y-2 text-sm text-paper/60 mb-8">
              {[
                'Monitoring around the clock',
                'Booking confirmed in your name',
                'Email and SMS confirmation',
                'No charge if no slot is found',
              ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-lime/60">—</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/order?province=bc" className="btn-lime w-full flex items-center justify-center rounded-xl py-3 text-sm font-medium">
              Get started
            </Link>
          </div>
          <p className="text-xs text-ink/25 mt-3">
            The ICBC road test fee is charged separately by ICBC at the time of booking.
          </p>
        </div>

        {/* How */}
        <div>
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">How it works</p>
          <div className="space-y-6">
            {[
              { n: '01', t: 'Tell us your preferences', b: 'Test class, preferred offices, and date range.' },
              { n: '02', t: 'We monitor ICBC', b: 'Our system checks for openings every few minutes.' },
              { n: '03', t: 'Slot opens — booked', b: 'We complete the booking in your name immediately.' },
              { n: '04', t: 'You get the confirmation', b: 'ICBC sends the appointment details directly to you.' },
            ].map(step => (
              <div key={step.n} className="flex gap-6">
                <span className="font-mono text-xs text-ink/20 w-6 shrink-0 pt-1">{step.n}</span>
                <div>
                  <p className="font-medium text-ink text-sm">{step.t}</p>
                  <p className="text-sm text-ink/40 mt-0.5">{step.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-sm text-ink/30">
          <Link href="/drivers-test" className="hover:text-ink transition-colors">← Change province</Link>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
