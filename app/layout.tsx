import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/components/wallet-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CHONK9K Whale Manager',
  description: 'Professional Solana Whale Tracking Platform',
  keywords: ['solana', 'whale', 'tracking', 'crypto', 'defi', 'analytics'],
  authors: [{ name: 'CHONK9K Team' }],
  openGraph: {
    title: 'CHONK9K Whale Manager',
    description: 'Track Solana whales with professional-grade analytics',
    type: 'website',
  },
    generator: 'v0.dev'
}

/**
 * Root layout component that sets up global providers, theming, and notification UI for the application.
 *
 * Wraps all page content with theme and wallet context providers, applies the Inter font, and includes a notification toaster.
 *
 * @param children - The content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WalletProvider>
            {children}
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
