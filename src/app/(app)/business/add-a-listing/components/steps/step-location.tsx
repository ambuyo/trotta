'use client'

import { Heading } from '@/components/heading'

interface StepLocationProps {
  data: any
  onChange: (data: any) => void
  categories: any[]
  cities: any[]
}

export default function StepLocation({ data, onChange, cities }: StepLocationProps) {
  return (
    <div className="space-y-8">
      <div>
        <Heading level={3} className="mb-6">
          Location & Pricing
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          Help customers find you and understand your pricing.
        </p>
      </div>

      {/* Address Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Business Address *
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          placeholder="e.g., 123 Park Lane, Nairobi"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* City Selection */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          City *
        </label>
        <select
          value={data.cityId || ''}
          onChange={(e) => onChange({ ...data, cityId: e.target.value || null })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          required
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            Latitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={data.latitude || ''}
            onChange={(e) =>
              onChange({
                ...data,
                latitude: e.target.value ? parseFloat(e.target.value) : null,
              })
            }
            placeholder="e.g., -1.2921"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optional - for map display
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            Longitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={data.longitude || ''}
            onChange={(e) =>
              onChange({
                ...data,
                longitude: e.target.value ? parseFloat(e.target.value) : null,
              })
            }
            placeholder="e.g., 36.8219"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Optional - for map display
          </p>
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">
          Pricing Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Currency
            </label>
            <select
              value={data.currency}
              onChange={(e) => onChange({ ...data, currency: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            >
              <option value="KES">KES (Kenyan Shilling)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Min Price
            </label>
            <input
              type="number"
              value={data.minPrice || ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  minPrice: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Max Price
            </label>
            <input
              type="number"
              value={data.maxPrice || ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  maxPrice: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Optional - helps customers understand your pricing range
        </p>
      </div>
    </div>
  )
}
