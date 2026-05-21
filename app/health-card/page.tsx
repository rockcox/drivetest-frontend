import type { Metadata } from 'next'
import ComingSoonPage from '../_components/ComingSoonPage'

export const metadata: Metadata = { title: 'Health Card Appointments — AppointMe' }

export default function HealthCardPage() {
  return (
    <ComingSoonPage
      icon="🏥"
      service="Health Card"
      tagline="OHIP & provincial health card renewal · Ontario"
      description="ServiceOntario health card appointments for new cards, renewals, and replacements fill up fast. We'll secure your spot without the hours of refreshing."
      estimatedPrice="From $29"
      province="Ontario"
      slug="health-card"
    />
  )
}
