'use client'

import { useState } from 'react'
import { Heading } from '@/components/heading'
import Image from 'next/image'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface StepMediaProps {
  data: any
  onChange: (data: any) => void
  categories: any[]
  cities: any[]
}

export default function StepMedia({ data, onChange }: StepMediaProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFileChange = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange({ ...data, featuredImageUrl: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3} className="mb-6">
          Featured Image
        </Heading>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a high-quality image that represents your business. This will be the main image shown to potential customers.
        </p>
      </div>

      {preview ? (
        <div className="space-y-4">
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={preview}
              alt="Featured image preview"
              fill
              className="object-cover"
            />
            <button
              onClick={() => {
                setPreview(null)
                onChange({ ...data, featuredImageUrl: '' })
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Image selected. You can remove it and upload a different one using the button above.
          </p>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <PhotoIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Drag and drop your image
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              or
            </p>
            <label className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer font-medium">
              Browse Files
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileChange(e.target.files[0])
                  }
                }}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              JPG, PNG or GIF. Maximum 10MB. Recommended aspect ratio: 16:9
            </p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Image Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Use a clear, well-lit image</li>
          <li>Show the front of your business or key facility</li>
          <li>Avoid blurry or cluttered images</li>
          <li>Make sure the image is horizontally oriented</li>
        </ul>
      </div>
    </div>
  )
}
