'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Trust />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-ink/8 bg-paper/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-ink tracking-tight">
          DriveSlot
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm text-ink/60 hover:text-ink transition-colors hidden sm:block">
            How it works
          </Link>
          <Link href="#pricing" className="text-sm text-ink/60 hover:text-ink transition-colors hidden sm:block">
            Pricing
          </Link>
          <Link href="/order" className="btn-primary py-2 text-sm">
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-lime/30 border border-lime/40">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-dark animate-pulse-dot" />
            <span className="text-xs font-medium text-ink">Scanning Ontario DriveTest centres now</span>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl leading-[1.05] text-ink mb-6 text-balance">
            Your G2 test,{' '}
            <span className="relative">
              months earlier
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6 Q50 2 100 5 Q150 8 198 4" stroke="#c8f53a" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg text-ink/60 mb-8 leading-relaxed">
            DriveTest centres are booked for months. We scan for cancellations 24/7
            and book the moment a slot opens. You only pay when we succeed.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/order" className="btn-lime text-base px-8 py-3.5">
              Find my slot — $49
            </Link>
            <Link href="#how-it-works" className="btn-outline text-base px-6 py-3.5">
              See how it works
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 text-sm text-ink/50">
            <div className="flex -space-x-2">
              {['#c8f53a','#1c1c18','#ede9e0'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-paper flex items-center justify-center text-xs font-medium" style={{ background: c, color: c === '#ede9e0' ? '#1c1c18' : c === '#1c1c18' ? '#c8f53a' : '#1c1c18' }}>
                  {['A','M','R'][i]}
                </div>
              ))}
            </div>
            <span>Slots found in <strong className="text-ink">1–5 days</strong> on average</span>
          </div>
        </div>

        {/* Status card preview */}
        <div className="relative">
          <div className="card-ink p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-paper/40 mb-0.5">Order #4721</p>
                <p className="text-sm font-medium text-paper">G2 Road Test — Toronto area</p>
              </div>
              <span className="badge badge-scanning text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-dot" />
                Scanning
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Scans done', value: '1,847' },
                { label: 'Centres', value: '4 active' },
                { label: 'Running', value: '3 days' },
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-xl p-2.5">
                  <p className="text-lg font-medium text-paper">{m.value}</p>
                  <p className="text-xs text-paper/40 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Scan activity */}
            <div className="bg-white/5 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-paper/50">Last scan</span>
                <span className="text-paper/70">3 min ago</span>
              </div>
              {['Toronto Etobicoke','Mississauga','Brampton'].map((loc, i) => (
                <div key={loc} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                  <span className="text-xs text-paper/60 flex-1">{loc}</span>
                  <span className="text-xs text-paper/30">Checked</span>
                </div>
              ))}
            </div>

            {/* Found slot alert */}
            <div className="bg-lime/15 border border-lime/30 rounded-xl p-3">
              <p className="text-xs font-medium text-lime mb-1">Slot found!</p>
              <p className="text-sm text-paper">Brampton — Jun 14 at 10:30 AM</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 rounded-lg bg-lime text-ink text-xs font-medium">Confirm</button>
                <button className="py-2 px-3 rounded-lg bg-white/10 text-paper/60 text-xs">Skip</button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-lime/20 blur-2xl -z-10" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-ink/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Tell us what you need',
      body: 'Enter your Ontario licence number, preferred test centres, and date range. Takes 2 minutes.',
    },
    {
      num: '02',
      title: 'We scan 24/7',
      body: 'Our system checks DriveTest.ca every few minutes across all your selected centres. You\'ll get a live status page to track progress.',
    },
    {
      num: '03',
      title: 'Slot found — you confirm',
      body: 'The moment we find a matching cancellation, you get a text and email. You have 2 hours to confirm. No pressure.',
    },
    {
      num: '04',
      title: 'Booked. You pay.',
      body: 'We complete the booking on DriveTest.ca in your name. Your card is only charged once the appointment is confirmed.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-paper-warm border-y border-ink/8">
      <div className="section">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">Process</p>
          <h2 className="font-display text-4xl text-ink">How it works</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="animate-fade-up animate-once" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="font-mono text-5xl font-light text-lime-dark/30 mb-4 leading-none">{s.num}</div>
              <h3 className="font-body font-medium text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'G2 Test',
      fee: '$49',
      mto: '+$53.75 MTO fee',
      description: 'For G1 licence holders ready for their first road test.',
      features: ['24/7 scanning', 'SMS + email alerts', 'Live status dashboard', 'Up to 20 centres', '2-hour confirmation window'],
      highlight: true,
    },
    {
      name: 'G Test',
      fee: '$59',
      mto: '+$91.25 MTO fee',
      description: 'For G2 holders upgrading to a full G licence.',
      features: ['24/7 scanning', 'SMS + email alerts', 'Live status dashboard', 'Up to 20 centres', '2-hour confirmation window'],
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="section">
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">Pricing</p>
        <h2 className="font-display text-4xl text-ink mb-4">Pay only when we find your slot</h2>
        <p className="text-ink/55 max-w-lg">Your card is saved securely but never charged until we successfully book your appointment. Zero upfront cost.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
        {plans.map(p => (
          <div key={p.name} className={`rounded-2xl p-6 border ${p.highlight ? 'bg-ink border-ink text-paper' : 'bg-white border-ink/10'}`}>
            {p.highlight && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime/20 mb-4">
                <span className="text-xs font-medium text-lime">Most popular</span>
              </div>
            )}
            <h3 className={`font-body font-medium mb-1 ${p.highlight ? 'text-paper' : 'text-ink'}`}>{p.name}</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`font-display text-4xl ${p.highlight ? 'text-lime' : 'text-ink'}`}>{p.fee}</span>
              <span className={`text-sm ${p.highlight ? 'text-paper/50' : 'text-ink/40'}`}>service fee</span>
            </div>
            <p className={`text-xs mb-4 ${p.highlight ? 'text-paper/40' : 'text-ink/40'}`}>{p.mto} (paid to MTO)</p>
            <p className={`text-sm mb-5 ${p.highlight ? 'text-paper/60' : 'text-ink/55'}`}>{p.description}</p>
            <ul className="space-y-2 mb-6">
              {p.features.map(f => (
                <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-paper/70' : 'text-ink/60'}`}>
                  <svg className={`w-4 h-4 shrink-0 ${p.highlight ? 'text-lime' : 'text-green'}`} fill="none" viewBox="0 0 16 16">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/order" className={`block text-center py-3 rounded-xl text-sm font-medium transition-all ${p.highlight ? 'bg-lime text-ink hover:bg-lime-dark' : 'bg-ink text-lime hover:bg-ink-soft'}`}>
              Start searching
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-ink/40">
        The MTO road test fee is charged separately by DriveTest.ca — it's not our fee.
        We only charge our service fee upon successful booking.
      </p>
    </section>
  )
}

function Trust() {
  const items = [
    { title: 'Your appointment, your name', body: 'We book in your name using your licence. The appointment is genuinely yours — we never resell slots.' },
    { title: 'No payment until booked', body: 'We save your card securely via Stripe but only charge it the moment we confirm your appointment on DriveTest.ca.' },
    { title: 'Licence data encrypted', body: 'Your licence number is encrypted with AES-256 before storage and deleted immediately after booking.' },
    { title: 'Independent service', body: 'We are not affiliated with the Ministry of Transportation or DriveTest. You can book directly with them at no charge.' },
  ]

  return (
    <section className="bg-paper-warm border-y border-ink/8">
      <div className="section">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">Trust</p>
          <h2 className="font-display text-4xl text-ink">Designed to be trustworthy</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.title} className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 16 16">
                  <path d="M8 2L10.5 6H14L11 9l1 4-4-2-4 2 1-4L2 6h3.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink/55 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const qs = [
    { q: 'How long does it take to find a slot?', a: 'It varies by location and time of year. Toronto-area centres are the hardest — expect 2–7 days on average. Smaller centres outside the GTA can be found within hours.' },
    { q: 'What if I need to cancel?', a: 'Cancel any time before we find a slot at no cost. Your card authorization is immediately released. If we\'ve already found and booked a slot, cancellations follow the standard MTO policy (48 hours notice to avoid losing your MTO fee).' },
    { q: 'Can I choose not to take a slot I don\'t like?', a: 'Yes. When we find a slot, you\'ll get a notification and have 2 hours to confirm or reject it. If you reject, we keep searching.' },
    { q: 'Is this legal?', a: 'Yes. We act as an authorized agent on your behalf, using your own credentials. Appointments are booked in your name. We are a third-party service similar to a travel agent — not affiliated with MTO or DriveTest.' },
    { q: 'What test classes do you support?', a: 'G2, G, M2, and M for Ontario. Commercial classes (A, B, C, D, F) are also available — contact us for pricing.' },
  ]

  return (
    <section className="section">
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">FAQ</p>
        <h2 className="font-display text-4xl text-ink">Common questions</h2>
      </div>
      <div className="max-w-2xl space-y-0 divide-y divide-ink/8">
        {qs.map(({ q, a }) => (
          <details key={q} className="group py-4">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-medium text-ink pr-4">{q}</span>
              <svg className="w-4 h-4 text-ink/40 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </summary>
            <p className="mt-3 text-sm text-ink/55 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="mx-6 mb-20">
      <div className="max-w-5xl mx-auto bg-ink rounded-3xl px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 className="font-display text-3xl text-paper mb-2">Ready to stop waiting?</h2>
          <p className="text-paper/50 text-sm">Pay only when we find your slot. Takes 2 minutes to set up.</p>
        </div>
        <Link href="/order" className="btn-lime text-base px-8 py-3.5 shrink-0 whitespace-nowrap">
          Get started →
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ink/8 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg text-ink mb-1">DriveSlot</p>
          <p className="text-xs text-ink/40">Independent third-party booking service. Not affiliated with MTO or DriveTest.</p>
        </div>
        <div className="flex gap-6 text-sm text-ink/50">
          <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="mailto:hello@driveslot.ca" className="hover:text-ink transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
