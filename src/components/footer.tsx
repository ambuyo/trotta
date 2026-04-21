import { CustomLink } from '@/data/types'
import Logo from '@/components/logo'
import SocialsList1 from '@/components/socials-list1'
import React from 'react'

interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const CATEGORY_MAPPING = {
  'healthcare-medical': {
    title: 'Healthcare & Medical',
    services: ['General Practitioners', 'Dentists & Dental Care', 'Hospitals & Emergency Care', 'Pharmacies', 'Mental Health & Therapy'],
  },
  'immigration-legal': {
    title: 'Immigration & Legal',
    services: ['Immigration Lawyers', 'Visa Consultants', 'Translation & Notary', 'General Legal Counsel', 'Tax Consultants'],
  },
  'housing-relocation': {
    title: 'Housing & Relocation',
    services: ['Real Estate Agents', 'Rental Properties', 'Relocation Services', 'Moving & Storage Services', 'Property Management Services'],
  },
  'education-learning': {
    title: 'Education & Learning',
    services: ['International Schools', 'Language Schools', 'Tutoring Services', 'Universities & Higher Education', 'Preschools & Daycare'],
  },
  'finance-insurance': {
    title: 'Finance & Insurance',
    services: ['Banks', 'Financial Advisors', 'Insurance Companies', 'Money Transfer Services', 'Mortgage Services'],
  },
  'transportation-mobility': {
    title: 'Transportation & Mobility',
    services: ['Car Rental', 'Driving Schools', 'Vehicle Sales', 'Auto Repair & Maintenance', 'Public Transportation'],
  },
  'jobs-career': {
    title: 'Jobs & Career',
    services: ['Recruitment Agencies', 'Career Coaches', 'Networking Groups', 'Co-working Spaces', 'Resume Services'],
  },
  'home-services': {
    title: 'Home Services',
    services: ['Utilities Setup', 'Cleaning Services', 'Repair Services', 'Pest Control', 'Furniture Assembly'],
  },
  'food-dining': {
    title: 'Food & Dining',
    services: ['Restaurants & Cafes', 'Grocery Stores', 'Food Delivery', 'Catering Services', 'Specialty Food Stores'],
  },
  'community-lifestyle': {
    title: 'Community & Lifestyle',
    services: ['Expat Communities', 'Cultural Centers', 'Sports & Fitness', 'Social Clubs', 'Event Organizers'],
  },
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'Healthcare & Medical',
    menus: CATEGORY_MAPPING['healthcare-medical'].services.map(service => ({
      href: '/all-listings/healthcare-medical',
      label: service,
    })),
  },
  {
    id: '2',
    title: 'Immigration & Legal',
    menus: CATEGORY_MAPPING['immigration-legal'].services.map(service => ({
      href: '/all-listings/immigration-legal',
      label: service,
    })),
  },
  {
    id: '3',
    title: 'Housing & Relocation',
    menus: CATEGORY_MAPPING['housing-relocation'].services.map(service => ({
      href: '/all-listings/housing-relocation',
      label: service,
    })),
  },
  {
    id: '4',
    title: 'Education & Learning',
    menus: CATEGORY_MAPPING['education-learning'].services.map(service => ({
      href: '/all-listings/education-learning',
      label: service,
    })),
  },
  {
    id: '5',
    title: 'Finance & Insurance',
    menus: CATEGORY_MAPPING['finance-insurance'].services.map(service => ({
      href: '/all-listings/finance-insurance',
      label: service,
    })),
  },
  {
    id: '6',
    title: 'Transportation & Mobility',
    menus: CATEGORY_MAPPING['transportation-mobility'].services.map(service => ({
      href: '/all-listings/transportation-mobility',
      label: service,
    })),
  },
  {
    id: '7',
    title: 'Jobs & Career',
    menus: CATEGORY_MAPPING['jobs-career'].services.map(service => ({
      href: '/all-listings/jobs-career',
      label: service,
    })),
  },
  {
    id: '8',
    title: 'Home Services',
    menus: CATEGORY_MAPPING['home-services'].services.map(service => ({
      href: '/all-listings/home-services',
      label: service,
    })),
  },
  {
    id: '9',
    title: 'Food & Dining',
    menus: CATEGORY_MAPPING['food-dining'].services.map(service => ({
      href: '/all-listings/food-dining',
      label: service,
    })),
  },
  {
    id: '10',
    title: 'Community & Lifestyle',
    menus: CATEGORY_MAPPING['community-lifestyle'].services.map(service => ({
      href: '/all-listings/community-lifestyle',
      label: service,
    })),
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="relative border-t border-neutral-200 py-24 lg:py-28 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
          <div className="col-span-2 md:col-span-1">
            <Logo className="w-14" />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center gap-x-3 lg:flex-col lg:items-start lg:gap-x-0 lg:gap-y-2.5" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  )
}

export default Footer
