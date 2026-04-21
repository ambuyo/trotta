'use client'

import clsx from 'clsx'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { FC, useState, useMemo, useRef } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { VerticalDividerLine } from '../hero-search-form/ui'

interface ServiceCategory {
  id: number
  name: string
  slug: string
}

interface Props {
  className?: string
  categories: ServiceCategory[]
  subcategories: ServiceCategory[]
}

export const ListingsSearchForm: FC<Props> = ({ className, categories = [], subcategories = [] }) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<ServiceCategory | null>(null)
  const [keyword, setKeyword] = useState('')
  const categoryButtonRef = useRef<HTMLButtonElement>(null)
  const subcategoryButtonRef = useRef<HTMLButtonElement>(null)

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory) return []
    return subcategories.filter(sub => Math.floor(sub.id / 10) === selectedCategory.id)
  }, [selectedCategory, subcategories])

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategory(category)
    setSelectedSubcategory(null)
    categoryButtonRef.current?.click()
  }

  const handleSubcategoryChange = (subcategory: ServiceCategory) => {
    setSelectedSubcategory(subcategory)
    subcategoryButtonRef.current?.click()
  }

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setKeyword('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (selectedCategory) {
      params.set('category', selectedCategory.slug)
    }
    if (selectedSubcategory) {
      params.set('subcategory', selectedSubcategory.slug)
    }
    if (keyword) {
      params.set('keyword', keyword)
    }

    const url = `/all-listings/search${params.toString() ? '?' + params.toString() : ''}`
    router.push(url)
  }

  return (
    <form
      className={clsx(
        'relative z-10 flex w-full rounded-full shadow-lg-for-card bg-white [--form-bg:var(--color-white)] dark:bg-neutral-800 dark:[--form-bg:var(--color-neutral-800)]',
        className
      )}
      onSubmit={handleSubmit}
    >
      {/* Category Dropdown */}
      <Popover className="group relative z-10 flex flex-1">
        {({ open: showPopover }) => (
          <>
            <PopoverButton
              ref={categoryButtonRef}
              className={clsx(
                'relative z-10 shrink-0 w-full cursor-pointer flex items-center gap-x-3 focus:outline-hidden text-start px-7 py-4 xl:px-8 xl:py-5',
                showPopover && 'rounded-full bg-transparent focus-visible:outline-hidden dark:bg-white/5 custom-shadow-1'
              )}
            >
              <div className="flex-1">
                <span className="block font-[550] text-base xl:text-lg">
                  <span className="line-clamp-1">{selectedCategory?.name || 'Category'}</span>
                </span>
                <span className="mt-1 block text-sm leading-none font-[350] text-neutral-400">Select category</span>
              </div>
            </PopoverButton>

            <PopoverPanel unmount={false} transition className={clsx(
              'absolute top-full z-10 mt-3 w-96 transition duration-150 data-closed:translate-y-1 data-closed:opacity-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5 dark:bg-neutral-800'
            )}>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={clsx(
                      'w-full text-left px-4 py-3 rounded-lg transition-colors',
                      selectedCategory?.id === cat.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      <VerticalDividerLine />

      {/* Subcategory Dropdown */}
      <Popover className={clsx('group relative z-10 flex flex-1', !selectedCategory && 'opacity-50 cursor-not-allowed')}>
        {({ open: showPopover }) => (
          <>
            <PopoverButton
              ref={subcategoryButtonRef}
              disabled={!selectedCategory}
              className={clsx(
                'relative z-10 shrink-0 w-full cursor-pointer flex items-center gap-x-3 focus:outline-hidden text-start px-7 py-4 xl:px-8 xl:py-5',
                showPopover && 'rounded-full bg-transparent focus-visible:outline-hidden dark:bg-white/5 custom-shadow-1',
                !selectedCategory && 'cursor-not-allowed'
              )}
            >
              <div className="flex-1">
                <span className="block font-[550] text-base xl:text-lg">
                  <span className="line-clamp-1">{selectedSubcategory?.name || 'Subcategory'}</span>
                </span>
                <span className="mt-1 block text-sm leading-none font-[350] text-neutral-400">
                  {selectedCategory ? 'Select subcategory' : 'Choose category first'}
                </span>
              </div>
            </PopoverButton>

            {selectedCategory && (
              <PopoverPanel unmount={false} transition className={clsx(
                'absolute top-full z-10 mt-3 w-96 transition duration-150 data-closed:translate-y-1 data-closed:opacity-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5 dark:bg-neutral-800'
              )}>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSubcategories.length > 0 ? (
                    filteredSubcategories.map(subcat => (
                      <button
                        key={subcat.id}
                        type="button"
                        onClick={() => handleSubcategoryChange(subcat)}
                        className={clsx(
                          'w-full text-left px-4 py-3 rounded-lg transition-colors',
                          selectedSubcategory?.id === subcat.id
                            ? 'bg-primary text-white'
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        )}
                      >
                        {subcat.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-center py-4">No subcategories available</p>
                  )}
                </div>
              </PopoverPanel>
            )}
          </>
        )}
      </Popover>

      <VerticalDividerLine />

      {/* Keyword Search Field */}
      <div className="flex-1 relative z-10 flex items-center gap-x-3 px-7 py-4 xl:px-8 xl:py-5">
        <MagnifyingGlassIcon className="size-5 text-neutral-300 lg:size-7 dark:text-neutral-400 shrink-0" />
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by provider name..."
          className="w-full bg-transparent outline-none text-base xl:text-lg font-[550] placeholder-neutral-400 dark:placeholder-neutral-500"
        />
      </div>

      {/* Clear Button */}
      {(selectedCategory || selectedSubcategory || keyword) && (
        <>
          <VerticalDividerLine />
          <button
            type="button"
            onClick={handleClearFilters}
            className="shrink-0 px-7 py-4 xl:px-8 xl:py-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            title="Clear filters"
          >
            <XMarkIcon className="size-5 lg:size-6" />
          </button>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="z-10 shrink-0 rounded-full bg-primary text-white px-7 py-4 xl:px-8 xl:py-5 font-[550] transition-all hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  )
}
