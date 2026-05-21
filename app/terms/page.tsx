import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — AppointMe',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-ink/8 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-ink">AppointMe</Link>
          <Link href="/" className="text-sm text-ink/50 hover:text-ink transition-colors">← Back home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-ink/40 uppercase mb-3">Legal</p>
        <h1 className="font-display text-4xl text-ink mb-3">Terms of Service</h1>
        <p className="text-sm text-ink/40 mb-12">Last updated: May 2025</p>

        <div className="prose prose-sm max-w-none space-y-8 text-ink/70 leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. About AppointMe</h2>
            <p>AppointMe is an independent third-party service that monitors the Ontario DriveTest.ca booking system for available road test appointment cancellations and books them on your behalf. We are not affiliated with, endorsed by, or connected to the Ontario Ministry of Transportation (MTO), DriveTest Inc., or any government authority.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. Service Description</h2>
            <p>When you place an order, AppointMe will:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Monitor DriveTest.ca for cancellations matching your preferences</li>
              <li>Notify you when a matching slot is found</li>
              <li>Book the appointment in your name using your Ontario licence credentials</li>
              <li>Charge our service fee only upon successful confirmation of a booking</li>
            </ul>
            <p className="mt-3">We act as your authorized agent. The appointment created belongs entirely to you under your name and licence number.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Fees and Payment</h2>
            <p><strong className="text-ink">Service fee:</strong> $49 CAD for G2/M2 tests; $59 CAD for G/M tests. This fee is charged only after we successfully book your appointment.</p>
            <p className="mt-2"><strong className="text-ink">MTO road test fee:</strong> The fee charged by DriveTest.ca for the road test itself (currently $53.75–$91.25 depending on test class) is separate and charged directly to your payment method at the time of booking. This fee is set by the Ontario government and is not our charge.</p>
            <p className="mt-2">Your payment card is saved securely via Stripe at sign-up but is not charged until a booking is confirmed. You may cancel your search at any time before confirmation at no cost.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Cancellations and Refunds</h2>
            <p>You may cancel your search at any time before we find and confirm a slot. No charge will be made and any card authorization will be immediately released.</p>
            <p className="mt-2">Once an appointment has been booked and confirmed, our service fee is non-refundable. Cancellations of the road test appointment itself are subject to MTO/DriveTest cancellation policies — you must provide at least 48 hours' notice to DriveTest to avoid forfeiting your road test fee.</p>
            <p className="mt-2">If we are unable to complete a booking after you confirm a slot (due to technical failure), you will not be charged and your search will resume.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Your Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be the holder of the Ontario driver's licence you provide</li>
              <li>You must be eligible to take the test class you have selected</li>
              <li>You must attend the appointment once booked — AppointMe is not responsible for missed appointments</li>
              <li>You must arrive with a roadworthy vehicle and valid identification</li>
              <li>You must provide accurate contact information to receive notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Licence Credentials</h2>
            <p>You authorize AppointMe to use your Ontario driver's licence number and expiry date solely for the purpose of logging into DriveTest.ca and booking an appointment on your behalf. Your licence number is encrypted at rest using AES-256 encryption and is permanently deleted from our systems once your appointment is confirmed.</p>
            <p className="mt-2">We will never use your credentials for any other purpose, share them with third parties, or retain them beyond what is strictly necessary to complete your booking.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Limitations of Liability</h2>
            <p>AppointMe does not guarantee that a slot matching your preferences will be found within any specific timeframe. Availability depends entirely on cancellations by other DriveTest users, which we cannot control.</p>
            <p className="mt-2">AppointMe is not responsible for: changes to DriveTest.ca's systems that prevent automated access; your failure to attend an appointment; errors in the information you provide; or actions taken by MTO or DriveTest with respect to your appointment.</p>
            <p className="mt-2">Our maximum liability to you is limited to the service fee you paid for that specific order.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">8. Changes to These Terms</h2>
            <p>We may update these terms from time to time. Continued use of AppointMe after changes are posted constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">9. Governing Law</h2>
            <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">10. Contact</h2>
            <p>Questions about these terms? Email us at <a href="mailto:hello@appointme.ca" className="text-ink underline underline-offset-2">hello@appointme.ca</a>.</p>
          </section>
        </div>
      </div>

      <footer className="border-t border-ink/8 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-6 flex gap-6 text-sm text-ink/40">
          <Link href="/terms" className="hover:text-ink transition-colors font-medium text-ink/60">Terms</Link>
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="mailto:hello@appointme.ca" className="hover:text-ink transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
