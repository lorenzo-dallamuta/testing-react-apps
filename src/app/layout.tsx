import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Sitemap from '@/components/Sitemap'
import './globals.css'

const anticSlab = localFont({
  src: './fonts/antic-slab.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Testing React Apps 🧐',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={anticSlab.className}>
        <div id="⚛">
          <div
            style={{
              flex: 1,
              padding: 20,
              border: '1px solid',
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ErrorBoundary FallbackComponent={Sitemap}>
              <Suspense fallback="...loading">
                <div>{children}</div>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </body>
    </html>
  )
}
