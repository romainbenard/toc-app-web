'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import MainLayout from '@/components/Layout/MainLayout'
import Button from '@/components/ui/Button'
import ErrorInput from '@/components/ui/ErrorInput'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Select from '@/components/ui/Select'
import TextArea from '@/components/ui/TextArea'
import { ApiResponse } from '@/types/ApiServer'
import { Ocd, OcdCategory, OcdLocation } from '@/types/ocd.d'
import fetchAppInstance from '@/utils/fetchAppInstance'
import {
  categoryOptions,
  intensityOptions,
  locationOptions,
} from '@/utils/ocdOptions'
import { createOcdValidation } from '@/validations/ocd.validation'

type CreateOcdFormInputs = {
  name: string
  category: OcdCategory
  intensity: number
  location: OcdLocation
  date: string
  description?: string
  repetition?: number
  timeLost?: number
}

type Props = { user: Session['user'] }

const CreateOcdView = ({ user }: Props) => {
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<CreateOcdFormInputs>({
    resolver: zodResolver(createOcdValidation),
  })

  const onSubmit = async (data: CreateOcdFormInputs) => {
    const res: ApiResponse<Ocd> = await fetchAppInstance<CreateOcdFormInputs>(
      `/o/create?token=${user?.accessToken}`,
      'POST',
      data
    )

    if (!res.success) {
      return setError('root.serverError', {
        message: 'A server error occured, please try again',
      })
    }

    router.replace(`/ocd/${res.data?.id}`)
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">Add new ocd</h1>
      <form
        className="mt-4 grid grid-cols-4 w-full gap-x-3 bg-secondary-50 py-8 px-6 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col col-span-3">
          <Label name="Name" htmlFor="name" />
          <Input {...register('name')} type="text" id="name" required />
          <ErrorInput error={errors.name?.message || ''} />
        </div>

        <div className="flex flex-col col-span-1">
          <Label name="Intensity" htmlFor="intensity" />
          <Select
            {...register('intensity', { valueAsNumber: true })}
            options={intensityOptions}
            id="intensity"
            required
          />
          <ErrorInput error={errors.intensity?.message || ''} />
        </div>

        <div className="flex flex-col col-span-2">
          <Label name="Location" htmlFor="location" />
          <Select
            {...register('location')}
            id="location"
            options={locationOptions}
            required
          />
          <ErrorInput error={errors.location?.message || ''} />
        </div>

        <div className="flex flex-col col-span-2">
          <Label name="Category" htmlFor="category" />
          <Select
            {...register('category')}
            id="category"
            options={categoryOptions}
            required
          />
          <ErrorInput error={errors.category?.message || ''} />
        </div>

        <div className="flex flex-col col-span-2">
          <Label name="Repetition" htmlFor="repetition" />
          <Input
            {...register('repetition', { valueAsNumber: true })}
            type="number"
            id="repetition"
            min={0}
            max={200}
          />
          <ErrorInput error={errors.repetition?.message || ''} />
        </div>

        <div className="flex flex-col col-span-2">
          <Label name="Time lost" htmlFor="timeLost" />
          <Input
            {...register('timeLost', { valueAsNumber: true })}
            type="number"
            id="timeLost"
            min={0}
          />
          <ErrorInput error={errors.timeLost?.message || ''} />
        </div>

        <div className="flex flex-col col-span-4">
          <Label name="Date" htmlFor="date" />
          <Input {...register('date')} type="date" id="date" required />
          <ErrorInput error={errors.date?.message || ''} />
        </div>

        <div className="flex flex-col col-span-4">
          <Label name="Description" htmlFor="description" />
          <TextArea
            {...register('description')}
            maxLength={280}
            id="description"
          />
          <ErrorInput error={errors.description?.message || ''} />
        </div>

        <div>
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
      <ErrorInput error={errors.root?.serverError.message || ''} />
    </MainLayout>
  )
}

export default CreateOcdView
