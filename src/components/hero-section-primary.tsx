import avatar1 from '@/images/avatars/Image-1.png'
import avatar2 from '@/images/avatars/Image-2.png'
import avatar3 from '@/images/avatars/Image-3.png'
import flightHeroImg from '@/images/hero-img-flight.png'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'
import Avatar from './avatar'
import { FadeIn } from './fade-in'
import { Heading } from './heading'
import HeroSearchPrimaryHome from './hero-search-form/hero-search-primary-home'

const users = [
  {
    id: 1,
    name: 'Alice',
    avatarUrl: avatar1.src,
  },
  {
    id: 2,
    name: 'Bob',
    avatarUrl: avatar2.src,
  },
  {
    id: 3,
    name: 'Charlie',
    avatarUrl: avatar3.src,
  },
]

interface HeroSectionPrimaryProps {
  className?: string
  title?: ReactNode
  heroImg?: string | StaticImageData
}

const HeroSectionPrimary = ({
  className,
  title = (
    <>
      Settle. Explore. 
 <span data-slot="italic">Thrive in Kenya.</span>
    </>
  ),
  heroImg = flightHeroImg,
}: HeroSectionPrimaryProps) => {
  return (
    <div
      className={clsx(
        'hero-section-primary relative flex min-h-100 w-full sm:min-h-112 lg:min-h-[calc(100dvh-96px)]',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={heroImg}
          alt="hero"
          className="rounded-3xl object-cover object-top"
          fill
          sizes="(max-width: 480px) 200vw, (max-width: 768px) 150vw, 120vw"
          priority
        />
      </div>
      <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-sky-600 to-transparent opacity-30" />

      <div className="relative container flex flex-1 py-22 2xl:py-26">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-22">
          <FadeIn className="flex w-full" transition={{ delay: 0.1, duration: 1 }}>
            <HeroSearchPrimaryHome />
          </FadeIn>

          <div className="flex max-w-4xl flex-col items-center text-center 2xl:max-w-5xl">
            <FadeIn transition={{ delay: 0.4, duration: 1 }}>
              <Heading
                level={1}
                fontSize="text-4xl/none md:text-5xl/none lg:text-6xl/none 2xl:text-7xl/none "
                className="font-medium text-white"
              >
                {title}
              </Heading>
            </FadeIn>

            <FadeIn transition={{ delay: 0.5, duration: 1 }}>
              <p className="mt-6 max-w-2xl text-center text-lg text-white/90 md:text-xl">
                Find verified services, practical guides, and connect with a community that gets it.
              </p>
            </FadeIn>

            <FadeIn
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-10 flex flex-wrap items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-left text-sm font-medium text-neutral-900"
            >
              <StarIcon className="mb-px size-4" />
              <span className="hidden sm:inline">4.9 average rating over 25K+ reviews</span>
              <span className="sm:hidden">4.9/5 over 25K+ reviews</span>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionPrimary
