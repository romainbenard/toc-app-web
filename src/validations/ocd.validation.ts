import { z } from 'zod'
import enData from '@/data/en'

const { errors } = enData

const isDateAfter = (dateInput: string) =>
  new Date(dateInput).getTime() < Date.now()

const categoryValidation = z.enum(
  ['CHECKING', 'ORGANISATION', 'CONTAMINATION', 'INTRUSIVE_THOUGHT'],
  { errorMap: () => ({ message: errors.inputs.required }) }
)

const locationValidation = z.enum(
  ['HOME', 'WORK', 'PUBLIC_TRANSPORT', 'OUTDOOR'],
  { errorMap: () => ({ message: errors.inputs.required }) }
)

export const createOcdValidation = z.object({
  name: z.string().min(2).max(100),
  category: categoryValidation,
  intensity: z
    .number({ invalid_type_error: errors.inputs.required })
    .min(0)
    .max(5),
  location: locationValidation,
  date: z
    .string()
    .refine(val => isDateAfter(val), {
      message: errors.inputs.dateFuture,
    })
    .transform(val => new Date(val).toISOString())
    .pipe(z.string().datetime()),
  description: z.string().max(200).optional(),
  timeLost: z.number({ invalid_type_error: errors.inputs.invalid }).min(0),
})

export const queryOcdsValidation = z.object({
  category: categoryValidation.optional(),
  location: locationValidation.optional(),
  to: z.string().datetime().optional(),
  from: z.string().datetime().optional(),
  authorId: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc').optional(),
})

export type QueryOcds = z.infer<typeof queryOcdsValidation>
