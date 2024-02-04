import { z } from 'zod'

const categoryValidation = z.enum(
  ['CHECKING', 'ORGANISATION', 'CONTAMINATION', 'INTRUSIVE_THOUGHT'],
  { errorMap: () => ({ message: 'Required' }) }
)

const locationValidation = z.enum(
  ['HOME', 'WORK', 'PUBLIC_TRANSPORT', 'OUTDOOR'],
  { errorMap: () => ({ message: 'Required' }) }
)

export const createOcdValidation = z.object({
  name: z.string().min(2).max(100),
  category: categoryValidation,
  intensity: z.number({ invalid_type_error: 'Required' }).min(0).max(5),
  location: locationValidation,
  date: z
    .string()
    .transform(val => new Date(val).toISOString())
    .pipe(z.string().datetime()),
  description: z.string().max(200).optional(),
  repetition: z.union([z.coerce.number().min(0).max(200), z.nan()]).optional(),
  timeLost: z.union([z.coerce.number().min(0), z.nan()]),
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
