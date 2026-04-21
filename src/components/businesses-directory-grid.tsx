'use client'

import Link from 'next/link'
import { getAllCategories } from '@/app/(app)/(categories)/all-listings/category-utils'

const BusinessesDirectoryGrid = () => {
  const categories = getAllCategories()

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5 xl:gap-7">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/all-listings/${category.slug}`}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-6 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-700"
        >
          <div className="flex flex-col items-start justify-between h-full gap-4">
            <div className="text-4xl">{category.icon}</div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {category.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 dark:to-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        </Link>
      ))}
    </div>
  )
}

export default BusinessesDirectoryGrid
