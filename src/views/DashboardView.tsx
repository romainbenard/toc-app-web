import { Session } from 'next-auth'
import { Info } from 'react-feather'
import MainLayout from '@/components/layouts/MainLayout'
import FixedAddCTA from '@/components/ui/FixedAddCTA'
import RoundedBlock from '@/components/ui/RoundedBlock'
import { Ocd } from '@/types/ocd'
import { calculateTimeLost } from '@/utils/calculateTimeLost'

type Props = {
  user: Session['user']
  todayOcds: Ocd[]
  previousOcds: Record<string, Ocd[]>
}

const DashboardView = ({ todayOcds, previousOcds }: Props) => {
  const todayEvents = todayOcds.length
  //timelost should be required (update back first)
  const timelost = calculateTimeLost(todayOcds)

  const trends = useMemo(() => {
    if (timelost < 10) return '☀️'
    if (timelost >= 10 && timelost < 20) return '🌤️'
    if (timelost >= 20 && timelost < 30) return '☁️'
    if (timelost >= 30) return '🌧️'
  }, [timelost])

  return (
    <MainLayout>
      <div className="flex flex-col gap-10 items-stretch">
        <div>
          <p className="text-primary-500 text-3xl font-semibold mb-2">Today</p>
          <div className="grid grid-cols-3 gap-4">
            <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
              <p className="text-5xl">{todayEvents}</p>
              <p className="text-sm uppercase">events</p>
            </RoundedBlock>
            <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
              <p className="text-5xl">
                {timelost}
                <span className="text-base">min</span>
              </p>
              <p className="text-sm uppercase">Time spent</p>
            </RoundedBlock>
            <RoundedBlock className="text-center text-secondary-500 border border-secondary-100 bg-transparent py-4 px-2">
              <p className="text-5xl">{trends}</p>
              <p className="text-sm uppercase">trend</p>
            </RoundedBlock>
          </div>
        </div>

        <div>
          <p className="text-primary-500 font-semibold mb-2 text-lg">
            Last Reports
          </p>
          <RoundedBlock>
            {Object.keys(previousOcds).length > 0 ? (
              <div className="flex flex-col gap-2">
                {Object.keys(previousOcds).map(date => (
                  <div
                    key={date}
                    className="flex items-center justify-between rounded-lg w-full h-full bg-white text-secondary-500 border-transparent hover:border-secondary-200 border-2 transition-all p-3 text-lg"
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
                  </div>
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
