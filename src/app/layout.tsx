import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { cn } from '@/lib/utils'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Google_Sans_Flex, Playfair_Display, Stardos_Stencil } from 'next/font/google'
import 'rc-slider/assets/index.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-sans',
})

const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-serif',
})

const stardos_stencil = Stardos_Stencil({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-stencil',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Ceepii | Booking online React Next.js template',
    default: 'Ceepii - Booking online React Next.js template',
  },
  description: 'Booking online & rental online Next.js Template',
  keywords: ['Ceepii', 'Booking online', 'Rental online', 'React Next.js template'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={process.env.NEXT_PUBLIC_THEME_DIR === 'rtl' ? 'ar' : 'en'}
      dir={process.env.NEXT_PUBLIC_THEME_DIR}
      suppressHydrationWarning
      className={cn(clsx(googleSansFlex.variable, playfair_display.variable, stardos_stencil.variable), 'font-sans')}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <DirectionProvider direction={process.env.NEXT_PUBLIC_THEME_DIR} dir={process.env.NEXT_PUBLIC_THEME_DIR}>
            <div>
              {children}

              {/* For Ceepii's demo  -- you can remove it  */}
              {/* <CustomizeControl /> */}
            </div>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
