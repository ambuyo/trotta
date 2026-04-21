import HeroSectionPrimary from '@/components/hero-section-primary'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { fetchFeaturedServiceProviders, fetchServiceProviders, fetchListingServiceCategoriesWithCount } from '@/api/directus/fetchers'
import { getDirectusAssetURL } from '@/api/directus/directus-utils'
import { TStayListing } from '@/data/listings'
import { Metadata } from 'next'
import { getCategoryMeta, filterProvidersByCategory, getSubcategoryMeta, filterProvidersBySubcategory } from '../category-utils'

// Transform Directus service providers to TStayListing format
function transformServiceProviderToListing(provider: any): TStayListing {
  const priceRange = provider.price_range?.[0]
  const priceText = priceRange
    ? `${priceRange.min_price}-${priceRange.max_price} ${priceRange.currency}`
    : 'Contact for pricing'

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
    map: { lat: -1.2865, lng: 36.8172 },
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const categorySlug = slug?.[0]
  const subcategorySlug = slug?.[1]

  if (!categorySlug) {
    return {
      title: 'All Verified Services & Listings - Trotta Kenya',
      description: 'Browse verified service providers for expats in Kenya. Find healthcare, legal, housing, education, and more.',
      keywords: ['expat services', 'Kenya', 'verified providers', 'relocation'],
      openGraph: {
        title: 'All Verified Services & Listings - Trotta Kenya',
        description: 'Browse verified service providers for expats in Kenya',
      },
    }
  }

  if (subcategorySlug) {
    const subcategoryMeta = getSubcategoryMeta(categorySlug, subcategorySlug)
    if (!subcategoryMeta) {
      return {
        title: 'Services - Trotta Kenya',
        description: 'Find verified services in Kenya',
      }
    }

    return {
      title: `${subcategoryMeta.subcategoryName} - Trotta Kenya`,
      description: subcategoryMeta.description,
      keywords: [subcategoryMeta.subcategoryName, 'expat services', 'Kenya', 'verified providers'],
      openGraph: {
        title: `${subcategoryMeta.subcategoryName} - Trotta Kenya`,
        description: subcategoryMeta.description,
        type: 'website',
      },
    }
  }

  const categoryMeta = getCategoryMeta(categorySlug)

  if (!categoryMeta) {
    return {
      title: 'Services - Trotta Kenya',
      description: 'Find verified services in Kenya',
    }
  }

  return {
    title: `${categoryMeta.title} - Trotta Kenya`,
    description: categoryMeta.description,
    keywords: [categorySlug, 'expat services', 'Kenya', 'verified providers', categoryMeta.title],
    openGraph: {
      title: `${categoryMeta.title} - Trotta Kenya`,
      description: categoryMeta.description,
      type: 'website',
    },
  }
}

const Page = async ({ params }: { params: Promise<{ slug?: string[] }> }) => {
  const { slug } = await params
  const categorySlug = slug?.[0]
  const subcategorySlug = slug?.[1]

  try {
    const [allProviders, featuredProviders, listingCategories] = await Promise.all([
      fetchServiceProviders({ limit: 50 }),
      fetchFeaturedServiceProviders(),
      fetchListingServiceCategoriesWithCount(),
    ])

    // Filter by category/subcategory if slug provided
    let filteredProviders = allProviders
    let filteredFeaturedProviders = featuredProviders
    let categoryTitle = 'All Verified Services'
    let categoryDesc = `${allProviders.length} trusted service providers for expats in Kenya`

    if (categorySlug) {
      if (subcategorySlug) {
        const subcategoryMeta = getSubcategoryMeta(categorySlug, subcategorySlug)

        if (!subcategoryMeta) {
          return (
            <div className="container py-20 text-center">
              <h1 className="text-3xl font-bold">Service not found</h1>
              <p className="mt-4 text-gray-600">The service you're looking for doesn't exist.</p>
            </div>
          )
        }

        categoryTitle = subcategoryMeta.subcategoryName
        categoryDesc = subcategoryMeta.description

        filteredProviders = filterProvidersBySubcategory(allProviders, categorySlug, subcategorySlug)
        filteredFeaturedProviders = filterProvidersBySubcategory(featuredProviders, categorySlug, subcategorySlug)
      } else {
        const categoryMeta = getCategoryMeta(categorySlug)

        if (!categoryMeta) {
          return (
            <div className="container py-20 text-center">
              <h1 className="text-3xl font-bold">Category not found</h1>
              <p className="mt-4 text-gray-600">The category you're looking for doesn't exist.</p>
            </div>
          )
        }

        categoryTitle = categoryMeta.title
        categoryDesc = categoryMeta.description

        filteredProviders = filterProvidersByCategory(allProviders, categorySlug)
        filteredFeaturedProviders = filterProvidersByCategory(featuredProviders, categorySlug)
      }
    }

    const allListings = filteredProviders.map(transformServiceProviderToListing)
    const featuredListings = filteredFeaturedProviders.map(transformServiceProviderToListing)

    return (
      <div className="relative container space-y-20 pb-28 sm:space-y-24">
        <HeroSectionPrimary
          title={categoryTitle}
          listingCategories={listingCategories}
          compact
        />

        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found in this category yet.</p>
          </div>
        ) : (
          <>
            {featuredListings.length > 0 && (
              <SectionListingsCarousel
                heading={`Featured <span data-slot="italic">service providers</span>`}
                headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
                subHeading="Handpicked professionals trusted by our community of 500+ expats."
                listings={featuredListings}
                cardType="stay"
              />
            )}

            <SectionListingsCarousel
              heading={`Browse <span data-slot="italic">${categorySlug ? 'all ' + categoryTitle.toLowerCase() : 'services'}</span>`}
              headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
              subHeading={subcategorySlug ? 'Find verified providers in this service category.' : 'Find verified providers across various categories.'}
              listings={allListings}
              cardType="stay"
            />
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching service providers:', error)

    return (
      <div className="relative container space-y-20 pb-28 sm:space-y-24">
        <HeroSectionPrimary
          title="Verified Services"
          listingCategories={[]}
          compact
        />
        <div className="py-12 text-center">
          <p className="text-gray-600">Unable to load services. Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default Page
