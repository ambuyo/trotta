import HeroSection4 from '@/components/section-hero-4'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { fetchFeaturedServiceProviders, fetchServiceProviders } from '@/api/directus/fetchers'
import { getDirectusAssetURL } from '@/api/directus/directus-utils'
import { TStayListing } from '@/data/listings'

// Transform Directus service providers to TStayListing format
function transformServiceProviderToListing(provider: any): TStayListing {
  const priceRange = provider.price_range?.[0]
  const priceText = priceRange
    ? `${priceRange.min_price}-${priceRange.max_price} ${priceRange.currency}`
    : 'Contact for pricing'

  // Transform amenities from string array to { icon, text } format
  const amenitiesArray = Array.isArray(provider.amenities) ? provider.amenities : []
  const transformedAmenities = amenitiesArray.slice(0, 6).map((amenity: string) => ({
    icon: 'CheckIcon',
    text: amenity,
  }))

  return {
    id: String(provider.id),
    title: provider.name,
    nameLocalized: provider.categories?.[0]?.service_categories_id?.name || 'Service Provider',
    handle: provider.slug,
    price: priceText,
    featuredImage: getDirectusAssetURL(provider.image),
    galleryImgs: provider.gallery?.map((g: any) =>
      getDirectusAssetURL(g.directus_files_id)
    ) || [getDirectusAssetURL(provider.image)],
    like: false,
    reviewStart: provider.rating || 0,
    reviewCount: 0,
    amenities: transformedAmenities,
    address: provider.location || provider.address || '',
    badge: provider.verified ? 'Verified' : '',
    map: { lat: -1.2865, lng: 36.8172 }, // Default Nairobi coordinates
  }
}

const Page = async () => {
  try {
    // Fetch all service providers and featured providers in parallel
    const [allProviders, featuredProviders] = await Promise.all([
      fetchServiceProviders({ limit: 12 }),
      fetchFeaturedServiceProviders(),
    ])

    // Transform providers to listing format
    const allListings = allProviders.map(transformServiceProviderToListing)
    const featuredListings = featuredProviders.map(transformServiceProviderToListing)

    const totalCount = allListings.length

    return (
      <div className="relative container space-y-20 pb-28 sm:space-y-24">
        <HeroSection4
          heading="All Verified Services"
          subHeading={`${totalCount} trusted service providers for expats in Kenya`}
        />

        {/* Featured Services */}
        {featuredListings.length > 0 && (
          <SectionListingsCarousel
            heading={`Featured <span data-slot="italic">service providers</span>`}
            headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
            subHeading="Handpicked professionals trusted by our community of 500+ expats."
            listings={featuredListings}
            cardType="stay"
          />
        )}

        {/* All Service Providers */}
        <SectionListingsCarousel
          heading={`Browse <span data-slot="italic">all services</span>`}
          headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
          subHeading="Find verified providers across various categories."
          listings={allListings}
          cardType="stay"
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching service providers:', error)

    // Fallback UI if data fetch fails
    return (
      <div className="relative container space-y-20 pb-28 sm:space-y-24">
        <HeroSection4
          heading="All Verified Services"
          subHeading="Service providers for expats in Kenya"
        />
        <div className="py-12 text-center">
          <p className="text-gray-600">Unable to load service providers. Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default Page
