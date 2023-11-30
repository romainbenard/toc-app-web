import React, { FC, PropsWithChildren } from 'react'
import Header from '../Header'
import NavBar from '../NavBar'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white w-full min-h-[100vh]">
      <Header />
      <main className="bg-white mt-4 pb-20 px-8 w-full h-full">{children}</main>
      <NavBar />
    </div>
  )
}

export default MainLayout
