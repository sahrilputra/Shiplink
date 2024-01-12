// import { Poppins } from 'next/font/google'
import { Poppins } from '@next/font/google'
import './globals.scss'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '900'],

})

export const metadata = {
  title: 'ShipLink',
  description: 'Canada\'s best package forwarding service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
