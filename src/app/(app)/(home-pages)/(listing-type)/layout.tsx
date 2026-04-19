import { ApplicationLayout } from '@/app/application-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Ceepii | Booking online React Next.js template',
    default: 'Ceepii - Booking online React Next.js template',
  },
  description:
    'Ceepii is a modern and elegant template for Next.js, Tailwind CSS, and TypeScript. It is designed to be simple and easy to use, with a focus on performance and accessibility.',
  keywords: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Ceepii', 'Travel', 'E-commerce', 'Booking', 'Cars'],
}

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  return <ApplicationLayout>{children}</ApplicationLayout>
}
