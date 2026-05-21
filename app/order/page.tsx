'use client'

import { useState, useEffect, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import clsx from 'clsx'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const LOCATIONS = [
  'Brampton', 'Burlington', 'Guelph', 'Hamilton', 'Kitchener',
  'London', 'Mississauga', 'Newmarket', 'Oakville', 'Orangeville',
  'Oshawa', 'Ottawa Canotek', 'Ottawa Walkley', 'St. Catharines',
  'Toronto Downsview', 'Toronto Etobicoke', 'Toronto Metro East', 'Toronto Port Union',
  'Windsor', 'Kingston', 'Barrie', 'Sudbury', 'Thunder Bay',
]

type Step = 'details' | 'preferences' | 'payment' | 'done'

interface OrderForm {
  email: string; phone: string
  licenceNumber: string; licenceExpiry: string
  testClass: string
  locations: string[]
  dateFrom: string; dateTo: string
  timePref: string
}

type FormErrors = Partial<Record<keyof OrderForm, string>>

const DEFAULT_FORM: OrderForm = {
  email: '', phone: '', licenceNumber: '', licenceExpiry: '',
  testClass: 'G2', locations: [], dateFrom: '', dateTo: '', timePref: 'any',
}

export default function OrderPage() {
  const [step, setStep] = useState<Step>('details')
  const [form, setForm] = useState<OrderForm>(DEFAULT_FORM)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [feeText, setFeeText] = useState('$49')
  const [errors, setErrors] = useState<FormErrors>({})

  const fee = form.testClass === 'G2' || form.testClass === 'M2' ? '$49' : '$59'

  function update(field: keyof OrderForm, value: unknown) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function toggleLocation(loc: string) {
    setForm(f => ({
      ...f,
      locations: f.locations.includes(loc)
        ? f.locations.filter(l => l !== loc)
        : [...f.locations, loc],
    }))
  }

  function validateDetails(): boolean {
    const e: Partial<Record<keyof OrderForm, string>> = {}
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone required'
    if (form.licenceNumber.length < 6) e.licenceNumber = 'Licence number required'
    if (!form.licenceExpiry.match(/^\d{4}-\d{2}-\d{2}$/)) e.licenceExpiry = 'Format: YYYY-MM-DD'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validatePreferences(): boolean {
    const e: Partial<Record<keyof OrderForm, string>> = {}
    if (form.locations.length === 0) e.locations = 'Select at least one centre'
    if (!form.dateFrom) e.dateFrom = 'Required'
    if (!form.dateTo) e.dateTo = 'Required'
    if (form.dateFrom && form.dateTo && form.dateFrom >= form.dateTo) {
      e.dateTo = 'Must be after start date'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submitToAPI() {
    try {
      const res = await api.createOrder({
        email: form.email,
        phone: form.phone.replace(/\D/g, ''),
        licenceNumber: form.licenceNumber.replace(/\s/g, ''),
        licenceExpiry: form.licenceExpiry,
        testClass: form.testClass,
        locations: form.locations,
        dateFrom: form.dateFrom,
        dateTo: form.dateTo,
        timePref: form.timePref,
      })
      setOrderId(res.orderId)
      setClientSecret(res.payment.clientSecret)
      setFeeText(res.payment.feeFormatted)
      setStep('payment')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create order. Please try again.')
    }
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'details', label: 'Your info' },
    { key: 'preferences', label: 'Preferences' },
    { key: 'payment', label: 'Payment' },
  ]

  const stepIdx = steps.findIndex(s => s.key === step)

  return (
    <div className="min-h-screen bg-paper">
      {/* Top nav */}
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink">AppointMe</Link>
          {step !== 'done' && (
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={clsx(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                    i < stepIdx ? 'bg-lime text-ink' : i === stepIdx ? 'bg-ink text-lime' : 'bg-ink/10 text-ink/40'
                  )}>
                    {i < stepIdx ? '✓' : i + 1}
                  </div>
                  <span className={clsx('text-xs hidden sm:block', i === stepIdx ? 'text-ink font-medium' : 'text-ink/40')}>
                    {s.label}
                  </span>
                  {i < steps.length - 1 && <div className="w-6 h-px bg-ink/15" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'details' && (
          <DetailsStep form={form} errors={errors} update={update}
            onNext={() => { if (validateDetails()) setStep('preferences') }}
          />
        )}
        {step === 'preferences' && (
          <PreferencesStep form={form} errors={errors} update={update}
            toggleLocation={toggleLocation}
            onBack={() => setStep('details')}
            onNext={() => { if (validatePreferences()) submitToAPI() }}
            fee={fee}
          />
        )}
        {step === 'payment' && clientSecret && orderId && (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat', variables: { colorPrimary: '#0e0e0c', borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } } }}>
            <PaymentStep orderId={orderId} clientSecret={clientSecret} feeText={feeText}
              onBack={() => setStep('preferences')}
              onDone={() => setStep('done')}
            />
          </Elements>
        )}
        {step === 'done' && orderId && <DoneStep orderId={orderId} />}
      </div>
    </div>
  )
}

// ─── Step 1: Personal details ──────────────────────────────────────────────────

function DetailsStep({ form, errors, update, onNext }: {
  form: OrderForm; errors: FormErrors
  update: (f: keyof OrderForm, v: string) => void; onNext: () => void
}) {
  return (
    <div className="animate-fade-up animate-once">
      <h1 className="font-display text-3xl text-ink mb-2">Your information</h1>
      <p className="text-ink/55 mb-8">We need your licence details to log in to DriveTest.ca on your behalf.</p>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email address" error={errors.email}>
            <input type="email" className={clsx('field', errors.email && 'field-error')}
              placeholder="you@example.com" value={form.email}
              onChange={e => update('email', e.target.value)} />
          </Field>
          <Field label="Mobile phone (for SMS alerts)" error={errors.phone}>
            <input type="tel" className={clsx('field', errors.phone && 'field-error')}
              placeholder="416 555 0100" value={form.phone}
              onChange={e => update('phone', e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Ontario licence number" error={errors.licenceNumber}>
            <input className={clsx('field font-mono', errors.licenceNumber && 'field-error')}
              placeholder="A1234-56789-00000" value={form.licenceNumber}
              onChange={e => update('licenceNumber', e.target.value.toUpperCase())} />
          </Field>
          <Field label="Licence expiry date" error={errors.licenceExpiry}>
            <input type="date" className={clsx('field', errors.licenceExpiry && 'field-error')}
              value={form.licenceExpiry}
              onChange={e => update('licenceExpiry', e.target.value)} />
          </Field>
        </div>

        <div className="p-4 rounded-xl bg-ink/4 border border-ink/8 text-sm text-ink/55 leading-relaxed">
          <strong className="text-ink/70">Privacy note:</strong> Your licence number is encrypted with AES-256 
          before being stored and is used only to log in to DriveTest.ca on your behalf. 
          It is deleted immediately after your appointment is confirmed.
        </div>

        <Field label="Test class">
          <div className="grid grid-cols-4 gap-2">
            {['G2', 'G', 'M2', 'M'].map(c => (
              <button key={c} onClick={() => update('testClass', c)}
                className={clsx(
                  'py-3 rounded-xl border text-sm font-medium transition-all',
                  form.testClass === c
                    ? 'bg-ink border-ink text-lime'
                    : 'bg-white border-ink/15 text-ink/60 hover:border-ink/30'
                )}>
                {c}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-8">
        <button onClick={onNext} className="btn-lime w-full py-3.5 text-base">
          Continue to preferences →
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Search preferences ───────────────────────────────────────────────

function PreferencesStep({ form, errors, update, toggleLocation, onBack, onNext, fee }: {
  form: OrderForm; errors: FormErrors
  update: (f: keyof OrderForm, v: string) => void
  toggleLocation: (loc: string) => void
  onBack: () => void; onNext: () => void; fee: string
}) {
  return (
    <div className="animate-fade-up animate-once">
      <h1 className="font-display text-3xl text-ink mb-2">Search preferences</h1>
      <p className="text-ink/55 mb-8">Tell us where and when you want to test. Select multiple centres to improve your odds.</p>

      <div className="space-y-6">
        <Field label={`Preferred DriveTest centres ${form.locations.length > 0 ? `(${form.locations.length} selected)` : ''}`} error={errors.locations}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {LOCATIONS.map(loc => (
              <button key={loc} onClick={() => toggleLocation(loc)}
                className={clsx(
                  'px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all',
                  form.locations.includes(loc)
                    ? 'bg-ink border-ink text-lime'
                    : 'bg-white border-ink/12 text-ink/55 hover:border-ink/25'
                )}>
                {loc}
              </button>
            ))}
          </div>
          {errors.locations && <p className="text-xs text-red mt-1">{errors.locations}</p>}
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Search from date" error={errors.dateFrom}>
            <input type="date" className={clsx('field', errors.dateFrom && 'field-error')}
              min={new Date().toISOString().split('T')[0]}
              value={form.dateFrom} onChange={e => update('dateFrom', e.target.value)} />
          </Field>
          <Field label="Search to date" error={errors.dateTo}>
            <input type="date" className={clsx('field', errors.dateTo && 'field-error')}
              min={form.dateFrom || new Date().toISOString().split('T')[0]}
              value={form.dateTo} onChange={e => update('dateTo', e.target.value)} />
          </Field>
        </div>

        <Field label="Time preference">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { value: 'any', label: 'Any time' },
              { value: 'morning', label: 'Morning' },
              { value: 'afternoon', label: 'Afternoon' },
              { value: 'weekdays', label: 'Weekdays' },
              { value: 'weekends', label: 'Weekends' },
            ].map(opt => (
              <button key={opt.value} onClick={() => update('timePref', opt.value)}
                className={clsx(
                  'py-2.5 rounded-xl border text-xs font-medium transition-all',
                  form.timePref === opt.value
                    ? 'bg-ink border-ink text-lime'
                    : 'bg-white border-ink/12 text-ink/55 hover:border-ink/25'
                )}>
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Fee summary */}
        <div className="p-4 rounded-xl bg-lime/15 border border-lime/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">AppointMe service fee</p>
              <p className="text-xs text-ink/50 mt-0.5">Charged only when we successfully book your slot</p>
            </div>
            <p className="font-display text-2xl text-ink">{fee}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={onBack} className="btn-outline py-3.5 px-6">← Back</button>
        <button onClick={onNext} className="btn-lime flex-1 py-3.5 text-base">
          Continue to payment →
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

function PaymentStep({ orderId, clientSecret, feeText, onBack, onDone }: {
  orderId: string; clientSecret: string; feeText: string
  onBack: () => void; onDone: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!stripe || !elements) return
    setLoading(true)
    setError(null)

    const { error: submitErr } = await elements.submit()
    if (submitErr) { setError(submitErr.message ?? 'Card error'); setLoading(false); return }

    const { setupIntent, error: confirmErr } = await stripe.confirmSetup({
      elements,
      confirmParams: { return_url: `${window.location.origin}/order` },
      redirect: 'if_required',
    })

    if (confirmErr) { setError(confirmErr.message ?? 'Payment failed'); setLoading(false); return }

    if (setupIntent?.payment_method) {
      try {
        await api.activateOrder(orderId, setupIntent.payment_method as string)
        onDone()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Activation failed')
      }
    }
    setLoading(false)
  }

  return (
    <div className="animate-fade-up animate-once">
      <h1 className="font-display text-3xl text-ink mb-2">Secure your search</h1>
      <p className="text-ink/55 mb-8">
        Save your card — <strong>you won't be charged until we successfully book your appointment</strong>.
        Your card is stored securely via Stripe.
      </p>

      <div className="card mb-6">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red/8 border border-red/20 text-sm text-red mb-4">
          {error}
        </div>
      )}

      <div className="p-4 rounded-xl bg-ink/4 border border-ink/8 mb-6 flex items-start gap-3 text-sm text-ink/60">
        <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="none" viewBox="0 0 16 16">
          <path d="M8 2a6 6 0 100 12A6 6 0 008 2zM6 8l1.5 1.5L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Your card will only be charged <strong className="text-ink">{feeText}</strong> when we confirm your road test booking. Cancel any time before then at no cost.</span>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline py-3.5 px-6" disabled={loading}>← Back</button>
        <button onClick={handleSubmit} disabled={loading || !stripe}
          className="btn-lime flex-1 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
              Starting search...
            </span>
          ) : 'Start searching →'}
        </button>
      </div>

      <p className="text-center text-xs text-ink/35 mt-4">
        Powered by Stripe · Encrypted · PCI compliant
      </p>
    </div>
  )
}

// ─── Done ─────────────────────────────────────────────────────────────────────

function DoneStep({ orderId }: { orderId: string }) {
  const router = useRouter()
  useEffect(() => {
    const t = setTimeout(() => router.push(`/status/${orderId}`), 3000)
    return () => clearTimeout(t)
  }, [orderId, router])

  return (
    <div className="text-center animate-fade-up animate-once py-12">
      <div className="w-16 h-16 rounded-full bg-lime flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-ink" fill="none" viewBox="0 0 24 24">
          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="font-display text-3xl text-ink mb-3">Search is live!</h2>
      <p className="text-ink/55 mb-2">We're scanning DriveTest.ca right now.</p>
      <p className="text-ink/40 text-sm">Redirecting to your status page...</p>
      <Link href={`/status/${orderId}`} className="mt-6 inline-block btn-lime px-8 py-3">
        View live status →
      </Link>
    </div>
  )
}

// ─── Shared field wrapper ──────────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  )
}
