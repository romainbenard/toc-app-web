import { Ocd } from '@/types/ocd'

export const sortOcdsByDate = (ocds: Ocd[]) => {
  let sortedOcd: Record<string, Ocd[]> = {}

  ocds.forEach(ocd => {
    const date = new Intl.DateTimeFormat('en-US').format(new Date(ocd.date))

    sortedOcd[date] ? sortedOcd[date].push(ocd) : (sortedOcd[date] = [ocd])
  })

  return sortedOcd
}
