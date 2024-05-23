import type { Metadata }      
        from 'next'
import { Inter }              
        from 'next/font/google'
import './globals.css'
import { NextAuthProvider }   
        from './providers'
import { Card } 
        from '@mui/material'
import { EleosAppProvider } 
        from '@/lib/providers/EleosAppProvider'
import { WizardProvider } 
        from '@/lib/providers/WizardProvider'
import TitleBar from '@/components/client/functional/TitleBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>
          <EleosAppProvider>
            <TitleBar />
              <div id="outer" 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'flex-start', 
                  height: '100vh', 
                 }}>
                <WizardProvider>
                  {children}
                </WizardProvider>
              </div>
            </EleosAppProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
