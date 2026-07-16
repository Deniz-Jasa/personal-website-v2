import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Deniz Jasarbasic',
    template: '%s | Deniz Jasarbasic',
  },
  description: 'Software engineer, exchange student in Paris, hackathon organizer.',
  openGraph: {
    title: 'Deniz Jasarbasic',
    description: 'Software engineer, exchange student in Paris, hackathon organizer.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'dark text-[#EDECEC] bg-[#14120B]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-[62rem] mx-6 md:mx-4 lg:mx-auto min-h-screen">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0 min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
