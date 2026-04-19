'use client'

import clsx from 'clsx'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ButtonSubmit, LocationInputField, VerticalDividerLine } from './ui'

interface Props {
  className?: string
  formStyle: 'default' | 'small'
}

export const EventsSearchForm = ({ className, formStyle = 'default' }: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/events-search')
  }, [router])

  const handleFormSubmit = (formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData.entries())
    const location = formDataEntries['location'] as string
    let url = '/events-search'
    if (location) {
      url = url + `?location=${encodeURIComponent(location)}`
    }
    router.push(url)
  }

  return (
    <Form
      className={clsx(
        'relative z-10 flex w-full rounded-full shadow-lg-for-card bg-white [--form-bg:var(--color-white)] dark:bg-neutral-800 dark:[--form-bg:var(--color-neutral-800)]',
        className
      )}
      action={handleFormSubmit}
    >
      <LocationInputField className="hero-search-form__field-after flex-1" fieldStyle={formStyle} />
      <VerticalDividerLine />
      <div className="flex flex-shrink-0 items-center px-4">
        <ButtonSubmit fieldStyle={formStyle} />
      </div>
    </Form>
  )
}
