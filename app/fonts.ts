import { UnifrakturMaguntia } from 'next/font/google'
import localFont from 'next/font/local'

export const unifrakturMaguntia = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: '400',
})

export const edwardianScript = localFont({
  src: [
    {
      path: '../public/fonts/Edwardian Script ITC Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
})
