import React, { FC } from 'react'
import Logo from './Logos/Logo'
import Link from 'next/link'

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-6 h-20 fixed top-0 w-full">
      <Logo height={2.5 * 16} />
      <Link className="text-primary-500" href="/about-us">
        About us
      </Link>
    </header>
  )
}

export default Header
