import React, { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { Bookmark, Home, User } from 'react-feather'

const NavItem: FC<PropsWithChildren<{ url: string }>> = ({ url, children }) => (
  <li className="text-secondary-300 text-sm">
    <Link href={url} className="flex flex-col items-center justify-center">
      {children}
    </Link>
  </li>
)

const NavBar: FC = () => {
  return (
    <nav className="h-16 w-full fixed bottom-0 bg-white">
      <hr className="w-full h-1 bg-primary-500 border-none" />
      <ul className="flex justify-evenly items-center gap-4 h-full py-4 w-full">
        <NavItem url="/dashboard">
          <Home height={16} />
          Home
        </NavItem>
        <NavItem url="/ocds">
          <Bookmark height={16} />
          My Ocds
        </NavItem>
        <NavItem url="/account">
          <User height={16} />
          Profile
        </NavItem>
      </ul>
    </nav>
  )
}

export default NavBar
