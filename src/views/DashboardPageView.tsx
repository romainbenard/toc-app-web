'use client'

import { useSession } from 'next-auth/react'
import MainLayout from '@/components/Layout/MainLayout'
import Link from 'next/link'

const DashboardPageView = () => {
  const { data: session } = useSession()

  return (
    <MainLayout>
      <main className="w-screen h-screen flex flex-col items-center justify-center p-8 gap-8">
        <h1 className="text-secondary-500">
          Hello {session?.user?.name || 'you'} !
        </h1>

        <Link href="/ocd/new">
          <div className="flex justify-center items-center h-12 w-12 rounded-[50%] bg-primary-500 text-white font-semibold text-4xl">
            +
          </div>
        </Link>
      </main>
    </MainLayout>
  )
}

export default DashboardPageView
