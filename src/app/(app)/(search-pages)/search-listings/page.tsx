import { Metadata } from 'next'
import SectionGridHasMap from './section-grid-has-map'
import ListingTypeFilters from './listing-type-filters'
import { getListingsByType, getServiceProvidersForSearch, getFilterOptionsByType, ListingType } from './listing-utils'
import { Heading } from '@/components/heading'
import { RevealInView } from '@/components/reveal-in-view'

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
  
  // Fetch service providers for stay type
  const serviceProviders = listingType === 'stay' ? await getServiceProvidersForSearch() : []

  return (
    <div className="container px-4 lg:px-8 xl:max-w-none">
      <div className="py-8">
        <ListingTypeFilters />
      </div>

      {/* Static stays section */}
      {listingType === 'stay' && listings.length > 0 && (
        <div className="mb-20">
          <RevealInView>
            <Heading className="mb-6">
              Accommodation <span data-slot="italic">Listings</span>
            </Heading>
          </RevealInView>
          <SectionGridHasMap listings={listings} filterOptions={filterOptions} listingType={listingType} />
        </div>
      )}

      {/* Service providers section */}
      {listingType === 'stay' && serviceProviders.length > 0 && (
        <div className="mt-20">
          <RevealInView>
            <Heading className="mb-6">
              Verified <span data-slot="italic">Services</span>
            </Heading>
          </RevealInView>
          <SectionGridHasMap listings={serviceProviders} filterOptions={filterOptions} listingType={listingType} />
        </div>
      )}

      {/* Other listing types (car, experience, flight) */}
      {listingType !== 'stay' && (
        <SectionGridHasMap listings={listings} filterOptions={filterOptions} listingType={listingType} />
      )}

      {/* No listings message */}
      {listings.length === 0 && serviceProviders.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600">No listings found for this type.</p>
        </div>
      )}
    </div>
  )
}

export default Page
