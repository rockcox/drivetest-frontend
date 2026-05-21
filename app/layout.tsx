import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const display = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})

const mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'AppointMe — Skip the Queue on Any Government Appointment',
  description: 'We monitor government booking systems 24/7 and secure your appointment the moment a slot opens. Driving tests, passports, citizenship — pay only when we succeed.',
  keywords: ['government appointments', 'appointment booking Canada', 'DriveTest booking', 'passport appointment', 'citizenship appointment'],
  openGraph: {
    title: 'AppointMe — Your appointment, faster.',
    description: 'Automated booking for government appointments across Canada. Pay only when we succeed.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">{children}</body>
    </html>
  )
}
