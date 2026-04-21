import {
  getStayListings,
  getCarListings,
  getExperienceListings,
  getFlightListings,
  TStayListing,
} from '@/data/listings'
import {
  getStayListingFilterOptions,
  getCarListingFilterOptions,
  getExperienceListingFilterOptions,
  getFlightFilterOptions,
} from '@/data/data'
import { fetchServiceProviders } from '@/api/directus/fetchers'
import { getDirectusAssetURL } from '@/api/directus/directus-utils'

export type ListingType = 'stay' | 'car' | 'experience' | 'flight'

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

export async function getListingsByType(type: ListingType): Promise<any[]> {
  switch (type) {
    case 'stay':
      return await getStayListings()
    case 'car':
      return await getCarListings()
    case 'experience':
      return await getExperienceListings()
    case 'flight':
      return await getFlightListings()
    default:
      return await getStayListings()
  }
}

export async function getServiceProvidersForSearch(): Promise<TStayListing[]> {
  try {
    const providers = await fetchServiceProviders({ limit: 50 })
    return providers.map(transformServiceProviderToListing)
  } catch (error) {
    console.error('Error fetching service providers:', error)
    return []
  }
}

export async function getFilterOptionsByType(type: ListingType) {
  switch (type) {
    case 'stay':
      return await getStayListingFilterOptions()
    case 'car':
      return await getCarListingFilterOptions()
    case 'experience':
      return await getExperienceListingFilterOptions()
    case 'flight':
      return await getFlightFilterOptions()
    default:
      return await getStayListingFilterOptions()
  }
}

export const LISTING_TYPE_CONFIG = {
  stay: { label: 'Stays', icon: '🏠', description: 'Find accommodations' },
  car: { label: 'Cars', icon: '🚗', description: 'Rent vehicles' },
  experience: { label: 'Experiences', icon: '🎯', description: 'Book activities' },
  flight: { label: 'Flights', icon: '✈️', description: 'Book flights' },
}

export const SUBCATEGORIES_MAP: Record<ListingType, Array<{ id: string; name: string }>> = {
  stay: [
    { id: 'beach', name: 'Beach' },
    { id: 'mountain', name: 'Mountain' },
    { id: 'city', name: 'City' },
    { id: 'countryside', name: 'Countryside' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'budget', name: 'Budget' },
  ],
  car: [
    { id: 'economy', name: 'Economy' },
    { id: 'suv', name: 'SUV' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'van', name: 'Van' },
    { id: 'sports', name: 'Sports' },
  ],
  experience: [
    { id: 'culture', name: 'Art & Culture' },
    { id: 'nature', name: 'Nature' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'wellness', name: 'Wellness' },
  ],
  flight: [
    { id: 'economy', name: 'Economy' },
    { id: 'business', name: 'Business' },
    { id: 'first', name: 'First Class' },
    { id: 'direct', name: 'Direct Flights' },
  ],
}
