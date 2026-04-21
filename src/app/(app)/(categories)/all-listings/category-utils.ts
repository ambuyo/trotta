import { SUBCATEGORY_SLUGS } from '@/lib/slugs'

// Reverse mapping from subcategory slug to display name
const SUBCATEGORY_NAME_MAP: Record<string, Record<string, string>> = {}

// Build the reverse mapping
Object.entries(SUBCATEGORY_SLUGS).forEach(([categorySlug, subcategories]) => {
  SUBCATEGORY_NAME_MAP[categorySlug] = {}
  Object.entries(subcategories).forEach(([name, slug]) => {
    SUBCATEGORY_NAME_MAP[categorySlug][slug] = name
  })
})

// Category slug to Directus category mapping
export const CATEGORY_MAPPING = {
  'healthcare-medical': {
    id: 1,
    title: 'Healthcare & Medical Services',
    description: 'Find trusted healthcare providers, doctors, hospitals, and medical services for expats in Kenya',
    icon: '🏥',
    directusCategoryNames: ['General Practitioners', 'Dentists & Dental Care', 'Hospitals & Emergency Care', 'Pharmacies', 'Mental Health & Therapy'],
  },
  'immigration-legal': {
    id: 2,
    title: 'Immigration & Legal Services',
    description: 'Connect with immigration lawyers, visa consultants, and legal experts to support your relocation',
    icon: '⚖️',
    directusCategoryNames: ['Immigration Lawyers', 'Visa Consultants', 'Translation & Notary', 'General Legal Counsel', 'Tax Consultants'],
  },
  'housing-relocation': {
    id: 3,
    title: 'Housing & Relocation Services',
    description: 'Explore real estate agents, rental properties, and professional moving services',
    icon: '🏠',
    directusCategoryNames: ['Real Estate Agents', 'Rental Properties', 'Relocation Services', 'Moving & Storage Services', 'Property Management Services'],
  },
  'education-learning': {
    id: 4,
    title: 'Education & Learning',
    description: 'Discover international schools, language courses, and tutoring services for your family',
    icon: '📚',
    directusCategoryNames: ['International Schools', 'Language Schools', 'Tutoring Services', 'Universities & Higher Education', 'Preschools & Daycare'],
  },
  'finance-insurance': {
    id: 5,
    title: 'Finance & Insurance',
    description: 'Access banking, financial advisory, and insurance services tailored for expats',
    icon: '💰',
    directusCategoryNames: ['Banks', 'Financial Advisors', 'Insurance Companies', 'Money Transfer Services', 'Mortgage Services'],
  },
  'transportation-mobility': {
    id: 6,
    title: 'Transportation & Mobility',
    description: 'Car rentals, driving schools, and vehicle maintenance services for convenient travel',
    icon: '🚗',
    directusCategoryNames: ['Car Rental', 'Driving Schools', 'Vehicle Sales', 'Auto Repair & Maintenance', 'Public Transportation'],
  },
  'jobs-career': {
    id: 7,
    title: 'Jobs & Career',
    description: 'Find recruitment agencies, career coaches, and professional networking opportunities',
    icon: '💼',
    directusCategoryNames: ['Recruitment Agencies', 'Career Coaches', 'Networking Groups', 'Co-working Spaces', 'Resume Services'],
  },
  'home-services': {
    id: 8,
    title: 'Home Services',
    description: 'Utilities setup, cleaning, repairs, and home maintenance solutions',
    icon: '🔨',
    directusCategoryNames: ['Utilities Setup', 'Cleaning Services', 'Repair Services', 'Pest Control', 'Furniture Assembly'],
  },
  'food-dining': {
    id: 9,
    title: 'Food & Dining',
    description: 'Discover restaurants, grocery stores, and food delivery services',
    icon: '🍽️',
    directusCategoryNames: ['Restaurants & Cafes', 'Grocery Stores', 'Food Delivery', 'Catering Services', 'Specialty Food Stores'],
  },
  'community-lifestyle': {
    id: 10,
    title: 'Community & Lifestyle',
    description: 'Connect with expat communities, cultural centers, and social groups',
    icon: '👥',
    directusCategoryNames: ['Expat Communities', 'Cultural Centers', 'Sports & Fitness', 'Social Clubs', 'Event Organizers'],
  },
}

export type CategorySlug = keyof typeof CATEGORY_MAPPING

export function getCategoryMeta(slug?: string) {
  if (!slug || !CATEGORY_MAPPING[slug as CategorySlug]) {
    return null
  }
  return CATEGORY_MAPPING[slug as CategorySlug]
}

export function getAllCategories() {
  return Object.entries(CATEGORY_MAPPING).map(([slug, meta]) => ({
    slug,
    ...meta,
  }))
}

export function filterProvidersByCategory(providers: any[], categorySlug: string) {
  const category = CATEGORY_MAPPING[categorySlug as CategorySlug]
  if (!category) return []

  return providers.filter((provider: any) => {
    const providerCategories = provider.categories?.map((c: any) => c.service_categories_id?.name) || []
    return providerCategories.some((cat: string) => category.directusCategoryNames.includes(cat))
  })
}

export function getSubcategoryMeta(categorySlug: string, subcategorySlug: string) {
  const categoryMeta = getCategoryMeta(categorySlug)
  if (!categoryMeta) return null

  const subcategoryName = SUBCATEGORY_NAME_MAP[categorySlug]?.[subcategorySlug]
  if (!subcategoryName) return null

  return {
    categorySlug,
    categoryTitle: categoryMeta.title,
    subcategorySlug,
    subcategoryName,
    description: `Browse verified ${subcategoryName.toLowerCase()} services for expats in Kenya`,
  }
}

export function filterProvidersBySubcategory(
  providers: any[],
  categorySlug: string,
  subcategorySlug: string
) {
  const subcategoryMeta = getSubcategoryMeta(categorySlug, subcategorySlug)
  if (!subcategoryMeta) return []

  return providers.filter((provider: any) => {
    const providerCategories = provider.categories?.map((c: any) => c.service_categories_id?.name) || []
    return providerCategories.includes(subcategoryMeta.subcategoryName)
  })
}
