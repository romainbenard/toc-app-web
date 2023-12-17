import { Ocd } from '@/types/ocd'

export const calculateTimeLost = (ocds: Ocd[]) =>
  ocds.reduce((acc, { timeLost }) => acc + (timeLost || 0), 0)
