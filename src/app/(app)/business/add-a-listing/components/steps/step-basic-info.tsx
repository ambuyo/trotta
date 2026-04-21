'use client'

import { useMemo } from 'react'
import { Heading } from '@/components/heading'

interface StepBasicInfoProps {
  data: any
  onChange: (data: any) => void
  categories: any[]
  cities: any[]
}

export default function StepBasicInfo({ data, onChange, categories }: StepBasicInfoProps) {
  const mainCategories = useMemo(() => {
    return categories.map((cat, index) => ({
      id: index + 1,
      name: cat.name,
    }))
  }, [categories])

  const subcategories = useMemo(() => {
    if (!data.categoryId) return []
    const selectedCategory = categories[data.categoryId - 1]
    if (!selectedCategory?.children) return []
    return selectedCategory.children.map((child: any, childIndex: number) => ({
      id: data.categoryId * 10 + (childIndex + 1),
      name: child.name,
    }))
  }, [data.categoryId, categories])

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3} className="mb-6">
          Let's start with the basics
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your business and what category it belongs to.
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Business Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="e.g., Kenya Medical Clinic, Nairobi Dental"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          required
        />
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            Category *
          </label>
          <select
            value={data.categoryId || ''}
            onChange={(e) =>
              onChange({
                ...data,
                categoryId: e.target.value ? parseInt(e.target.value) : null,
                subcategoryId: null,
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            required
          >
            <option value="">Select a category</option>
            {mainCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            Subcategory *
          </label>
          <select
            value={data.subcategoryId || ''}
            onChange={(e) =>
              onChange({
                ...data,
                subcategoryId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            disabled={!data.categoryId}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
            required
          >
            <option value="">
              {data.categoryId ? 'Select a subcategory' : 'Choose category first'}
            </option>
            {subcategories.map((sub: any) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Description *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Describe your business, services offered, and what makes you special..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {data.description.length}/500 characters
        </p>
      </div>
    </div>
  )
}
