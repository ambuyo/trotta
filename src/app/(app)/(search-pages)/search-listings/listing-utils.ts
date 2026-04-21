import {
  getStayListings,
  getCarListings,
  getExperienceListings,
  getFlightListings,
} from '@/data/listings'
import {
  getStayListingFilterOptions,
  getCarListingFilterOptions,
  getExperienceListingFilterOptions,
  getFlightFilterOptions,
} from '@/data/data'

export type ListingType = 'stay' | 'car' | 'experience' | 'flight'

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
