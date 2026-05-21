import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — DriveSlot',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink">DriveSlot</Link>
          <Link href="/" className="text-sm text-ink/50 hover:text-ink transition-colors">← Back home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">Legal</p>
        <h1 className="font-display text-4xl text-ink mb-3">Privacy Policy</h1>
        <p className="text-sm text-ink/40 mb-12">Last updated: May 2025</p>

        <div className="space-y-8 text-ink/70 leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. What We Collect</h2>
            <p className="mb-3">To provide our service, we collect the following information:</p>

            <div className="bg-paper-warm rounded-xl p-5 space-y-4">
              <div>
                <p className="font-medium text-ink text-sm mb-1">Identity & Contact</p>
                <p className="text-sm">Email address, phone number. Used to send you slot notifications and booking confirmations.</p>
              </div>
              <div>
                <p className="font-medium text-ink text-sm mb-1">Ontario Licence Number & Expiry</p>
                <p className="text-sm">Used exclusively to log into DriveTest.ca and book your appointment. Encrypted at rest with AES-256-GCM. <strong className="text-ink">Permanently deleted the moment your booking is confirmed.</strong></p>
              </div>
              <div>
                <p className="font-medium text-ink text-sm mb-1">Test Preferences</p>
                <p className="text-sm">Test class, preferred centres, date range, time preference. Used to filter available slots.</p>
              </div>
              <div>
                <p className="font-medium text-ink text-sm mb-1">Payment Method</p>
                <p className="text-sm">Stored as a Stripe payment token — we never see or store raw card numbers. Stripe is PCI DSS Level 1 certified.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong className="text-ink">Booking:</strong> Your licence credentials are used solely to authenticate with DriveTest.ca and complete the booking in your name.</li>
              <li><strong className="text-ink">Notifications:</strong> Your email and phone are used to alert you when a slot is found and to send booking confirmations.</li>
              <li><strong className="text-ink">Payment:</strong> Your payment method is used to charge our service fee upon successful booking, and optionally to pay the MTO road test fee on your behalf.</li>
              <li><strong className="text-ink">Service improvement:</strong> Anonymized, aggregated data (scan counts, booking success rates) may be used to improve the service.</li>
            </ul>
            <p className="mt-3 text-sm">We do not sell, rent, or share your personal data with third parties for marketing. We do not use your data for advertising.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Data Retention</h2>
            <div className="space-y-2 text-sm">
              <div className="flex gap-4 py-2 border-b border-ink/8">
                <span className="font-medium text-ink w-48 shrink-0">Licence number</span>
                <span>Deleted immediately after booking is confirmed. Never retained beyond that.</span>
              </div>
              <div className="flex gap-4 py-2 border-b border-ink/8">
                <span className="font-medium text-ink w-48 shrink-0">Contact info</span>
                <span>Retained while you have an active account. Deleted upon request.</span>
              </div>
              <div className="flex gap-4 py-2 border-b border-ink/8">
                <span className="font-medium text-ink w-48 shrink-0">Order history</span>
                <span>Retained for 2 years for legal and accounting purposes.</span>
              </div>
              <div className="flex gap-4 py-2">
                <span className="font-medium text-ink w-48 shrink-0">Payment tokens</span>
                <span>Managed by Stripe. Removed from Stripe upon account deletion.</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Security Measures</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>All data in transit is encrypted via TLS 1.2+</li>
              <li>Licence numbers are encrypted with AES-256-GCM before storage; the encryption key is never stored in the database</li>
              <li>Database access requires authenticated API calls with server-side service role keys; no direct public database access</li>
              <li>Payment data is never stored on our servers — all card handling is delegated to Stripe's PCI-compliant infrastructure</li>
              <li>Infrastructure is hosted on Railway (backend) and Vercel (frontend), both with SOC 2 compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Third-Party Services</h2>
            <div className="space-y-3 text-sm">
              {[
                { name: 'Stripe', use: 'Payment processing', privacy: 'https://stripe.com/privacy' },
                { name: 'Supabase', use: 'Database hosting', privacy: 'https://supabase.com/privacy' },
                { name: 'Twilio', use: 'SMS notifications', privacy: 'https://www.twilio.com/legal/privacy' },
                { name: 'Resend', use: 'Email delivery', privacy: 'https://resend.com/legal/privacy-policy' },
                { name: 'Vercel', use: 'Frontend hosting', privacy: 'https://vercel.com/legal/privacy-policy' },
                { name: 'Railway', use: 'Backend hosting', privacy: 'https://railway.app/legal/privacy' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-4 py-2 border-b border-ink/8 last:border-0">
                  <span className="font-medium text-ink w-24 shrink-0">{s.name}</span>
                  <span className="flex-1 text-ink/60">{s.use}</span>
                  <a href={s.privacy} target="_blank" rel="noopener noreferrer" className="text-ink/40 hover:text-ink transition-colors text-xs underline underline-offset-2">Privacy policy</a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Your Rights</h2>
            <p className="text-sm mb-3">Under Canadian privacy law (PIPEDA) and Ontario provincial law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Withdraw consent for non-essential data processing</li>
            </ul>
            <p className="mt-3 text-sm">To exercise these rights, email <a href="mailto:privacy@driveslot.ca" className="text-ink underline underline-offset-2">privacy@driveslot.ca</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Cookies</h2>
            <p className="text-sm">We use only essential functional cookies required for the service to operate (session management). We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">8. Contact</h2>
            <p className="text-sm">Privacy questions or requests: <a href="mailto:privacy@driveslot.ca" className="text-ink underline underline-offset-2">privacy@driveslot.ca</a></p>
          </section>
        </div>
      </div>

      <footer className="border-t border-ink/8 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-6 flex gap-6 text-sm text-ink/40">
          <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors font-medium text-ink/60">Privacy</Link>
          <Link href="mailto:hello@driveslot.ca" className="hover:text-ink transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
