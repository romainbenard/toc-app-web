'use client'

import { useForm } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Button from '@/components/ui/Button'
import MainLayout from '@/components/Layout/MainLayout'
import TextArea from '@/components/ui/TextArea'

interface CreateOcdFormInputs {
  category: string
  intensity: number
  location: string
  date: Date
  description?: string
  repetition?: number
  timeLost?: number
}

const CreateOcdPageView = () => {
  const { register } = useForm<CreateOcdFormInputs>({})

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-semibold">Add new ocd</h1>
        <form className="mt-4 grid grid-cols-4 w-full gap-x-3 bg-secondary-50 py-8 px-6 rounded-xl">
          <div className="flex flex-col col-span-3">
            <Label name="Category" htmlFor="category" />
            <Input
              {...register('category')}
              type="text"
              id="category"
              required
            />
          </div>

          <div className="flex flex-col col-span-1">
            <Label name="Intensity" htmlFor="intensity" />
            <Input
              {...register('intensity')}
              type="number"
              id="intensity"
              required
              min={1}
              max={5}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Location" htmlFor="location" />
            <Input {...register('location')} type="text" id="location" />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Category" htmlFor="category" />
            <Input
              {...register('category')}
              type="text"
              id="category"
              required
            />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Repetition" htmlFor="repetition" />
            <Input
              {...register('repetition')}
              type="number"
              id="repetition"
              min={0}
              max={200}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Time lost" htmlFor="timeLost" />
            <Input
              {...register('timeLost')}
              type="number"
              id="timeLost"
              min={0}
            />
          </div>

          <div className="flex flex-col col-span-4">
            <Label name="Date" htmlFor="date" />
            <Input {...register('date')} type="date" id="date" required />
          </div>

          <div className="flex flex-col col-span-4">
            <Label name="Description" htmlFor="description" />
            <TextArea
              {...register('description')}
              rows={4}
              maxLength={280}
              id="description"
              required
            />
          </div>

          <div>
            <Button type="submit" className="mt-4">
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default CreateOcdPageView
