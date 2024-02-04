import { Session } from 'next-auth'
import { Ocd } from '@/types/ocd'
import { calculateTimeLost } from '@/utils/calculateTimeLost'

export const selectTodayTrend = (timelost: number) => {
  if (timelost < 10) return '☀️'
  if (timelost >= 10 && timelost < 20) return '🌤️'
  if (timelost >= 20 && timelost < 30) return '☁️'
  if (timelost >= 30) return '🌧️'
}

export const formatDateForUrl = (date: string) => {
  return date.replaceAll('/', '_')
}

export const generateCheerSentence = (
  ocds: {
    todayOcds: Ocd[]
    previousOcds: Record<string, Ocd[]>
  },
  user?: Session['user']
) => {
  const { todayOcds, previousOcds } = ocds

  const REPORTS_NUMBER =
    Object.values(previousOcds).length < 7
      ? Object.values(previousOcds).length
      : 7

  const totalWeekTimelost = Object.values(previousOcds)
    .map(ocd => ocd.reduce((sum, acc) => sum + acc.timeLost, 0))
    .reduce((sum, acc) => sum + acc, 0)

  const averageTimeLost = +(totalWeekTimelost / REPORTS_NUMBER).toFixed(1)
  const todayTimeLost = calculateTimeLost(todayOcds)

  if (todayTimeLost < averageTimeLost)
    return `Today, you wasted ${
      averageTimeLost - todayTimeLost
    } minutes less than last week. Keep going! 💪`

  if (REPORTS_NUMBER > 5) {
    return `Congrats! You did ${REPORTS_NUMBER} during last 7 days. 🏆`
  }

  return `Hello ${user?.name}, It's time to report your OCDs. 🙂`
}
