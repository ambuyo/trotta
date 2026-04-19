import { Heading, Subheading } from '@/components/heading'
import {
  Beach02FreeIcons,
  Calendar01Icon,
  DocumentValidationFreeIcons,
  RenewableEnergy01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import clsx from 'clsx'
import { FC } from 'react'
import { Text } from './text'

interface Props {
  className?: string
  data?: {
    id: number
    number: string
    title: string
    description: string
    icon: IconSvgElement
  }[]
  heading?: React.ReactNode
  subHeading?: string
}

const DEMO_DATA: Props['data'] = [
  {
    id: 1,
    number: '01',
    icon: DocumentValidationFreeIcons,
    title: 'Find Verified Services',
    description: 'Skip the guesswork. Browse housing agents, healthcare providers, schools, lawyers, and more—all verified by expats who\'ve used them.',
  },
  {
    id: 2,
    number: '02',
    icon: Calendar01Icon,
    title: 'Learn from Practical Guides',
    description: 'No fluff. Just step-by-step guides on M-Pesa, visa applications, neighborhood comparisons, and the stuff that actually matters.',
  },
  {
    id: 3,
    number: '03',
    icon: RenewableEnergy01Icon,
    title: 'Connect with the Community',
    description: 'Ask questions. Share experiences. Find your people. Active forums and WhatsApp groups for real-time support.',
  },
  {
    id: 4,
    number: '04',
    icon: Beach02FreeIcons,
    title: 'Start Your Move',
    description: 'Ready to relocate? Get personalized recommendations and take action with confidence.',
  },
]

const SectionHowItWork2: FC<Props> = ({
  className,
  data = DEMO_DATA,
  heading = (
    <>
      How <span data-slot="italic">it</span> work
    </>
  ),
  subHeading = 'We love it for modern UI design because of its simple, clean, and distinctive geometric style and the designers actively work.',
}) => {
  return (
    <div className={clsx('', className)}>
      {(heading || subHeading) && (
        <div className="mb-10 lg:mb-16">
          {heading && <Heading>{heading}</Heading>}
          {subHeading && <Subheading className="mt-6">{subHeading}</Subheading>}
        </div>
      )}

      <div className="relative grid grid-cols-4 gap-4 xl:gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="col-span-4 rounded-2xl border border-border bg-card p-5 sm:col-span-2 lg:col-span-1 xl:p-8"
          >
            <div>
              <h3 className="text-4xl text-black/15 dark:text-white/20">/ {item.number}</h3>
              <h3 className="mt-3 text-xl font-medium">{item.title}</h3>
            </div>

            <div className="mt-20">
              <HugeiconsIcon icon={item.icon} className="size-11" />
              <Text className="mt-4 text-neutral-700 dark:text-neutral-400">{item.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionHowItWork2
