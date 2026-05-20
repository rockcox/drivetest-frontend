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
  title: 'DriveSlot — Book Your Ontario Road Test Earlier',
  description: 'We scan DriveTest.ca 24/7 and book your G2 or G road test the moment a cancellation appears. Pay only when we succeed.',
  keywords: ['DriveTest Ontario', 'G2 road test booking', 'road test cancellation', 'Ontario driving test'],
  openGraph: {
    title: 'DriveSlot — Skip the Wait',
    description: 'We find Ontario DriveTest cancellations for you. Pay only when we book.',
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
