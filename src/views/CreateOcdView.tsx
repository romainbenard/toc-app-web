'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ErrorInput from '@/components/form/ErrorInput'
import Input from '@/components/form/Input'
import Label from '@/components/form/Label'
import Select from '@/components/form/Select'
import TextArea from '@/components/form/TextArea'
import MainLayout from '@/components/layouts/MainLayout'
import Button from '@/components/ui/Button'
import RoundedBlock from '@/components/ui/RoundedBlock'
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

type Props = { user: Session['user']; token: string }

const CreateOcdView = ({ token }: Props) => {
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
      `/o/create?token=${token}`,
      'POST',
      data
    )

    if (!res.success) {
      return setError('root.serverError', {
        message: 'A server error occurred, please try again',
      })
    }

    router.replace(`/ocds/${res.data?.id}`)
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">Add new ocd</h1>
      <RoundedBlock className="mt-4">
        <form
          className="grid grid-cols-4 w-full gap-x-3"
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
      </RoundedBlock>

      <ErrorInput error={errors.root?.serverError.message || ''} />
    </MainLayout>
  )
}

export default CreateOcdView
