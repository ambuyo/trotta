import { Badge } from '@/components/badge'
import BtnLikeIcon from '@/components/btn-like-icon'
import StartRating from '@/components/start-rating'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

// Category ID to name mapping from Directus
const CATEGORY_ID_MAP: Record<number, string> = {
  11: 'General Practitioners',
  12: 'Dentists & Dental Care',
  13: 'Hospitals & Emergency Care',
  14: 'Pharmacies',
  15: 'Mental Health & Therapy',
  21: 'Immigration Lawyers',
  22: 'Visa Consultants',
  23: 'Translation & Notary',
  24: 'General Legal Counsel',
  25: 'Tax Consultants',
  31: 'Real Estate Agents',
  32: 'Rental Properties',
  33: 'Relocation Services',
  34: 'Moving & Storage Services',
  35: 'Property Management Services',
  41: 'International Schools',
  42: 'Language Schools',
  43: 'Tutoring Services',
  44: 'Universities & Higher Education',
  45: 'Preschools & Daycare',
  51: 'Banks',
  52: 'Financial Advisors',
  53: 'Insurance Companies',
  54: 'Money Transfer Services',
  55: 'Mortgage Services',
  61: 'Car Rental',
  62: 'Driving Schools',
  63: 'Vehicle Sales',
  64: 'Auto Repair & Maintenance',
  65: 'Public Transportation',
  71: 'Recruitment Agencies',
  72: 'Career Coaches',
  73: 'Networking Groups',
  74: 'Co-working Spaces',
  75: 'Resume Services',
  81: 'Utilities Setup',
  82: 'Cleaning Services',
  83: 'Repair Services',
  84: 'Pest Control',
  85: 'Furniture Assembly',
  91: 'Restaurants & Cafes',
  92: 'Grocery Stores',
  93: 'Food Delivery',
  94: 'Catering Services',
  95: 'Specialty Food Stores',
  101: 'Expat Communities',
  102: 'Cultural Centers',
  103: 'Sports & Fitness',
  104: 'Social Clubs',
  105: 'Event Organizers',
}

interface ServiceProviderCardProps {
  className?: string
  data: any
  isFirst?: boolean
}

const ServiceProviderCard: FC<ServiceProviderCardProps> = ({ className, data, isFirst = false }) => {
  const { id, name, slug, image, rating, description, price_range, categories } = data

  const imageUrl = image?.id
    ? `https://api.trotta.co/assets/${image.id}`
    : image?.filename_download
      ? `https://api.trotta.co/assets/${image.filename_download}`
      : 'https://images.pexels.com/photos/1591361/pexels-photo-1591361.jpeg'

  const href = `/listings/${slug || id}`

  const priceDisplay = price_range
    ? typeof price_range === 'string'
      ? price_range
      : (() => {
          const parts = []
          if (price_range.currency) parts.push(price_range.currency)
          if (price_range.min_price) parts.push(price_range.min_price)
          if (price_range.max_price) parts.push(`- ${price_range.max_price}`)
          return parts.length > 0 ? parts.join(' ') : null
        })()
    : null

  const getCategoryName = () => {
    if (!categories || categories.length === 0) return 'Service Provider'
    const firstCategory = categories[0]

    // Try to get name from expanded object first
    const categoryName = firstCategory?.service_categories_id?.name || firstCategory?.name
    if (categoryName) return categoryName

    // Try to get ID and look it up in the mapping
    let categoryId = firstCategory?.service_categories_id?.id || firstCategory?.id

    // Handle string IDs by parsing to number
    if (typeof categoryId === 'string') {
      categoryId = parseInt(categoryId, 10)
    }

    if (categoryId && CATEGORY_ID_MAP[categoryId]) {
      return CATEGORY_ID_MAP[categoryId]
    }

    // Fallback: if we have an expanded category object, try getting the name from there
    if (firstCategory?.service_categories_id?.name) {
      return firstCategory.service_categories_id.name
    }

    return 'Service Provider'
  }

  const categoryName = getCategoryName()

  return (
    <div className={`group relative ${className}`}>
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className="aspect-w-12 aspect-h-11 relative h-72 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            unoptimized
            priority={isFirst}
            loading={isFirst ? 'eager' : 'lazy'}
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <BtnLikeIcon isLiked={false} className="absolute end-3 top-3 z-1" />
      </div>

      <Link href={href}>
        <div className="mt-3.5 px-2">
          <p className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">{categoryName}</p>
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <h2 className="text-base font-medium capitalize">
              <span className="line-clamp-2">{name}</span>
            </h2>
            {rating && <StartRating point={rating} />}
          </div>
          <div className="mt-3.5">
            {priceDisplay && <span className="text-base font-medium">{priceDisplay}</span>}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ServiceProviderCard
