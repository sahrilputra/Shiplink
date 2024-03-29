import { Roboto , Poppins} from 'next/font/google'
// import localFont from 'next/font/local'

import './globals.scss'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import Provider from '@/components/providers/Provider'
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
  weight: ['100', '300', '400', '500', '600', '700', '900'],
  variable: '--font-poppins',
  display: 'swap',
  tabluar: true,

})
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata = {
  title: 'ShipLink',
  description: 'Canada\'s best package forwarding service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline';" /> */}
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          roboto.variable
        )}
      >
        <Provider>
          <main>
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
