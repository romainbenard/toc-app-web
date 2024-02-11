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
import config from '@/config'
import enData from '@/data/en'
import { OcdCategory, OcdLocation } from '@/types/ocd.d'
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
  timeLost: number
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
    try {
      var res = await fetch(`${config.appUrl}/api/o/create?token=${token}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })

      const body = await res.json()

      router.replace(`/ocds/${body?.data.id}`)
    } catch (error) {
      setError('root.serverError', {
        message: enData.errors.default,
      })
    }
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
            <Label name="Name" htmlFor="name" aria-required={true} />
            <Input {...register('name')} type="text" id="name" required />
            <ErrorInput error={errors.name?.message || ''} />
          </div>

          <div className="flex flex-col col-span-1">
            <Label name="Intensity" htmlFor="intensity" aria-required={true} />
            <Select
              {...register('intensity', { valueAsNumber: true })}
              options={intensityOptions}
              id="intensity"
              required
            />
            <ErrorInput error={errors.intensity?.message || ''} />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Location" htmlFor="location" aria-required={true} />
            <Select
              {...register('location')}
              id="location"
              options={locationOptions}
              required
            />
            <ErrorInput error={errors.location?.message || ''} />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Category" htmlFor="category" aria-required={true} />
            <Select
              {...register('category')}
              id="category"
              options={categoryOptions}
              required
            />
            <ErrorInput error={errors.category?.message || ''} />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Time lost" htmlFor="timeLost" aria-required={true} />
            <Input
              {...register('timeLost', { valueAsNumber: true })}
              type="number"
              id="timeLost"
              min={0}
              required
            />
            <ErrorInput error={errors.timeLost?.message || ''} />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="Date" htmlFor="date" aria-required={true} />
            <Input {...register('date')} type="date" id="date" required />
            <ErrorInput error={errors.date?.message || ''} />
          </div>

          <div className="flex flex-col col-span-4">
            <Label name="Description" htmlFor="description" />
            <TextArea
              {...register('description')}
              maxLength={280}
              rows={6}
              id="description"
            />
            <ErrorInput error={errors.description?.message || ''} />
          </div>

          <div>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </RoundedBlock>

      <ErrorInput error={errors.root?.serverError.message || ''} />
    </MainLayout>
  )
}

export default CreateOcdView
