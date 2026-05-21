import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AppointMe — Skip the Queue on Any Government Appointment in Canada',
  description: 'Automated booking for government appointments across Canada. Driver\'s tests, passports, citizenship — we monitor 24/7 and book the moment a slot opens. Pay only when we succeed.',
}

const provinces = [
  { code: 'bc', name: 'British Columbia', short: 'BC', flag: '🏔️' },
  { code: 'on', name: 'Ontario', short: 'ON', flag: '🍁' },
  { code: 'ab', name: 'Alberta', short: 'AB', flag: '🌾' },
  { code: 'qc', name: 'Québec', short: 'QC', flag: '⚜️' },
  { code: 'ns', name: 'Nova Scotia', short: 'NS', flag: '🦞' },
  { code: 'mb', name: 'Manitoba', short: 'MB', flag: '🦬' },
]

const services = [
  {
    slug: 'drivers-test',
    icon: '🚗',
    name: "Driver's Test",
    description: 'Road test booking for any licence class',
    provinces: {
      bc: { status: 'early-access', label: 'Early access', price: 'From $49' },
      on: { status: 'live', label: 'Live', price: 'From $49' },
      ab: { status: 'coming-soon', label: 'Coming soon', price: null },
      qc: { status: 'coming-soon', label: 'Coming soon', price: null },
      ns: { status: 'coming-soon', label: 'Coming soon', price: null },
      mb: { status: 'coming-soon', label: 'Coming soon', price: null },
    }
  },
  {
    slug: 'passport',
    icon: '📘',
    name: 'Passport',
    description: 'Renewal & first-time applications',
    provinces: {
      bc: { status: 'coming-soon', label: 'Coming soon', price: null },
      on: { status: 'coming-soon', label: 'Coming soon', price: null },
      ab: { status: 'coming-soon', label: 'Coming soon', price: null },
      qc: { status: 'coming-soon', label: 'Coming soon', price: null },
      ns: { status: 'coming-soon', label: 'Coming soon', price: null },
      mb: { status: 'coming-soon', label: 'Coming soon', price: null },
    }
  },
  {
    slug: 'citizenship',
    icon: '🍁',
    name: 'Citizenship Test',
    description: 'IRCC ceremony & test appointments',
    provinces: {
      bc: { status: 'coming-soon', label: 'Coming soon', price: null },
      on: { status: 'coming-soon', label: 'Coming soon', price: null },
      ab: { status: 'coming-soon', label: 'Coming soon', price: null },
      qc: { status: 'coming-soon', label: 'Coming soon', price: null },
      ns: { status: 'coming-soon', label: 'Coming soon', price: null },
      mb: { status: 'coming-soon', label: 'Coming soon', price: null },
    }
  },
]

type ProvinceCode = 'bc' | 'on' | 'ab' | 'qc' | 'ns' | 'mb'

function statusStyle(status: string) {
  if (status === 'live') return 'bg-lime text-ink font-medium'
  if (status === 'early-access') return 'bg-ink/80 text-lime font-medium'
  return 'bg-ink/8 text-ink/30'
}

function cellStyle(status: string) {
  if (status === 'live') return 'bg-lime/10 border-lime/30 hover:bg-lime/20'
  if (status === 'early-access') return 'bg-ink/5 border-ink/15 hover:bg-ink/10'
  return 'bg-white border-ink/8 opacity-50 cursor-default'
}

function getHref(serviceSlug: string, provinceCode: string, status: string) {
  if (status === 'coming-soon') return null
  return `/${serviceSlug}/${provinceCode}`
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">

      {/* Nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink tracking-tight">AppointMe</Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-ink/40 hover:text-ink transition-colors">How it works</Link>
            <Link href="/drivers-test/bc" className="btn-primary text-sm px-4 py-2 rounded-lg">
              Vancouver early access →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime/30 text-ink text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/60 animate-pulse"></span>
            BC driver's test · Early access open
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-tight text-balance mb-5">
            Your government<br />
            appointment,<br />
            <span className="text-ink/35">without the wait.</span>
          </h1>
          <p className="text-lg text-ink/55 max-w-xl leading-relaxed mb-8">
            We monitor government booking systems 24/7 and secure your slot
            the moment a cancellation appears — across Canada.
            You only pay when we succeed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/drivers-test/bc" className="btn-lime px-6 py-3 rounded-xl text-base font-medium">
              Book in Vancouver →
            </Link>
            <Link href="/drivers-test/on" className="btn-outline px-6 py-3 rounded-xl text-base">
              Ontario (live)
            </Link>
          </div>
        </div>
      </section>

      {/* Service × Province grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-2">Availability by province</p>
          <h2 className="font-display text-3xl text-ink">Pick your service and province.</h2>
          <p className="text-ink/40 text-sm mt-2">Live = book now. Early access = join the first wave.</p>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left pb-4 pr-6 w-48">
                  <span className="text-xs font-medium tracking-widest text-ink/25 uppercase">Service</span>
                </th>
                {provinces.map(p => (
                  <th key={p.code} className="pb-4 px-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{p.flag}</span>
                      <span className="text-xs font-medium text-ink/50">{p.short}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {services.map(service => (
                <tr key={service.slug}>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{service.icon}</span>
                      <div>
                        <p className="font-medium text-ink text-sm">{service.name}</p>
                        <p className="text-xs text-ink/35">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  {provinces.map(p => {
                    const cell = service.provinces[p.code as ProvinceCode]
                    const href = getHref(service.slug, p.code, cell.status)
                    const content = (
                      <div className={`rounded-xl border p-2.5 text-center transition-all ${cellStyle(cell.status)}`}>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle(cell.status)}`}>
                          {cell.label}
                        </span>
                        {cell.price && (
                          <p className="text-xs text-ink/50 mt-1.5">{cell.price}</p>
                        )}
                      </div>
                    )
                    return (
                      <td key={p.code} className="py-4 px-2">
                        {href ? (
                          <Link href={href} className="block">{content}</Link>
                        ) : content}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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
            {[
              { n: '01', t: 'Pick your service & province', b: 'Select what you need and where you are. Tell us your preferred locations and date range.' },
              { n: '02', t: 'We scan 24/7', b: 'Our system checks for openings every few minutes. You don\'t have to do a thing.' },
              { n: '03', t: 'Instant booking', b: 'The moment a slot opens, we book it in your name before anyone else can.' },
              { n: '04', t: 'Pay only if we win', b: 'No slot found? No charge, ever. Our fee is only collected on a confirmed booking.' },
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

      {/* Trust */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: '🔒', title: 'Your data stays private', body: 'Credentials encrypted with AES-256 and deleted the moment your booking is confirmed. We never store card numbers.' },
            { icon: '💳', title: 'Pay only on success', body: 'Your card is secured at sign-up and only charged when we confirm a booking in your name. Cancel free any time before.' },
            { icon: '🤝', title: 'We act as your agent', body: 'You authorize us to book on your behalf — no different from a concierge. The appointment is yours.' },
          ].map(t => (
            <div key={t.title} className="card">
              <span className="text-2xl mb-3 block">{t.icon}</span>
              <h3 className="font-display text-lg text-ink mb-2">{t.title}</h3>
              <p className="text-sm text-ink/45 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-3xl p-10 sm:p-14">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl text-lime mb-3">Ready to stop waiting?</h2>
              <p className="text-paper/50 leading-relaxed">Join the early access list for Vancouver or book right now in Ontario.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/drivers-test/bc" className="btn-lime px-6 py-3 rounded-xl text-sm font-medium text-center">
                Vancouver early access →
              </Link>
              <Link href="/drivers-test/on" className="btn-outline px-6 py-3 rounded-xl text-sm text-center border-white/20 text-paper hover:bg-white/10">
                Ontario — book now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-ink/30">
            <span className="font-display text-ink/60">AppointMe</span>
            <span>·</span>
            <span>Canada</span>
          </div>
          <div className="flex gap-6 text-sm text-ink/35">
            <Link href="/drivers-test" className="hover:text-ink transition-colors">Driver&apos;s Test</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
