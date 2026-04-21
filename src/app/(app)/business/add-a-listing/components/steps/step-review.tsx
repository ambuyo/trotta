'use client'

import { Heading } from '@/components/heading'
import Image from 'next/image'

interface StepReviewProps {
  data: any
  onChange: (data: any) => void
  categories: any[]
  cities: any[]
}

export default function StepReview({ data, categories, cities }: StepReviewProps) {
  const selectedCategory = categories[data.categoryId - 1]
  const selectedSubcategory = selectedCategory?.children?.find(
    (sub: any, index: number) => index + 1 === data.subcategoryId % 10
  )
  const selectedCity = cities.find((c) => c.id === data.cityId)

  const ReviewItem = ({
    label,
    value,
    edit,
  }: {
    label: string
    value: React.ReactNode
    edit?: number
  }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <div className="text-right">
        <p className="text-gray-900 dark:text-white font-medium">{value}</p>
        {edit !== undefined && (
          <button className="text-xs text-primary hover:underline mt-1">
            Edit
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3} className="mb-6">
          Review Your Listing
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          Please review your information before submitting. You can edit any section by clicking the Edit button.
        </p>
      </div>

      {/* Featured Image Preview */}
      {data.featuredImageUrl && (
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Featured Image
          </h4>
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={data.featuredImageUrl}
              alt="Featured image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Basic Information
        </h4>
        <ReviewItem label="Business Name" value={data.name || 'Not provided'} edit={1} />
        <ReviewItem
          label="Category"
          value={selectedCategory?.name || 'Not selected'}
          edit={1}
        />
        <ReviewItem
          label="Subcategory"
          value={selectedSubcategory?.name || 'Not selected'}
          edit={1}
        />
        <div className="py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Description
          </span>
          <p className="text-gray-900 dark:text-white font-medium text-sm mt-2">
            {data.description || 'Not provided'}
          </p>
        </div>
      </div>

      {/* Contact & Services */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Contact & Services
        </h4>
        <ReviewItem label="Phone" value={data.phone || 'Not provided'} edit={2} />
        <ReviewItem label="Email" value={data.email || 'Not provided'} edit={2} />
        <ReviewItem
          label="Website"
          value={data.website || 'Not provided'}
          edit={2}
        />
        {data.amenities.length > 0 && (
          <div className="py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Services & Amenities
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.amenities.map((amenity: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Location & Pricing */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Location & Pricing
        </h4>
        <ReviewItem label="Address" value={data.address || 'Not provided'} edit={3} />
        <ReviewItem
          label="City"
          value={selectedCity?.name || 'Not selected'}
          edit={3}
        />
        {(data.latitude || data.longitude) && (
          <ReviewItem
            label="Coordinates"
            value={`${data.latitude || '–'}, ${data.longitude || '–'}`}
            edit={3}
          />
        )}
        {(data.minPrice || data.maxPrice) && (
          <ReviewItem
            label="Price Range"
            value={`${data.currency} ${data.minPrice || '0'} - ${data.maxPrice || '0'}`}
            edit={3}
          />
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          By submitting this listing, you agree to our terms of service and confirm that all information is accurate and truthful.
        </p>
      </div>
    </div>
  )
}
