import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShipLink',
  description: 'Canada\'s best package forwarding service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
