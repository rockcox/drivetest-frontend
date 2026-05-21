import type { Metadata } from 'next'
import ComingSoonPage from '../../_components/ComingSoonPage'

export const metadata: Metadata = { title: "Alberta Driver's Test Booking — AppointMe" }

export default function ABDriversTestPage() {
  return (
    <ComingSoonPage
      icon="🌾"
      service="Alberta Driver's Test"
      tagline="Alberta Transportation road tests · Calgary & Edmonton"
      description="Alberta road test appointments fill up fast. We're building the Alberta Transportation scanner next — join the waitlist to be first in line when we launch."
      estimatedPrice="From $49"
      province="Alberta"
      slug="drivers-test-ab"
    />
  )
}
