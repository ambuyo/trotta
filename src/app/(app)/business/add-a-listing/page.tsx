import { fetchKenyaCities } from '@/api/directus/fetchers'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import AddListingForm from './components/add-listing-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add a Listing',
  description: 'Add a new service provider listing to Trotta',
}

async function Page() {
  const cities = await fetchKenyaCities(100)

  return (
    <div className="container py-12">
      <div className="mb-12 max-w-2xl">
        <Heading level={1} className="mb-3">
          Add a Listing
        </Heading>
        <Text className="text-lg text-neutral-600 dark:text-neutral-400">
          Share your service with our community. Fill in the details about your business and start reaching expats in Kenya.
        </Text>
      </div>

      <AddListingForm categories={[]} cities={cities} />
    </div>
  )
}

export default Page
