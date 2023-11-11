import React, { FC, PropsWithChildren } from 'react'
import NavBar from '../NavBar'
import Header from '../Header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      {children}
      <NavBar />
    </div>
  )
}

export default MainLayout
