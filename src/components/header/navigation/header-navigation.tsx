'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { getListingsMenuItems } from '@/data/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'

// DEMO DATA
const listingsMenuItems = getListingsMenuItems()

export function HeaderNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="rounded-full shadow-md-for-card px-2 py-1.5">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex" data-listings-menu>
          <NavigationMenuTrigger>Listings</NavigationMenuTrigger>
          <NavigationMenuContent className="!left-1/2 !-translate-x-1/2 !w-auto">
            <ul className="grid w-[900px] flex-1 grid-cols-5 gap-x-4 gap-y-8 p-5 text-sm">
              {listingsMenuItems.map((listingsMenuItem, index) => (
                <div key={index}>
                  <p className="font-medium">{listingsMenuItem.title}</p>
                  <ul className="mt-4 grid space-y-3">
                    {listingsMenuItem.children?.map((menuItem, index) => (
                      <li key={index} className={clsx('menu-item')}>
                        <Link className="text-sm font-normal hover:underline" href={menuItem.href || '#'}>
                          {menuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] flex-1 grid-cols-1 gap-5 p-4">
              <Link href="/about" className="group -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent">
                <div className="font-medium">About</div>
              </Link>
              <Link href="/guides" className="group -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent">
                <div className="font-medium">Guides</div>
              </Link>
              <Link href="/blog" className="group -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent">
                <div className="font-medium">Blog</div>
              </Link>
              <Link href="/events" className="group -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent">
                <div className="font-medium">Events</div>
              </Link>
              <Link href="/community" className="group -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent">
                <div className="font-medium">Community</div>
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/search-listings">Search</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
