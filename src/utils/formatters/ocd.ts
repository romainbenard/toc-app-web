import enData from '@/data/en'

const { ocd } = enData

export const displayLocation = (location: string) => {
  switch (location) {
    case 'HOME':
      return ocd.location.home
    case 'WORK':
      return ocd.location.work
    case 'PUBLIC_TRANSPORT':
      return ocd.location.publicTransport
    case 'OUTDOOR':
      return ocd.location.outdoor
    default:
      return
  }
}

export const displayTimeLost = (timelost: number) => {
  const hours = Math.trunc(timelost / 60)
  const min = timelost - hours * 60

  return `${hours >= 1 ? `${hours}h` : ''} ${min > 0 ? `${min}min` : ''}`
}
