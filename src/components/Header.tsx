import React, { FC } from 'react'
import Link from 'next/link'
import Logo from './logos/Logo'

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-6 h-20 w-full">
      <Logo height={2.5 * 16} />
      <Link className="text-primary-500" href="/about-us">
        About us
      </Link>
    </header>
  )
}

export default Header
