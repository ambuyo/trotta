import { getStayListingFilterOptions } from '@/data/data'
import { getStayListings } from '@/data/listings'
import { Metadata } from 'next'
import SectionGridHasMap from './section-grid-has-map'

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  const { handle } = await params

  return { title: 'All listings search', description: 'Search all listings with map' }
}

const Page = async ({ params }: { params: Promise<{ handle?: string[] }> }) => {
  const listings = await getStayListings()
  const filterOptions = await getStayListingFilterOptions()

  return (
    <div className="container px-4 lg:px-8 xl:max-w-none">
      <SectionGridHasMap listings={listings} filterOptions={filterOptions} categories={[]} />
    </div>
  )
}

export default Page
