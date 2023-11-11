'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Button from '@/components/ui/Button'
import config from '@/config'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import MainLayout from '@/components/Layout/MainLayout'

const { server } = config

const DashboardPageView = () => {
  const { data: session } = useSession()

  return (
    <MainLayout>
      <main className="w-screen h-screen flex flex-col items-center justify-center p-8 gap-8">
        <h1 className="text-secondary-500">
          Hello {session?.user?.name || 'you'} !
        </h1>
      </main>
    </MainLayout>
  )
}

export default DashboardPageView
