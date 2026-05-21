import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Driver's Test — Ontario | AppointMe",
  description: 'Book your Ontario G2, G, M2 or M road test faster. We scan DriveTest.ca and book the moment a cancellation opens.',
}

const classes = [
  { code: 'G2', desc: 'First road test — city driving, parking, basic manoeuvres' },
  { code: 'G',  desc: 'Full licence — highway driving, advanced road skills' },
  { code: 'M2', desc: 'Motorcycle — basic skills and traffic scenarios' },
  { code: 'M',  desc: 'Full motorcycle licence — advanced manoeuvres' },
]

const centres = [
  'Toronto Downsview', 'Toronto Etobicoke', 'Toronto Metro East', 'Toronto Port Union',
  'Mississauga', 'Brampton', 'Oakville', 'Burlington', 'Hamilton',
  'Kitchener', 'London', 'Ottawa Canotek', 'Ottawa Walkley', 'Kingston',
  'Barrie', 'Sudbury', 'Thunder Bay', 'Windsor', 'Newmarket', 'Oshawa',
]

export default function ONPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
            <span className="text-ink/20">/</span>
            <Link href="/drivers-test" className="text-ink/40 hover:text-ink transition-colors">Driver&apos;s Test</Link>
            <span className="text-ink/20">/</span>
            <span className="text-ink font-medium">Ontario</span>
          </div>
          <Link href="/order" className="btn-primary text-sm px-4 py-2 rounded-lg">
            Get started →
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">

        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-4">Ontario · DriveTest</p>
          <h1 className="font-display text-5xl text-ink mb-5">
            Your DriveTest appointment,<br />
            <span className="text-ink/30">secured for you.</span>
          </h1>
          <p className="text-ink/50 text-base leading-relaxed max-w-lg">
            DriveTest centres across Ontario are booked months in advance.
            We monitor the booking system and claim a cancellation slot
            in your name the moment one becomes available.
          </p>
        </div>

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

        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-5">DriveTest centres</p>
          <div className="flex flex-wrap gap-2">
            {centres.map(c => (
              <span key={c} className="text-sm px-3 py-1.5 bg-white border border-ink/8 rounded-full text-ink/50">
                {c}
              </span>
            ))}
            <span className="text-sm px-3 py-1.5 border border-dashed border-ink/15 rounded-full text-ink/25 italic">
              + 40 more across Ontario
            </span>
          </div>
        </div>

        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-5">Pricing</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { tier: 'G2 / M2', price: '$49', note: 'First road test' },
              { tier: 'G / M', price: '$59', note: 'Full licence test' },
            ].map(t => (
              <div key={t.tier} className="bg-ink rounded-2xl p-7">
                <p className="font-mono text-xs text-lime/50 mb-3">{t.tier}</p>
                <p className="font-display text-3xl text-lime mb-0.5">{t.price}</p>
                <p className="text-paper/35 text-xs mb-5">{t.note} · charged on success</p>
                <Link href="/order" className="btn-lime w-full flex items-center justify-center rounded-xl py-2.5 text-sm font-medium">
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/25 mt-3">
            The MTO road test fee ($53.75–$91.25) is charged by DriveTest at the time of booking.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-ink/30 uppercase mb-6">How it works</p>
          <div className="space-y-6">
            {[
              { n: '01', t: 'Tell us your preferences', b: 'Test class, preferred centres, and date range.' },
              { n: '02', t: 'We monitor DriveTest.ca', b: 'Our system checks for cancellations every few minutes.' },
              { n: '03', t: 'Slot opens — booked', b: 'We complete the booking in your name immediately.' },
              { n: '04', t: 'You get the confirmation', b: 'DriveTest sends your appointment details directly to you.' },
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
