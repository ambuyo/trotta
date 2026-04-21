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

export const SUBCATEGORY_MAPPING: Record<string, Record<string, { description: string; metaDescription: string }>> = {
  'community-lifestyle': {
    'cultural-centers': {
      description: 'Explore Kenya\'s vibrant cultural centers offering art, music, and heritage experiences designed for expats seeking cultural immersion.',
      metaDescription: 'Discover cultural centers in Kenya - art galleries, music venues, and heritage sites for expat community engagement.',
    },
    'event-organizers': {
      description: 'Connect with professional event organizers specializing in corporate events, weddings, and community gatherings for expats in Kenya.',
      metaDescription: 'Find event organizers in Kenya - corporate events, weddings, and celebrations tailored for expat communities.',
    },
    'expat-communities': {
      description: 'Join thriving expat communities in Kenya with networking events, support groups, and social gatherings.',
      metaDescription: 'Connect with expat communities in Kenya - networking, support groups, and social events.',
    },
    'social-clubs': {
      description: 'Discover social clubs in Kenya offering recreational activities, social events, and community connections for expats.',
      metaDescription: 'Expat social clubs in Kenya - recreational activities, networking, and community events.',
    },
    'sports-fitness': {
      description: 'Find fitness centers, gyms, and sports clubs in Kenya offering facilities and classes for expats seeking active lifestyles.',
      metaDescription: 'Sports and fitness in Kenya - gyms, fitness centers, and sports clubs for expats.',
    },
  },
  'education-learning': {
    'international-schools': {
      description: 'Browse top-rated international schools in Kenya offering world-class education for expat children.',
      metaDescription: 'International schools in Kenya - quality education for expat families and international curricula.',
    },
    'language-schools': {
      description: 'Learn Swahili and other languages at reputable language schools in Kenya designed for expats and professionals.',
      metaDescription: 'Language schools in Kenya - Swahili courses, professional language training for expats.',
    },
    'preschools-daycare': {
      description: 'Find trusted preschools and daycare centers in Kenya providing safe, nurturing care for young children of expats.',
      metaDescription: 'Preschools and daycare in Kenya - quality childcare and early education for expat families.',
    },
    'tutoring-services': {
      description: 'Access qualified tutoring services in Kenya covering academic subjects and test preparation for expat students.',
      metaDescription: 'Tutoring services in Kenya - academic support and test preparation for expat families.',
    },
    'universities': {
      description: 'Explore universities in Kenya offering higher education programs and international degree pathways.',
      metaDescription: 'Universities in Kenya - higher education, degree programs, and international academic opportunities.',
    },
  },
  'finance-insurance': {
    'banks': {
      description: 'Access reputable banks in Kenya offering accounts, loans, and financial services tailored for expats.',
      metaDescription: 'Banks in Kenya - expat accounts, loans, and financial services for international residents.',
    },
    'financial-advisors': {
      description: 'Connect with experienced financial advisors in Kenya specializing in expat wealth management and investment strategies.',
      metaDescription: 'Financial advisors in Kenya - wealth management, investments, and financial planning for expats.',
    },
    'insurance-companies': {
      description: 'Find comprehensive insurance solutions in Kenya including health, property, and travel insurance for expats.',
      metaDescription: 'Insurance in Kenya - health, property, travel insurance and comprehensive coverage for expats.',
    },
    'money-transfer-services': {
      description: 'Use secure and affordable money transfer services in Kenya to send funds internationally with competitive rates.',
      metaDescription: 'Money transfer in Kenya - international remittance, secure fund transfers for expats.',
    },
    'mortgage-services': {
      description: 'Explore mortgage options in Kenya from trusted lenders offering flexible financing for property purchase.',
      metaDescription: 'Mortgages in Kenya - property financing, home loans, and lending services for expat buyers.',
    },
  },
  'food-dining': {
    'catering-services': {
      description: 'Book professional catering services in Kenya for events, corporate functions, and private celebrations.',
      metaDescription: 'Catering in Kenya - corporate catering, event catering, and professional food services.',
    },
    'food-delivery': {
      description: 'Enjoy convenient food delivery services in Kenya bringing restaurants and meals to your doorstep.',
      metaDescription: 'Food delivery in Kenya - restaurant delivery, meal services, convenient dining options.',
    },
    'grocery-stores': {
      description: 'Shop at quality grocery stores in Kenya stocking international products and fresh local produce.',
      metaDescription: 'Grocery stores in Kenya - international products, fresh produce, quality shopping for expats.',
    },
    'restaurants-cafes': {
      description: 'Discover diverse restaurants and cafes in Kenya offering international cuisine and local specialties.',
      metaDescription: 'Restaurants and cafes in Kenya - dining, international cuisine, local and world flavors.',
    },
    'specialty-food-stores': {
      description: 'Find specialty food stores in Kenya offering organic products, imported goods, and dietary-specific provisions.',
      metaDescription: 'Specialty food stores in Kenya - organic, imported, and dietary-specific food products.',
    },
  },
  'healthcare-medical': {
    'dentists-dental-care': {
      description: 'Access quality dental care in Kenya from experienced dentists using modern techniques and equipment.',
      metaDescription: 'Dentists in Kenya - dental care, teeth cleaning, orthodontics for expat dental health.',
    },
    'general-practitioners': {
      description: 'Find reliable general practitioners in Kenya offering primary healthcare and medical consultations.',
      metaDescription: 'General practitioners in Kenya - primary healthcare, medical consultations, doctor services.',
    },
    'hospitals-emergency': {
      description: 'Locate well-equipped hospitals in Kenya with emergency services and comprehensive medical facilities.',
      metaDescription: 'Hospitals in Kenya - emergency care, medical facilities, quality healthcare services.',
    },
    'mental-health-therapy': {
      description: 'Connect with qualified mental health professionals and therapists in Kenya offering counseling and psychological support.',
      metaDescription: 'Mental health and therapy in Kenya - counseling, psychological support, therapist services.',
    },
    'pharmacies': {
      description: 'Find reliable pharmacies in Kenya stocking medications and providing professional pharmaceutical services.',
      metaDescription: 'Pharmacies in Kenya - medications, prescription services, pharmaceutical health support.',
    },
  },
  'home-services': {
    'cleaning-services': {
      description: 'Hire professional home cleaning services in Kenya for residential and commercial spaces.',
      metaDescription: 'Cleaning services in Kenya - professional home cleaning, residential and commercial services.',
    },
    'furniture-assembly': {
      description: 'Get expert furniture assembly services in Kenya for residential and office furniture setup.',
      metaDescription: 'Furniture assembly in Kenya - professional assembly services for home and office furniture.',
    },
    'pest-control': {
      description: 'Protect your home with professional pest control services in Kenya using safe, effective methods.',
      metaDescription: 'Pest control in Kenya - professional pest management, safe and effective solutions.',
    },
    'repair-services': {
      description: 'Access skilled repair technicians in Kenya for appliances, electronics, and home maintenance.',
      metaDescription: 'Repair services in Kenya - appliance repair, electronics, home maintenance services.',
    },
    'utilities-setup': {
      description: 'Simplify utilities setup in Kenya with professional assistance for electricity, water, and internet connections.',
      metaDescription: 'Utilities setup in Kenya - electricity, water, internet connection services for new residents.',
    },
  },
  'housing-relocation': {
    'moving-storage': {
      description: 'Plan your relocation with professional moving and storage services in Kenya for hassle-free transitions.',
      metaDescription: 'Moving and storage in Kenya - professional relocation, storage solutions for expats.',
    },
    'property-companies': {
      description: 'Work with established property companies in Kenya for property management and real estate solutions.',
      metaDescription: 'Property companies in Kenya - real estate management, property services, professional assistance.',
    },
    'real-estate-agents': {
      description: 'Find experienced real estate agents in Kenya specializing in expat property searches and transactions.',
      metaDescription: 'Real estate agents in Kenya - property search, home buying, rental assistance for expats.',
    },
    'relocation-services': {
      description: 'Simplify your move to Kenya with comprehensive relocation services covering logistics and settlement support.',
      metaDescription: 'Relocation services in Kenya - comprehensive moving support, settling in Kenya, relocation assistance.',
    },
    'rental-properties': {
      description: 'Browse rental properties in Kenya from furnished apartments to luxury homes for expat residents.',
      metaDescription: 'Rental properties in Kenya - apartments, homes, luxury rentals for expat living.',
    },
  },
  'immigration-legal': {
    'general-counsel': {
      description: 'Consult with legal counsel in Kenya on various matters including contracts, disputes, and legal documentation.',
      metaDescription: 'Legal counsel in Kenya - general legal advice, contracts, dispute resolution services.',
    },
    'immigration-lawyers': {
      description: 'Get expert immigration law assistance in Kenya for visas, permits, and relocation documentation.',
      metaDescription: 'Immigration lawyers in Kenya - visa assistance, permits, legal documentation for relocation.',
    },
    'tax-consultants': {
      description: 'Work with experienced tax consultants in Kenya for tax planning, filing, and compliance matters.',
      metaDescription: 'Tax consultants in Kenya - tax planning, filing, compliance, and professional tax services.',
    },
    'translation-notary': {
      description: 'Access professional translation and notary services in Kenya for official documentation and certified translations.',
      metaDescription: 'Translation and notary services in Kenya - document translation, notarization, official services.',
    },
    'visa-consultants': {
      description: 'Navigate visa processes with expert consultants in Kenya specializing in travel permits and documentation.',
      metaDescription: 'Visa consultants in Kenya - visa assistance, travel permits, immigration documentation.',
    },
  },
  'jobs-career': {
    'career-coaches': {
      description: 'Work with professional career coaches in Kenya to advance your career and achieve professional goals.',
      metaDescription: 'Career coaches in Kenya - career development, professional advancement, coaching services.',
    },
    'coworking-spaces': {
      description: 'Find modern co-working spaces in Kenya offering flexible workspaces and professional environments.',
      metaDescription: 'Co-working spaces in Kenya - flexible workspaces, professional offices, remote work solutions.',
    },
    'networking-groups': {
      description: 'Join professional networking groups in Kenya for business connections and industry engagement.',
      metaDescription: 'Networking groups in Kenya - professional connections, business networking, industry events.',
    },
    'recruitment-agencies': {
      description: 'Connect with recruitment agencies in Kenya specializing in job placement and talent acquisition.',
      metaDescription: 'Recruitment agencies in Kenya - job placement, talent acquisition, career opportunities.',
    },
    'resume-services': {
      description: 'Enhance your career with professional resume and CV writing services in Kenya.',
      metaDescription: 'Resume services in Kenya - CV writing, resume preparation, professional career documents.',
    },
  },
  'transportation-mobility': {
    'auto-repairs': {
      description: 'Find reliable auto repair shops in Kenya offering maintenance, repairs, and vehicle servicing.',
      metaDescription: 'Auto repairs in Kenya - vehicle maintenance, repair services, professional mechanics.',
    },
    'car-rental': {
      description: 'Rent cars in Kenya from trusted rental companies offering competitive rates and quality vehicles.',
      metaDescription: 'Car rental in Kenya - vehicle rentals, competitive rates, quality cars for travel.',
    },
    'driving-schools': {
      description: 'Learn to drive at professional driving schools in Kenya offering lessons and license preparation.',
      metaDescription: 'Driving schools in Kenya - driving lessons, license preparation, professional instruction.',
    },
    'public-transportation': {
      description: 'Navigate Kenya\'s public transportation system with guidance on buses, matatus, and commuting options.',
      metaDescription: 'Public transportation in Kenya - buses, matatus, commuting options, travel guides.',
    },
    'vehicle-sales': {
      description: 'Browse vehicle sales in Kenya offering new and used cars from reputable dealers.',
      metaDescription: 'Vehicle sales in Kenya - new and used cars, car dealerships, vehicle purchasing.',
    },
  },
}

export function getSubcategoryMeta(categorySlug: string, subcategorySlug: string) {
  const categoryMeta = getCategoryMeta(categorySlug)
  if (!categoryMeta) return null

  const subcategoryName = SUBCATEGORY_NAME_MAP[categorySlug]?.[subcategorySlug]
  if (!subcategoryName) return null

  const subcategoryData = SUBCATEGORY_MAPPING[categorySlug]?.[subcategorySlug]

  return {
    categorySlug,
    categoryTitle: categoryMeta.title,
    subcategorySlug,
    subcategoryName,
    description: subcategoryData?.description || `Browse verified ${subcategoryName.toLowerCase()} services for expats in Kenya`,
    metaDescription: subcategoryData?.metaDescription || `Find verified ${subcategoryName.toLowerCase()} in Kenya`,
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
