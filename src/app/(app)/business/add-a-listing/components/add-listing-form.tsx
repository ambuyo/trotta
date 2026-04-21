'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import StepBasicInfo from './steps/step-basic-info'
import StepContactServices from './steps/step-contact-services'
import StepLocation from './steps/step-location'
import StepMedia from './steps/step-media'
import StepReview from './steps/step-review'

interface FormData {
  name: string
  categoryId: number | null
  subcategoryId: number | null
  description: string
  phone: string
  email: string
  website: string
  amenities: string[]
  address: string
  cityId: string | null
  latitude: number | null
  longitude: number | null
  minPrice: number | null
  maxPrice: number | null
  currency: string
  featuredImageUrl: string
}

const STEPS = [
  { id: 1, title: 'Basic Info', component: StepBasicInfo },
  { id: 2, title: 'Contact & Services', component: StepContactServices },
  { id: 3, title: 'Location & Pricing', component: StepLocation },
  { id: 4, title: 'Featured Image', component: StepMedia },
  { id: 5, title: 'Review', component: StepReview },
]

interface Props {
  categories: any[]
  cities: any[]
}

export default function AddListingForm({ categories, cities }: Props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    categoryId: null,
    subcategoryId: null,
    description: '',
    phone: '',
    email: '',
    website: '',
    amenities: [],
    address: '',
    cityId: null,
    latitude: null,
    longitude: null,
    minPrice: null,
    maxPrice: null,
    currency: 'KES',
    featuredImageUrl: '',
  })

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData)
    // Handle form submission here
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex justify-between mb-4">
          {STEPS.map((step) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  currentStep >= step.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {step.id}
              </button>
              {step.id < STEPS.length && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.id
                      ? 'bg-primary'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
          {STEPS[currentStep - 1].title}
        </p>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
        <CurrentStepComponent
          data={formData}
          onChange={setFormData}
          categories={categories}
          cities={cities}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Previous
        </button>

        {currentStep === STEPS.length ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Listing
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
