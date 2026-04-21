import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { FC } from 'react'
import { Button } from '../button'
import CurrLangDropdown from './curr-lang-dropdown'
import HamburgerBtnMenu from './hamburger-btn-menu'
import { HeaderNavigation } from './navigation/header-navigation'

interface Props {
  hasBorderBottom?: boolean
  className?: string
}

const Header: FC<Props> = async ({ hasBorderBottom = true, className }) => {
  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'relative border-border bg-background',
          hasBorderBottom && 'border-b',
          !hasBorderBottom && 'has-[.header-popover-full-panel]:border-b'
        )}
      >
        <div className="container flex h-20 justify-between">
          <div className="flex flex-1 items-center lg:hidden">
            <HamburgerBtnMenu />
          </div>

          <div className="flex items-center lg:flex-1">
            <Link href="/" className="inline-block transition-opacity duration-150 hover:opacity-80">
              <Image
                src="/brand/logos/trotta-main-logo.png"
                alt="Trotta"
                width={77}
                height={28}
                priority
                className="h-auto w-auto"
              />
            </Link>
          </div>

          <div className="mx-4 flex flex-2">
            <HeaderNavigation />
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-2.5">
            <Button className="sm:text-sm" plain href={'/business/add-a-listing'}>
              List your business
            </Button>
            <CurrLangDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
