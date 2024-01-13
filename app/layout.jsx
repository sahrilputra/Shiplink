// import { Poppins } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.scss'
import { cn } from '@/lib/utils'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'],
  variable: '--font-poppins',

})

export const metadata = {
  title: 'ShipLink',
  description: 'Canada\'s best package forwarding service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
