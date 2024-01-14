import { Poppins } from 'next/font/google'
// import localFont from 'next/font/local'

import './globals.scss'
import { cn } from '@/lib/utils'

// const poppins = localFont({
//   src: [
//     {
//       path: '/font/Poppins-Regular.ttf',
//     },
//     {
//       path: '/font/Poppins-Medium.ttf',
//     }
//   ],
//   subsets: ['latin'],
//   variable: '--font-poppins',

// })

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
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
