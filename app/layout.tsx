import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <SpeedInsights />
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  )
}
