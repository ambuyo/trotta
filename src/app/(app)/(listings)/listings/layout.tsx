import { ApplicationLayout } from '@/app/application-layout'
import { ReactNode } from 'react'
import { BreadcrumbExample } from '../components/beadcrumb'

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationLayout>
      <div className="container mt-5 max-w-7xl lg:mt-8">
        {children}

        <div className="mt-10 mb-5">
          <BreadcrumbExample />
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
