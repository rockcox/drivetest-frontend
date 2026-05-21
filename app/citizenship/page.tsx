import type { Metadata } from 'next'
import ComingSoonPage from '../_components/ComingSoonPage'

export const metadata: Metadata = { title: 'Citizenship Test Appointments — AppointMe' }

export default function CitizenshipPage() {
  return (
    <ComingSoonPage
      icon="🍁"
      service="Citizenship Test"
      tagline="IRCC ceremony & test appointments · Canada-wide"
      description="IRCC citizenship test and ceremony slots are notoriously hard to get. We'll watch the system and book the next available slot that matches your location."
      estimatedPrice="From $49"
      province="Canada-wide"
      slug="citizenship"
    />
  )
}
