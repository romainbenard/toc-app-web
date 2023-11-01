'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Button from '@/components/ui/Button'
import { useSession } from 'next-auth/react'

const DashboardPageView = () => {
  const { data: session, status } = useSession()

  const { register } = useForm<CreateOcdFormInputs>()

  return (
    <main className="w-screen h-screen bg-secondary-300 flex flex-col items-center justify-center p-8 gap-8">
      <form className="mt-8 flex flex-col w-full items-center">
        <div className="flex flex-col self-stretch">
          <Label name="category" htmlFor="category" className="text-white" />
          <Input {...register('category')} type="text" id="category" required />
        </div>

        <div className="flex flex-col self-stretch">
          <Label name="intensity" htmlFor="intensity" className="text-white" />
          <Input
            {...register('intensity')}
            type="number"
            id="intensity"
            required
            min={1}
            max={5}
          />
        </div>

        <div className="flex flex-col self-stretch">
          <Label name="location" htmlFor="location" className="text-white" />
          <Input {...register('location')} type="text" id="location" required />
        </div>

        <Button type="submit" className="mt-8">
          Envoyer
        </Button>
      </form>
    </main>
  )
}

export default DashboardPageView
