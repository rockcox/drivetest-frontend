import type { Metadata } from 'next'
import ComingSoonPage from '../_components/ComingSoonPage'

export const metadata: Metadata = { title: 'SIN Appointments — AppointMe' }

export default function SINPage() {
  return (
    <ComingSoonPage
      icon="🔢"
      service="SIN Appointment"
      tagline="Social Insurance Number · Service Canada"
      description="Service Canada appointments for a new SIN card or replacement can take weeks to book. We'll monitor and grab the first available slot near you."
      estimatedPrice="From $29"
      province="Canada-wide"
      slug="sin"
    />
  )
}
