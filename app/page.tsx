import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AppointMe — Skip the Queue on Any Government Appointment',
}

const services = [
  {
    slug: 'drivetest',
    icon: '🚗',
    name: 'Driver\'s Test',
    tagline: 'G, G2, M, M2 road tests',
    description: 'We scan DriveTest.ca 24/7 for cancellations and book your Ontario road test the moment a slot opens.',
    price: 'From $49',
    badge: 'Live',
    badgeColor: 'bg-lime text-ink',
    available: true,
    province: 'Ontario',
  },
  {
    slug: 'passport',
    icon: '📘',
    name: 'Passport',
    tagline: 'Renewal & first-time applications',
    description: 'Skip the months-long wait for a passport appointment at Service Canada or Passport Canada offices.',
    price: 'From $59',
    badge: 'Coming soon',
    badgeColor: 'bg-ink/10 text-ink/50',
    available: false,
    province: 'Canada-wide',
  },
  {
    slug: 'citizenship',
    icon: '🍁',
    name: 'Citizenship Test',
    tagline: 'IRCC ceremony & test slots',
    description: 'Automatically grab IRCC citizenship test and ceremony appointment slots when they become available.',
    price: 'From $49',
    badge: 'Coming soon',
    badgeColor: 'bg-ink/10 text-ink/50',
    available: false,
    province: 'Canada-wide',
  },
  {
    slug: 'health-card',
    icon: '🏥',
    name: 'Health Card',
    tagline: 'OHIP & provincial health cards',
    description: 'Book ServiceOntario health card appointments without the wait. New cards, renewals, and replacements.',
    price: 'From $29',
    badge: 'Coming soon',
    badgeColor: 'bg-ink/10 text-ink/50',
    available: false,
    province: 'Ontario',
  },
  {
    slug: 'sin',
    icon: '🔢',
    name: 'SIN Appointment',
    tagline: 'Social Insurance Number',
    description: 'Get a Service Canada appointment for a new SIN card or replacement without waiting weeks for availability.',
    price: 'From $29',
    badge: 'Coming soon',
    badgeColor: 'bg-ink/10 text-ink/50',
    available: false,
    province: 'Canada-wide',
  },
  {
    slug: 'coming-soon',
    icon: '➕',
    name: 'More services',
    tagline: 'Vehicle permits, nexus, study permits...',
    description: 'We\'re expanding to cover every government appointment Canadians struggle to book. Request a service.',
    price: null,
    badge: 'Request',
    badgeColor: 'bg-ink/10 text-ink/50',
    available: false,
    province: null,
  },
]

const stats = [
  { value: '24/7', label: 'Monitoring' },
  { value: '< 4 min', label: 'Check interval' },
  { value: '$0', label: 'Upfront cost' },
  { value: '100%', label: 'Pay on success' },
]

const steps = [
  { n: '01', title: 'Pick your service', body: 'Select the type of government appointment you need. Tell us your preferences — location, date range, time of day.' },
  { n: '02', title: 'We watch 24/7', body: 'Our system checks for openings every few minutes, day and night. You don\'t have to do a thing.' },
  { n: '03', title: 'Slot found — booked', body: 'The moment a matching cancellation appears, we book it in your name before anyone else can.' },
  { n: '04', title: 'You only pay if we win', body: 'No slot found? No charge. Our fee is collected only after a confirmed booking lands in your inbox.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink tracking-tight">
            AppointMe
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-ink/50 hover:text-ink transition-colors hidden sm:block">How it works</Link>
            <Link href="#services" className="text-sm text-ink/50 hover:text-ink transition-colors hidden sm:block">Services</Link>
            <Link href="/drivetest" className="btn-primary text-sm px-4 py-2 rounded-lg">
              Book now →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime/30 text-ink text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-pulse"></span>
            Driver's test booking live in Ontario
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight text-balance mb-5">
            Your government appointment,<br/>
            <span className="text-ink/40">without the wait.</span>
          </h1>
          <p className="text-lg text-ink/60 max-w-xl leading-relaxed mb-8">
            We monitor government booking systems around the clock and secure your slot the moment a cancellation appears.
            Road tests, passports, citizenship — you pay only when we succeed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/drivetest" className="btn-lime px-6 py-3 rounded-xl text-base font-medium">
              Book a driver's test
            </Link>
            <Link href="#services" className="btn-outline px-6 py-3 rounded-xl text-base">
              See all services
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink/8 rounded-2xl overflow-hidden mt-14 border border-ink/8">
          {stats.map(s => (
            <div key={s.label} className="bg-paper px-6 py-5">
              <p className="font-display text-3xl text-ink">{s.value}</p>
              <p className="text-sm text-ink/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-2">Services</p>
          <h2 className="font-display text-3xl text-ink">What can we book for you?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.slug} className={`group relative rounded-2xl border p-6 flex flex-col gap-3 transition-all duration-200 ${
              s.available
                ? 'bg-ink text-paper border-ink cursor-pointer hover:scale-[1.02] hover:shadow-xl'
                : 'bg-white border-ink/8 opacity-70'
            }`}>
              {/* Badge */}
              <div className="flex items-start justify-between">
                <span className={`text-2xl`}>{s.icon}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-display text-xl ${s.available ? 'text-lime' : 'text-ink'}`}>
                  {s.name}
                </h3>
                <p className={`text-sm mt-0.5 ${s.available ? 'text-paper/50' : 'text-ink/40'}`}>
                  {s.tagline}
                </p>
              </div>

              <p className={`text-sm leading-relaxed flex-1 ${s.available ? 'text-paper/70' : 'text-ink/50'}`}>
                {s.description}
              </p>

              <div className="flex items-center justify-between mt-1">
                {s.price && (
                  <span className={`text-sm font-medium ${s.available ? 'text-lime' : 'text-ink/40'}`}>
                    {s.price}
                  </span>
                )}
                {s.province && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.available ? 'bg-white/10 text-paper/50' : 'bg-ink/5 text-ink/30'
                  }`}>
                    {s.province}
                  </span>
                )}
              </div>

              {s.available && (
                <Link href={`/${s.slug}`} className="absolute inset-0 rounded-2xl" aria-label={`Book ${s.name}`} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-medium tracking-widest text-paper/30 uppercase mb-2">How it works</p>
            <h2 className="font-display text-3xl text-paper">Simple by design.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(step => (
              <div key={step.n} className="flex flex-col gap-3">
                <span className="font-mono text-xs text-lime/60">{step.n}</span>
                <h3 className="font-display text-xl text-lime">{step.title}</h3>
                <p className="text-sm text-paper/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: '🔒', title: 'Your data is protected', body: 'Credentials encrypted with AES-256. Deleted the moment your booking is confirmed. We never store card numbers.' },
            { icon: '💳', title: 'Pay only on success', body: 'No subscription. No upfront fee. Your card is authorized at sign-up and only charged when we deliver a confirmed booking.' },
            { icon: '🤝', title: 'We act as your agent', body: 'You authorize us to book on your behalf. The appointment is yours — in your name, at your chosen location.' },
          ].map(t => (
            <div key={t.title} className="card">
              <span className="text-2xl mb-3 block">{t.icon}</span>
              <h3 className="font-display text-lg text-ink mb-2">{t.title}</h3>
              <p className="text-sm text-ink/50 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-3xl p-10 sm:p-14 text-center">
          <h2 className="font-display text-4xl text-lime mb-4">Ready to stop waiting?</h2>
          <p className="text-paper/60 mb-8 max-w-md mx-auto">Start with our live driver's test service. More government appointments launching soon across Canada.</p>
          <Link href="/drivetest" className="btn-lime px-8 py-3.5 rounded-xl text-base font-medium inline-flex">
            Find my driver's test slot →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-ink">AppointMe</span>
            <span className="text-ink/20">·</span>
            <span className="text-sm text-ink/30">Canada</span>
          </div>
          <div className="flex gap-6 text-sm text-ink/40">
            <Link href="/drivetest" className="hover:text-ink transition-colors">Driver's Test</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
