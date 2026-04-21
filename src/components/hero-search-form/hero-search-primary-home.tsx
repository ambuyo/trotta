'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  Building01Icon,
  Calendar01Icon,
} from '@hugeicons/core-free-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link } from '@/components/link'
import { ListingsSearchForm } from '@/components/listings-search-form'
import { EventsSearchForm } from './events-search-form'

type TabType = 'Listings' | 'Events'

interface ListingsSearchFormWrapperProps {
  formStyle: 'default' | 'small'
  categories: any[]
  subcategories: any[]
}

const ListingsSearchFormWrapper = ({ formStyle, categories, subcategories }: ListingsSearchFormWrapperProps) => (
  <ListingsSearchForm categories={categories} subcategories={subcategories} />
)

const HeroSearchPrimaryHome = ({
  className,
  initTab = 'Listings',
  showTabs = true,
  listingCategories = [],
}: {
  className?: string
  initTab?: TabType
  showTabs?: boolean
  listingCategories?: any[]
}) => {
  const listingMainCategories = listingCategories.map((cat, index) => ({
    id: index + 1,
    name: cat.name,
    slug: cat.handle,
  }))

  const allListingSubcategories = listingCategories.flatMap((cat, catIndex) =>
    (cat.children || []).map((child: any, childIndex: number) => ({
      id: (catIndex + 1) * 10 + (childIndex + 1),
      name: child.name,
      slug: child.handle,
    }))
  )

  const tabs: {
    name: TabType
    icon: any
    href: string
    formComponent: React.ComponentType<any>
  }[] = [
    {
      name: 'Listings',
      icon: Building01Icon,
      href: '/stay',
      formComponent: ({ formStyle }: { formStyle: 'default' | 'small' }) => (
        <ListingsSearchFormWrapper
          formStyle={formStyle}
          categories={listingMainCategories}
          subcategories={allListingSubcategories}
        />
      ),
    },
    { name: 'Events', icon: Calendar01Icon, href: '/events', formComponent: EventsSearchForm },
  ]
  const [activeTab, setActiveTab] = useState<TabType>(initTab)

  return (
    <div className={clsx('hero-search-primary-home hidden w-full lg:block', className)}>
      {showTabs && (
        <div className="mb-8 flex justify-center space-x-6 sm:space-x-9">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={clsx(
                'relative flex shrink-0 items-center pb-2 text-sm font-[450] focus-visible:outline-hidden transition-colors',
                activeTab === tab.name ? 'text-white' : 'text-white/70 hover:text-white'
              )}
            >
              <HugeiconsIcon icon={tab.icon} className="me-2.5 size-5 sm:size-6" />
              <span>{tab.name}</span>
              <div
                className={clsx(
                  'absolute inset-x-0 top-full h-0.5 rounded-full bg-white transition-opacity',
                  activeTab === tab.name ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
          ))}
        </div>
      )}
      {tabs.map((tab) =>
        tab.name === activeTab ? (
          <Fragment key={tab.name}>
            <tab.formComponent formStyle={'default'} />
          </Fragment>
        ) : null
      )}
    </div>
  )
}

export default HeroSearchPrimaryHome
