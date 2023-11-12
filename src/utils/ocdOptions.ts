import { OcdCategory, OcdLocation } from '@/types/ocd.d'

type SelectOptions<T> = { label: string; value: T }

export const intensityOptions: SelectOptions<number>[] = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]

export const categoryOptions: SelectOptions<OcdCategory>[] = [
  { label: 'Checking', value: OcdCategory.CHECKING },
  { label: 'Organisation', value: OcdCategory.ORGANISATION },
  { label: 'Contamination', value: OcdCategory.CONTAMINATION },
  { label: 'Instrusive Thought', value: OcdCategory.INTRUSIVE_THOUGHT },
]

export const locationOptions: SelectOptions<OcdLocation>[] = [
  { label: 'Home', value: OcdLocation.HOME },
  { label: 'Outdoor', value: OcdLocation.OUTDOOR },
  { label: 'Public Transport', value: OcdLocation.PUBLIC_TRANSPORT },
  { label: 'Work', value: OcdLocation.WORK },
]
