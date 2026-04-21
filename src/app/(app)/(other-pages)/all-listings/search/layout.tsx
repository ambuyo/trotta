import { ApplicationLayout } from '@/app/application-layout'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  return <ApplicationLayout>{children}</ApplicationLayout>
}

export default Layout
