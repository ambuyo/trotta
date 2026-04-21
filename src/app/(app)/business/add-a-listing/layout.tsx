import { ApplicationLayout } from '@/app/application-layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationLayout>
      <div className="container max-w-7xl">
        {children}
      </div>
    </ApplicationLayout>
  )
}

export default Layout
