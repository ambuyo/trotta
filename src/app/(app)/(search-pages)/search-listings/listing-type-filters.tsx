'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { LISTING_TYPE_CONFIG, SUBCATEGORIES_MAP } from './listing-utils'

interface Props {
  className?: string
}

const ListingTypeFilters: FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [listingType, setListingType] = useState<'stay' | 'car' | 'experience' | 'flight'>(
    (searchParams.get('type') as any) || 'stay'
  )
  const [subcategory, setSubcategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('type', listingType)
    if (subcategory) {
      params.set('category', subcategory)
    } else {
      params.delete('category')
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }, [listingType, subcategory, router, searchParams])

  const handleListingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setListingType(e.target.value as any)
    setSubcategory('')
  }

  const listingTypeOptions = Object.entries(LISTING_TYPE_CONFIG)

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        {listingTypeOptions.map(([key, config]) => (
          <button
            key={key}
            onClick={() => {
              setListingType(key as any)
              setSubcategory('')
            }}
            className={clsx(
              'px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 border-2 flex items-center gap-2',
              listingType === key
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            )}
          >
            <span className="text-lg">{config.icon}</span>
            <span className="hidden sm:inline">{config.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2.5">Category</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className={clsx(
              'w-full px-4 py-2.5 rounded-lg border-2 bg-white text-gray-900 font-medium',
              'transition-all duration-200 focus:outline-none',
              'border-gray-200 hover:border-blue-300',
              'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              'cursor-pointer appearance-none bg-right',
              "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232563eb%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3e%3cpolyline points=%226 9 12 15 18 9%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat pr-8"
            )}
          >
            <option value="">All Categories</option>
            {SUBCATEGORIES_MAP[listingType]?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:hidden"></div>
      </div>

      {subcategory && (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-medium">Active filter:</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {SUBCATEGORIES_MAP[listingType]?.find((c) => c.id === subcategory)?.name}
            <button
              onClick={() => setSubcategory('')}
              className="hover:text-blue-900 ml-1 font-bold"
            >
              ✕
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

export default ListingTypeFilters
