import React, { FC, PropsWithChildren } from 'react'
import Header from '../Header'
import NavBar from '../NavBar'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white w-full min-h-[100vh]">
      <Header />
      <main className="bg-white mt-4 pb-20 px-5 w-full h-full sm:px-8 md:px-[15vw] lg:px-[20vw]">
        {children}
      </main>
      <NavBar />
    </div>
  )
}

export default MainLayout
