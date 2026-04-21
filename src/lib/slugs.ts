export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const CATEGORY_SLUGS = {
  'Community & Lifestyle': 'community-lifestyle',
  'Education & Learning': 'education-learning',
  'Finance & Insurance': 'finance-insurance',
  'Food & Dining': 'food-dining',
  'Healthcare & Medical': 'healthcare-medical',
  'Home Services': 'home-services',
  'Housing & Relocation': 'housing-relocation',
  'Immigration & Legal': 'immigration-legal',
  'Jobs & Career': 'jobs-career',
  'Transport': 'transportation-mobility',
} as const

export const SUBCATEGORY_SLUGS: Record<string, Record<string, string>> = {
  'community-lifestyle': {
    'Cultural Centers': 'cultural-centers',
    'Event Organizers': 'event-organizers',
    'Expat Communities': 'expat-communities',
    'Social Clubs': 'social-clubs',
    'Sports & Fitness': 'sports-fitness',
  },
  'education-learning': {
    'International Schools': 'international-schools',
    'Language Schools': 'language-schools',
    'Preschools & Daycare': 'preschools-daycare',
    'Tutoring Services': 'tutoring-services',
    'Universities': 'universities',
  },
  'finance-insurance': {
    'Banks': 'banks',
    'Financial Advisors': 'financial-advisors',
    'Insurance Companies': 'insurance-companies',
    'Money Transfer Services': 'money-transfer-services',
    'Mortgage Services': 'mortgage-services',
  },
  'food-dining': {
    'Catering Services': 'catering-services',
    'Food Delivery': 'food-delivery',
    'Grocery Stores': 'grocery-stores',
    'Restaurants & Cafes': 'restaurants-cafes',
    'Specialty Food Stores': 'specialty-food-stores',
  },
  'healthcare-medical': {
    'Dentists & Dental Care': 'dentists-dental-care',
    'General Practitioners': 'general-practitioners',
    'Hospitals & Emergency': 'hospitals-emergency',
    'Mental Health & Therapy': 'mental-health-therapy',
    'Pharmacies': 'pharmacies',
  },
  'home-services': {
    'Cleaning Services': 'cleaning-services',
    'Furniture Assembly': 'furniture-assembly',
    'Pest Control': 'pest-control',
    'Repair Services': 'repair-services',
    'Utilities Setup': 'utilities-setup',
  },
  'housing-relocation': {
    'Moving & Storage': 'moving-storage',
    'Property Companies': 'property-companies',
    'Real Estate Agents': 'real-estate-agents',
    'Relocation Services': 'relocation-services',
    'Rental Properties': 'rental-properties',
  },
  'immigration-legal': {
    'General Counsel': 'general-counsel',
    'Immigration Lawyers': 'immigration-lawyers',
    'Tax Consultants': 'tax-consultants',
    'Translation & Notary': 'translation-notary',
    'Visa Consultants': 'visa-consultants',
  },
  'jobs-career': {
    'Career Coaches': 'career-coaches',
    'Co-working Spaces': 'coworking-spaces',
    'Networking Groups': 'networking-groups',
    'Recruitment Agencies': 'recruitment-agencies',
    'Resume Services': 'resume-services',
  },
  'transportation-mobility': {
    'Auto Repairs': 'auto-repairs',
    'Car Rental': 'car-rental',
    'Driving Schools': 'driving-schools',
    'Public Transportation': 'public-transportation',
    'Vehicle Sales': 'vehicle-sales',
  },
}
