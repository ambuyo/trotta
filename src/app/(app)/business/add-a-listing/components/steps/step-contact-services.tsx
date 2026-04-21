'use client'

import { useState } from 'react'
import { Heading } from '@/components/heading'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface StepContactServicesProps {
  data: any
  onChange: (data: any) => void
  categories: any[]
  cities: any[]
}

const COMMON_AMENITIES = [
  'Online Appointments',
  'Walk-ins Welcome',
  'Parking Available',
  'Wheelchair Accessible',
  'Evening Hours',
  'Weekend Hours',
  'English Speaking Staff',
  'Insurance Accepted',
  'Home Service',
  'Free Consultation',
]

export default function StepContactServices({
  data,
  onChange,
}: StepContactServicesProps) {
  const [amenityInput, setAmenityInput] = useState('')

  const addAmenity = (amenity: string) => {
    if (!data.amenities.includes(amenity)) {
      onChange({
        ...data,
        amenities: [...data.amenities, amenity],
      })
    }
    setAmenityInput('')
  }

  const removeAmenity = (index: number) => {
    onChange({
      ...data,
      amenities: data.amenities.filter((_: string, i: number) => i !== index),
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3} className="mb-6">
          Contact Information & Services
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          How can customers reach you and what services do you offer?
        </p>
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Phone Number *
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder="+254 123 456 789"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Email Address *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="hello@yourbusiness.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Website Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Website
        </label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
          placeholder="https://www.yourbusiness.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Services & Amenities
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.amenities.map((amenity: string, index: number) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20"
            >
              <span className="text-sm">{amenity}</span>
              <button
                onClick={() => removeAmenity(index)}
                className="hover:opacity-70 transition"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add custom service or amenity"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (amenityInput.trim()) {
                    addAmenity(amenityInput.trim())
                  }
                }
              }}
            />
            <button
              onClick={() => {
                if (amenityInput.trim()) {
                  addAmenity(amenityInput.trim())
                }
              }}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium text-sm"
            >
              Add
            </button>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Common amenities:
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => addAmenity(amenity)}
                  disabled={data.amenities.includes(amenity)}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  + {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
