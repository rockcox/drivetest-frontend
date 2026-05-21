'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const provinces = [
  { code: 'bc', name: 'British Columbia', system: 'ICBC' },
  { code: 'on', name: 'Ontario', system: 'DriveTest' },
  { code: 'ab', name: 'Alberta', system: 'Alberta Transportation' },
  { code: 'qc', name: 'Québec', system: 'SAAQ' },
  { code: 'mb', name: 'Manitoba', system: 'Manitoba Public Insurance' },
  { code: 'sk', name: 'Saskatchewan', system: 'SGI' },
  { code: 'ns', name: 'Nova Scotia', system: 'Access Nova Scotia' },
  { code: 'nb', name: 'New Brunswick', system: 'Service New Brunswick' },
]

export default function DriversTestPage() {
  const [selected, setSelected] = useState('')
  const router = useRouter()

  function handleContinue() {
    if (selected) router.push(`/drivers-test/${selected}`)
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2">
          <Link href="/" className="text-sm text-ink/40 hover:text-ink transition-colors">AppointMe</Link>
          <span className="text-ink/20">/</span>
          <span className="text-sm text-ink font-medium">Driver&apos;s Test</span>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl text-ink mb-2">Driver&apos;s Test</h1>
          <p className="text-ink/45 text-sm mb-10">Road test booking for any licence class, any province.</p>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-ink/40 uppercase tracking-widest mb-2">
              Select your province
            </label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="field text-sm appearance-none bg-white"
            >
              <option value="" disabled>Choose a province...</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleContinue}
              disabled={!selected}
              className="w-full btn-primary rounded-xl py-3 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed mt-2"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
