'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  Building01Icon,
  Calendar01Icon,
  HotAirBalloonFreeIcons,
  MapPinIcon,
} from '@hugeicons/core-free-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link } from '@/components/link'
import { CitiesSearchForm } from './cities-search-form'
import { EventsSearchForm } from './events-search-form'
import { ExperiencesSearchForm } from './experiences-search-form'
import { StaySearchForm } from './stay-search-form'

type TabType = 'Listings' | 'Experiences' | 'Cities' | 'Events'

const tabs: {
  name: TabType
  icon: any
  href: string
  formComponent: React.ComponentType<{ formStyle: 'default' | 'small' }>
}[] = [
  { name: 'Listings', icon: Building01Icon, href: '/stay', formComponent: StaySearchForm },
  { name: 'Experiences', icon: HotAirBalloonFreeIcons, href: '/experience', formComponent: ExperiencesSearchForm },
  { name: 'Cities', icon: MapPinIcon, href: '/cities', formComponent: CitiesSearchForm },
  { name: 'Events', icon: Calendar01Icon, href: '/events', formComponent: EventsSearchForm },
]

const HeroSearchPrimaryHome = ({
  className,
  initTab = 'Listings',
  showTabs = true,
}: {
  className?: string
  initTab?: TabType
  showTabs?: boolean
}) => {
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
