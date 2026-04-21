import ButtonPrimary from '@/components/button-primary'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Text } from '@/components/text'
import { fetchServiceProviderBySlug } from '@/api/directus/fetchers'
import { Metadata } from 'next'
import Form from 'next/form'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import HeaderGallery from '../../components/header-gallery'
import SectionAmenities from '../../components/section-amenities'
import { SectionFeaturedAmenities } from '../../components/section-featured-amenities'
import SectionHeader from '../../components/section-header'
import { SectionHeading } from '../../components/section-heading'
import SectionMap from '../../components/section-map'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const provider = await fetchServiceProviderBySlug(slug)

  if (!provider) {
    return {
      title: 'Provider not found',
      description: 'The provider you are looking for does not exist.',
    }
  }

  return {
    title: provider?.name,
    description: provider?.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const provider = await fetchServiceProviderBySlug(slug)

  if (!provider?.id) {
    return redirect('/all-listings/search')
  }

  const {
    name,
    description,
    about,
    location,
    latitude,
    longitude,
    rating,
    price_range,
    amenities,
    city,
    categories,
    gallery,
    image,
  } = provider

  // Default to Nairobi coordinates if latitude/longitude not available
  const mapCoordinates = {
    lat: latitude || -1.2921, // Nairobi latitude
    lng: longitude || 36.8219, // Nairobi longitude
  }

  // Build gallery images
  const galleryImgs = [
    image?.filename_disk ? `https://api.trotta.co/assets/${image.id}` : 'https://images.pexels.com/photos/1591361/pexels-photo-1591361.jpeg',
    ...(gallery || []).map((item: any) => `https://api.trotta.co/assets/${item.directus_files_id?.id}`),
  ].filter(Boolean)

  // Get category information
  const primaryCategory = categories?.[0]?.service_categories_id
  const categoryDisplay = primaryCategory?.name || 'Service Provider'

  // Convert amenities to featured format
  const parseAmenities = (items: any) => {
    if (!items) return []
    if (typeof items === 'string') {
      return items.split(',').map((item: string) => item.trim()).filter(Boolean)
    }
    if (Array.isArray(items)) {
      return items.map((item: any) => (typeof item === 'string' ? item : item.name || item.title || ''))
    }
    return []
  }

  const amenitiesList = parseAmenities(amenities)
  const featuredAmenities = amenitiesList.slice(0, 5).map((amenity: string) => ({
    icon: 'StarIcon',
    text: amenity,
  }))

  const fullAmenities = amenitiesList.map((amenity: string) => ({
    icon: 'CheckIcon',
    text: amenity,
  }))

  const handleSubmitForm = async (formData: FormData) => {
    'use server'
    console.log('Appointment form submitted:', Object.fromEntries(formData.entries()))
    // Handle appointment booking
  }

  const renderSectionInfo = () => {
    return (
      <div className="listingSection__wrap">
        <SectionHeading>About {name}</SectionHeading>
        <div className="leading-relaxed text-gray-700 dark:text-gray-300">
          <span>{about || description}</span>
        </div>
      </div>
    )
  }

  const renderSidebarBookingForm = () => {
    return (
      <div className="listingSection__wrap rounded-2xl shadow-lg-for-card bg-card p-4 sm:p-6 2xl:p-7">
        {/* PRICE RANGE */}
        {price_range && (
          <div className="mb-6">
            <div className="text-2xl font-[540]">
              {price_range.currency} {price_range.min_price}
              {price_range.max_price ? ` - ${price_range.max_price}` : ''}
            </div>
            <div className="text-sm text-muted-foreground">Price Range</div>
          </div>
        )}

        {/* RATING */}
        {rating && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-lg font-semibold">{rating}</span>
            <span className="text-sm text-muted-foreground">Rating</span>
          </div>
        )}

        {/* APPOINTMENT FORM */}
        <Form action={handleSubmitForm} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-border px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-border px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your phone"
            required
            className="w-full rounded-lg border border-border px-4 py-2"
          />
          <input
            type="datetime-local"
            name="appointment_date"
            required
            className="w-full rounded-lg border border-border px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Additional details"
            rows={3}
            className="w-full rounded-lg border border-border px-4 py-2"
          />

          <ButtonPrimary type="submit" className="w-full sm:h-12">
            Book Appointment
          </ButtonPrimary>
        </Form>

        <Text className="mt-4 text-center text-sm text-muted-foreground">
          We will contact you to confirm
        </Text>
      </div>
    )
  }

  return (
    <div>
      {/* HEADER */}
      <HeaderGallery images={galleryImgs} gridType="grid2" />

      {/* MAIN */}
      <main className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-8">
        {/* CONTENT */}
        <div className="flex w-full flex-col lg:w-3/5">
          <SectionHeader
            address={location || (city?.cities_id?.name || 'Location not specified')}
            listingCategory={categoryDisplay}
            title={name}
          />

          <Divider className="my-8 xl:my-12" />

          {featuredAmenities.length > 0 && (
            <>
              <SectionFeaturedAmenities featuredAmenities={featuredAmenities} />
              <Divider className="my-8 xl:my-12" />
            </>
          )}

          {renderSectionInfo()}

          <Divider className="my-8 xl:my-12" />

          {fullAmenities.length > 0 && (
            <>
              <SectionAmenities amenities={fullAmenities} />
              <Divider className="my-8 xl:my-12" />
            </>
          )}

          {/* MAP */}
          <SectionMap location={{ ...mapCoordinates, id: 1, name }} />
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-10">{renderSidebarBookingForm()}</div>
        </div>
      </main>
    </div>
  )
}

export default Page
