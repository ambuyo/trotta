import { Metadata } from 'next'
import SectionGridHasMap from './section-grid-has-map'
import ListingTypeFilters from './listing-type-filters'
import { getListingsByType, getFilterOptionsByType, ListingType } from './listing-utils'

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  const { handle } = await params

  return { title: 'Search listings', description: 'Find and explore listings' }
}

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ handle?: string[] }>
  searchParams: Promise<{ type?: string; category?: string }>
}) => {
  const { type = 'stay', category } = await searchParams

  const listingType = (type as ListingType) || 'stay'

  const listings = await getListingsByType(listingType)
  const filterOptions = await getFilterOptionsByType(listingType)

  return (
    <div className="container px-4 lg:px-8 xl:max-w-none">
      <div className="py-8">
        <ListingTypeFilters />
      </div>
      <SectionGridHasMap listings={listings} filterOptions={filterOptions} listingType={listingType} />
    </div>
  )
}

export default Page
