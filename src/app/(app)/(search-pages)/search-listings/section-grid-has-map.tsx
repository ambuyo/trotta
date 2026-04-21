'use client'

import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import ListingFilterTabs from '@/components/listing-filter-tabs'
import Pagination from '@/components/pagination'
import StayCard2 from '@/components/stay-card2'
import { LeftToRightListDashIcon, MapsIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC, useState } from 'react'
import MapWithMarkers from './map-with-markers'
import { ListingType, LISTING_TYPE_CONFIG } from './listing-utils'

interface Props {
  className?: string
  listings: any[]
  filterOptions: any
  listingType?: ListingType
}

const SectionGridHasMap: FC<Props> = ({ listings, filterOptions, listingType = 'stay' }) => {
  const [currentHoverID, setCurrentHoverID] = useState<string>('')
  const [showMap, setShowMap] = useState(false)

  const getListingTitle = () => {
    switch (listingType) {
      case 'stay':
        return `Over ${listings.length} homes`
      case 'car':
        return `Over ${listings.length} vehicles`
      case 'experience':
        return `Over ${listings.length} experiences`
      case 'flight':
        return `Over ${listings.length} flights`
      default:
        return `Over ${listings.length} listings`
    }
  }

  const config = LISTING_TYPE_CONFIG[listingType]

  return (
    <div className={clsx('relative flex min-h-screen gap-8 2xl:gap-12')}>
      <div className={clsx('flex-1 flex-col pt-6 pb-20 lg:flex-1/2 lg:pt-8', showMap ? 'hidden lg:flex' : 'flex')}>
        <ListingFilterTabs
          className="flex justify-center lg:justify-start"
          inPageStaySearchWithMap
          filterOptions={filterOptions}
          optionPanelAnchor="bottom start"
        />

        <Divider className="my-6 xl:my-8" />

        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <h2 id="heading" className="scroll-mt-20 text-xl font-[550]">
            {getListingTitle()}
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:gap-x-8">
          {listings.map((listing) => (
            <div
              key={listing.id}
              onMouseEnter={() => setCurrentHoverID(listing.id)}
              onMouseLeave={() => setCurrentHoverID('')}
            >
              <StayCard2 data={listing} />
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center">
          <Pagination />
        </div>
      </div>

      <div
        id="search-page-show-map-btn"
        className="fixed inset-x-0 bottom-23 z-10 flex justify-center gap-4 transition-transform lg:hidden"
      >
        {
          <Button onClick={() => setShowMap(!showMap)}>
            {showMap ? 'Show list' : 'Show map'}
            <HugeiconsIcon icon={showMap ? LeftToRightListDashIcon : MapsIcon} size={20} />
          </Button>
        }
      </div>

      <div className={clsx('flex-1 lg:flex-1/2', showMap ? 'block' : 'hidden lg:block')}>
        <div
          className={clsx(
            'fixed inset-0 top-0 flex lg:sticky lg:top-22.5 lg:size-full lg:max-h-[calc(100vh-calc(var(--spacing)*22))] lg:py-6'
          )}
        >
          <div className="relative flex-1 overflow-hidden lg:rounded-3xl">
            <MapWithMarkers currentHoverID={currentHoverID} listings={listings} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionGridHasMap
