import PostCard3 from '@/components/blog/post-card3'
import NewsletterSection from '@/components/newsletter-section-1'
import HeroSection4 from '@/components/section-hero-4'
import { Heading } from '@/components/heading'
import { getBlogPosts } from '@/data/data'
import guideHeroImg from '@/images/hero-img-exp.png'
import { BookOpen02Icon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expat Guides',
  description: 'Practical guides for expats living and moving to Kenya — from healthcare to housing, visas, schools, and more.',
}

export default async function GuidesPage() {
  const posts = await getBlogPosts()

  return (
    <div className="relative space-y-20 pb-28 sm:space-y-24">
      <HeroSection4
        heroImg={guideHeroImg}
        heading={`Practical guides for <span data-slot="italic">expats in Kenya</span>`}
        subHeading="Tips, how-tos, and local knowledge from expats who've been there"
        subHeadingIcon={BookOpen02Icon}
        showSearch={false}
      />

      <div className="container flex flex-col gap-16">
        <Heading>
          All <span data-slot="italic">guides</span>
        </Heading>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {posts.map((post) => (
            <PostCard3 key={post.id} post={post} />
          ))}
        </div>

        <NewsletterSection />
      </div>
    </div>
  )
}
