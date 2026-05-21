import type { Metadata } from 'next'
import ComingSoonPage from '../_components/ComingSoonPage'

export const metadata: Metadata = { title: 'Passport Appointments — AppointMe' }

export default function PassportPage() {
  return (
    <ComingSoonPage
      icon="📘"
      service="Passport"
      tagline="Renewal & first-time applications · Canada-wide"
      description="Passport Canada and Service Canada offices are booked months in advance. We'll monitor for cancellations and secure your appointment the moment one opens."
      estimatedPrice="From $59"
      province="Canada-wide"
      slug="passport"
    />
  )
}
