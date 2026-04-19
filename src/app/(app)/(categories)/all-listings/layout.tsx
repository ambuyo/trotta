import Aside from '@/components/aside'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import FooterQuickNavigation from '@/components/footer-quick-navigation'
import Footer3 from '@/components/footer3'
import Header from '@/components/header/header'
import HeroSearchFormMobile from '@/components/hero-search-form-mobile/hero-search-form-mobile'
import { MotionDiv } from '@/components/motion-div'
import { Metadata } from 'next'
import 'rc-slider/assets/index.css'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - Ceepii | Booking online React Next.js template',
    default: 'All Listings - Ceepii',
  },
  description: 'Browse all verified services for expats in Kenya.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Aside.Provider>
      {/* Desktop Header - Will be hidden on mobile devices  */}
      <MotionDiv
        className="hidden w-full lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
      </MotionDiv>
      {/* HeroSearchFormMobile - will display on mobile devices instead of Header-desktop */}
      <div className="sticky top-0 z-20 bg-background shadow-sm lg:hidden">
        <div className="container flex h-20 items-center justify-center">
          <HeroSearchFormMobile />
        </div>
      </div>
      {/*  */}
      {children}
      {/*  */}
      {/* FooterQuickNavigation - Displays on mobile devices and is fixed at the bottom of the screen */}
      <FooterQuickNavigation />
      {/* Chose footer style here!!!! */}
      <Footer3 />
      {/*  */}
      <AsideSidebarNavigation />
    </Aside.Provider>
  )
}
