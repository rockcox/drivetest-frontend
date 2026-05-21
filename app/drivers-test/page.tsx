import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Driver's Test Booking Canada — AppointMe",
  description: "Book your driver's test across Canada. ICBC in BC, DriveTest in Ontario. We scan 24/7 and book the moment a cancellation opens.",
}

const provinces = [
  {
    code: 'bc',
    name: 'British Columbia',
    city: 'Vancouver · Surrey · Burnaby · Richmond',
    system: 'ICBC',
    classes: ['Class 5', 'Class 7', 'Class 6', 'Class 4'],
    status: 'early-access',
    label: 'Early access',
    price: 'From $49',
    description: 'ICBC road tests for Class 7 (L/N) and Class 5 (full licence). Booking through the ICBC appointment system.',
  },
  {
    code: 'on',
    name: 'Ontario',
    city: 'Toronto · Mississauga · Ottawa · Hamilton',
    system: 'DriveTest',
    classes: ['G2', 'G', 'M2', 'M'],
    status: 'live',
    label: 'Live now',
    price: 'From $49',
    description: 'DriveTest road tests for G2, G, M2 and M licences. 60+ centres across Ontario.',
  },
  {
    code: 'ab',
    name: 'Alberta',
    city: 'Calgary · Edmonton · Red Deer',
    system: 'Alberta Transportation',
    classes: ['Class 5', 'Class 6'],
    status: 'coming-soon',
    label: 'Coming soon',
    price: null,
    description: 'Alberta Transportation road tests. We\'re building this next.',
  },
]

export default function DriversTestPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <span className="text-sm text-ink font-medium">Driver&apos;s Test</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">🚗</span>
          <p className="text-xs font-medium tracking-widest text-ink/35 uppercase">Driver&apos;s Test</p>
        </div>
        <h1 className="font-display text-5xl text-ink mb-4">
          Where are you taking your test?
        </h1>
        <p className="text-ink/50 text-lg max-w-xl">
          Pick your province. We know each booking system and handle the whole process for you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {provinces.map(p => {
            const isLive = p.status === 'live'
            const isEarly = p.status === 'early-access'
            const isActive = isLive || isEarly
            const href = isActive ? `/drivers-test/${p.code}` : undefined

            const card = (
              <div className={`rounded-2xl border p-7 flex flex-col gap-4 h-full transition-all ${
                isLive ? 'bg-ink text-paper border-ink hover:scale-[1.02] hover:shadow-xl cursor-pointer' :
                isEarly ? 'bg-paper border-ink/20 hover:border-ink/40 hover:shadow-md cursor-pointer' :
                'bg-white border-ink/8 opacity-60 cursor-default'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-xs font-medium mb-1 ${isLive ? 'text-paper/40' : 'text-ink/35'}`}>{p.system}</p>
                    <h2 className={`font-display text-2xl ${isLive ? 'text-lime' : 'text-ink'}`}>{p.name}</h2>
                    <p className={`text-sm mt-0.5 ${isLive ? 'text-paper/40' : 'text-ink/40'}`}>{p.city}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3 ${
                    isLive ? 'bg-lime text-ink' :
                    isEarly ? 'bg-ink/8 text-ink' :
                    'bg-ink/5 text-ink/30'
                  }`}>{p.label}</span>
                </div>

                <p className={`text-sm leading-relaxed flex-1 ${isLive ? 'text-paper/60' : 'text-ink/50'}`}>
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.classes.map(c => (
                    <span key={c} className={`text-xs px-2 py-1 rounded-lg font-mono font-medium ${
                      isLive ? 'bg-white/10 text-paper/60' :
                      isEarly ? 'bg-ink/8 text-ink/60' :
                      'bg-ink/5 text-ink/25'
                    }`}>{c}</span>
                  ))}
                </div>

                {p.price && (
                  <div className={`flex items-center justify-between pt-3 border-t ${
                    isLive ? 'border-white/10' : 'border-ink/8'
                  }`}>
                    <span className={`text-sm font-medium ${isLive ? 'text-lime' : 'text-ink/60'}`}>{p.price}</span>
                    <span className={`text-sm ${isLive ? 'text-paper/40' : 'text-ink/35'}`}>
                      {isLive ? 'Book now →' : 'Join early access →'}
                    </span>
                  </div>
                )}
              </div>
            )

            return (
              <div key={p.code} className="flex">
                {href ? (
                  <Link href={href} className="flex-1">{card}</Link>
                ) : (
                  <div className="flex-1">{card}</div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-ink/30">More provinces launching soon. <Link href="mailto:hello@appointme.ca?subject=Province request" className="underline underline-offset-2 hover:text-ink transition-colors">Request your province →</Link></p>
        </div>
      </div>

      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-sm text-ink/30 hover:text-ink transition-colors">← All services</Link>
          <div className="flex gap-5 text-sm text-ink/30">
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
