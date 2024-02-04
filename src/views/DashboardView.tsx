import Link from 'next/link'
import { Session } from 'next-auth'
import { Info } from 'react-feather'
import MainLayout from '@/components/layouts/MainLayout'
import FixedAddCTA from '@/components/ui/FixedAddCTA'
import RoundedBlock from '@/components/ui/RoundedBlock'
import { Ocd } from '@/types/ocd'
import { calculateTimeLost } from '@/utils/calculateTimeLost'
import {
  formatDateForUrl,
  generateCheerSentence,
  selectTodayTrend,
} from './dashboardView.viewmodel'

type Props = {
  user: Session['user']
  todayOcds: Ocd[]
  previousOcds: Record<string, Ocd[]>
}

const DashboardView = ({ todayOcds, previousOcds, user }: Props) => {
  const todayEvents = todayOcds.length
  //timelost should be required (update back first)
  const todayTimelost = calculateTimeLost(todayOcds)
  const todayTrend = selectTodayTrend(todayTimelost)

  return (
    <MainLayout>
      <div className="flex flex-col gap-10 items-stretch">
        <p className="text-secondary-500 text-xl">
          {generateCheerSentence({ todayOcds, previousOcds }, user)}
        </p>
        <div>
          <h2 className="text-primary-500 text-3xl font-semibold mb-2">
            Today
          </h2>
          {todayOcds.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
                <p className="text-5xl">{todayEvents}</p>
                <p className="text-sm uppercase">events</p>
              </RoundedBlock>
              <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
                <p className="text-5xl">
                  {todayTimelost}
                  <span className="text-base">min</span>
                </p>
                <p className="text-sm uppercase">Time spent</p>
              </RoundedBlock>
              <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
                <p className="text-5xl">{todayTrend}</p>
                <p className="text-sm uppercase">trend</p>
              </RoundedBlock>
            </div>
          ) : (
            <p className="text-secondary-500">No OCDs reported today</p>
          )}
        </div>

        <div>
          <h2 className="text-primary-500 font-semibold mb-2 text-lg">
            Last Reports
          </h2>
          <RoundedBlock>
            {Object.keys(previousOcds).length > 0 ? (
              <div className="flex flex-col gap-2">
                {Object.keys(previousOcds).map(date => (
                  <Link
                    key={date}
                    href={`/ocds?date=${formatDateForUrl(date)}`}
                    className="flex items-center justify-between rounded-lg w-full h-full bg-white text-secondary-500 border-transparent hover:border-secondary-200 border-2 transition-all p-3 text-lg hover:cursor-pointer"
                  >
                    <div>
                      <p className="text-secondary-300 text-xs">{date}</p>
                      <p>{previousOcds[date].length} events</p>
                    </div>
                    <div>
                      <p className="text-secondary-300 text-xs">Time spent</p>
                      <p className="text-secondary-300">
                        {calculateTimeLost(previousOcds[date])}min
                      </p>
                    </div>
                    <Info className="text-primary-500" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-secondary-500">No reports found</p>
            )}
          </RoundedBlock>
        </div>
      </div>

      <FixedAddCTA />
    </MainLayout>
  )
}

export default DashboardView
