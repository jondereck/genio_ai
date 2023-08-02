import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/provider/modal-provider'
import { ToasterProvider } from '@/components/provider/toaster-provider'
import { CrispChat } from '@/components/crisp-chat'
import { CrispProvider } from '@/components/provider/crisp-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GenioAi',
  description: 'Ai Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Head>
      <link rel="manifest" href="/manifest.json" />
      </Head>
      <html lang="en" suppressHydrationWarning>
        <CrispProvider/>
        <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem> 
        <ModalProvider />
          <ToasterProvider />
          {children}
          <Toaster />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
