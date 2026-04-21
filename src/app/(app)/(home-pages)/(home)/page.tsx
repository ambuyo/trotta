import SectionGridPosts3 from '@/components/blog/section-grid-post-3'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import GroupPopularListings from '@/components/group-popular-listings'
import HowTrottaWorks from '@/components/how-trotta-works'
import ListingsDirectoryAnchor from '@/components/listings-directory-anchor'

import { Heading } from '@/components/heading'
import HeroSectionPrimary from '@/components/hero-section-primary'
import InspirationFutureGetawaysSection from '@/components/inspiration-future-getaways-section'
import NewsletterSection from '@/components/newsletter-section-1'
import { RevealInView } from '@/components/reveal-in-view'
import SectionDreamDestination from '@/components/section-dream-destination'
import SectionGridAuthorBox from '@/components/section-grid-author-box'
import SectionGridFeaturedListings from '@/components/section-grid-featured-listings'
import SectionGroupCategoriesCarousel from '@/components/section-group-categories-carousel'
import SectionInterestingInfor from '@/components/section-interesting-infor'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import SectionWhyUs from '@/components/section-why-us'
import { Text } from '@/components/text'
import { getAuthors } from '@/data/authors'
import { getGroupStayCategories, getStayCategories, getGroupKenyaCities } from '@/data/categories'
import { getBlogPosts } from '@/data/data'
import { getStayListings } from '@/data/listings'
import { fetchFeaturedServiceProviders } from '@/api/directus/fetchers'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the Stay application',
}

async function Page() {
  const [categories, stayListings, authors, groupCategories, kenyaCities, posts, featuredServices] =
    await Promise.all([
      getStayCategories(),
      getStayListings(),
      getAuthors(),
      getGroupStayCategories(),
      getGroupKenyaCities(),
      getBlogPosts(),
      fetchFeaturedServiceProviders(),
    ])

  return (
    <main className="relative section-space-bottom">
      <div className="px-4">
        <HeroSectionPrimary listingCategories={[]} />
      </div>

            <div className="container section-space-xl">
        <RevealInView className="container">
          <GroupPopularListings
            groupCategories={kenyaCities}
            heading={
              <>
                Popular <span data-slot="italic">Cities and Towns</span>
              </>
            }
            cardStyle="8"
          />
        </RevealInView>
      </div>

        <section className="bg-zinc-50 section-space-xl dark:bg-zinc-900">
        <RevealInView className="container">
          <SectionGridFeaturedListings
            stayListings={stayListings.slice(0, 4)}
            heading={
              <>
                Making your move to Kenya <span data-slot="italic">simple</span>
              </>
            }
            description="Verified services and tested guides from expats who've been exactly where you are."
            buttonText="All Featured Listings"
            buttonHref="/all-listings"
          />
        </RevealInView>
      </section>

       <div className="bg-zinc-50 section-space-xl dark:bg-zinc-900 pt-0">
        <RevealInView className="container section-space-xl pb-0">
          <SectionListingsCarousel
            listings={featuredServices}
            cardType="service-provider"
            heading="Featured Services"
            subHeading="Discover the latest verified providers for expats in Kenya"
          />
        </RevealInView>
      </div>

     <RevealInView className="container section-space-lg">
        <HowTrottaWorks />
      </RevealInView>

             <div className="bg-zinc-50 section-space-xl dark:bg-zinc-900 pt-0">
        <RevealInView className="container section-space-xl pb-0">
          <SectionListingsCarousel
            listings={stayListings.slice(0, 8).reverse()}
            cardType="stay"
            heading="Top Nairobi Listings"
            subHeading="Discover the latest verified providers for expats in Kenya"
          />
        </RevealInView>

        <RevealInView className="container section-space-xl pb-0">
          <SectionListingsCarousel
            listings={stayListings.slice(0, 8).reverse()}
            cardType="stay"
            heading="Top Mombasa Listings"
            subHeading="Discover the latest verified providers for expats in Kenya"
          />
        </RevealInView>

         <RevealInView className="container section-space-xl pb-0">
          <SectionListingsCarousel
            listings={stayListings.slice(0, 8).reverse()}
            cardType="stay"
            heading="Top Naivasha Listings"
            subHeading="Discover the latest verified providers for expats in Kenya"
          />
        </RevealInView>

      </div>


      <RevealInView className="container section-space-xl">
        <SectionInterestingInfor />
      </RevealInView>

      <section className="bg-zinc-50 section-space-xl dark:bg-zinc-900">
        <RevealInView className="container">
          <SectionGroupCategoriesCarousel groupCategories={groupCategories} />
        </RevealInView>
      </section>

      <div className="container section-space-xl">
        <RevealInView className="container section-space-xl pb-0">
          <Heading>
            Stay with top-rated <span data-slot="italic">hosts</span>
          </Heading>
          <Text className="mt-3 max-w-lg text-neutral-600 dark:text-neutral-400">
            Selected for their exceptional hospitality and top-rated properties.
          </Text>
          <SectionGridAuthorBox className="mt-13" boxCard="box1" authors={authors} />
        </RevealInView>
      </div>

      <section className="bg-zinc-50 section-space-xl dark:bg-zinc-900">
        <RevealInView className="container">
          <SectionWhyUs />
        </RevealInView>
      </section>

      <RevealInView className="container py-5">
        <Divider />
      </RevealInView>

      <RevealInView className="container section-space">
        <SectionGridPosts3 posts={posts.slice(0, 4)} />
      </RevealInView>

            <RevealInView className="container py-5">
        <Divider />
      </RevealInView>

        <div className="container section-space-xl">
        <RevealInView className="container">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
            <Heading>
              Full Businesses <span data-slot="italic">Directory</span>
            </Heading>
            <Button color="light" href="/search-listings">
              All Listings 
              <ArrowRightIcon className="size-4! rtl:rotate-180" />
            </Button>
          </div>
          <ListingsDirectoryAnchor categories={[]} />
        </RevealInView>
      </div>

      <RevealInView className="container section-space-smaller pt-8">
        <NewsletterSection />
      </RevealInView>
    </main>
  )
}

export default Page
