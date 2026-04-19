import { ApplicationLayout } from '@/app/application-layout'
import Header from '@/components/header/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Ceepii is a modern and elegant template for Next.js, Tailwind CSS, and TypeScript. It is designed to be simple and easy to use, with a focus on performance and accessibility.',
  keywords: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Ceepii', 'Travel', 'E-commerce', 'Booking', 'Cars'],
}

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  return <ApplicationLayout header={<Header hasBorderBottom={true} />}>{children}</ApplicationLayout>
}
