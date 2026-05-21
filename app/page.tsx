import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AppointMe — Government Appointments, Without the Wait',
  description: 'We monitor government booking systems and secure your appointment the moment a slot opens. Pay only when we succeed.',
}

const services = [
  {
    slug: 'drivers-test',
    name: "Driver's Test",
    tagline: 'Road test booking for any licence class',
    dark: true,
  },
  {
    slug: 'passport',
    name: 'Passport',
    tagline: 'Renewal and first-time applications',
    dark: false,
  },
  {
    slug: 'citizenship',
    name: 'Citizenship',
    tagline: 'Test and ceremony appointments',
    dark: false,
    icon: '🍁',
  },
  {
    slug: 'health-card',
    name: 'Health Card',
    tagline: 'Provincial health card appointments',
    dark: false,
  },
  {
    slug: 'sin',
    name: 'SIN',
    tagline: 'Social Insurance Number appointments',
    dark: false,
  },
  {
    slug: 'coming-soon',
    name: 'More services',
    tagline: 'Vehicle permits, study permits, and more',
    dark: false,
    muted: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">

      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink tracking-tight">AppointMe</Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-ink/40">
            <Link href="#how-it-works" className="hover:text-ink transition-colors">How it works</Link>
            <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight text-balance mb-5">
            Government appointments,<br />
            <span className="text-ink/35">without the wait.</span>
          </h1>
          <p className="text-lg text-ink/50 leading-relaxed">
            We monitor booking systems around the clock and secure your slot
            the moment one opens. You only pay when we succeed.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => {
            const card = (
              <div className={`rounded-2xl p-8 flex flex-col gap-3 h-full min-h-[160px] transition-all duration-200 ${
                s.dark
                  ? 'bg-ink text-paper hover:bg-ink/90'
                  : s.muted
                    ? 'bg-white border border-dashed border-ink/15 text-ink/40 cursor-default'
                    : 'bg-white border border-ink/10 text-ink hover:border-ink/25 hover:shadow-sm'
              }`}>
                <div className="flex items-center gap-2">
                  <h2 className={`font-display text-2xl ${s.dark ? 'text-lime' : s.muted ? 'text-ink/30' : 'text-ink'}`}>
                    {s.name}
                  </h2>
                  {s.icon && <span className="text-xl">{s.icon}</span>}
                </div>
                <p className={`text-sm leading-relaxed ${s.dark ? 'text-paper/50' : s.muted ? 'text-ink/25' : 'text-ink/45'}`}>
                  {s.tagline}
                </p>
                {!s.muted && (
                  <div className={`mt-auto text-sm font-medium ${s.dark ? 'text-lime/70' : 'text-ink/30'}`}>
                    Select province →
                  </div>
                )}
              </div>
            )

            return s.muted ? (
              <div key={s.slug}>{card}</div>
            ) : (
              <Link key={s.slug} href={`/${s.slug}`} className="flex">
                <div className="flex-1">{card}</div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-ink/8">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="font-display text-3xl text-ink mb-12">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { n: '01', t: 'Pick a service', b: 'Choose the type of government appointment you need and your province.' },
              { n: '02', t: 'We watch 24/7', b: 'Our system checks for openings every few minutes, day and night.' },
              { n: '03', t: 'Slot opens — booked', b: 'The moment a cancellation appears, we book it in your name.' },
              { n: '04', t: 'You pay on success', b: 'No appointment found, no charge. We only bill on a confirmed booking.' },
            ].map(step => (
              <div key={step.n} className="flex flex-col gap-3">
                <span className="font-mono text-xs text-ink/25">{step.n}</span>
                <h3 className="font-display text-xl text-ink">{step.t}</h3>
                <p className="text-sm text-ink/45 leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/8 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-ink/50">AppointMe</span>
          <div className="flex gap-6 text-sm text-ink/30">
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
