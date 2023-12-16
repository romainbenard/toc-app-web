import { useMemo } from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'
import MainLayout from '@/components/layouts/MainLayout'
import RoundedBlock from '@/components/ui/RoundedBlock'
import { Ocd } from '@/types/ocd'

type Props = {
  user: Session['user']
  todayOcds: Ocd[]
  previousOcds: Record<string, Ocd[]>
}

const DashboardView = ({ user, todayOcds, previousOcds }: Props) => {
  const todayEvents = todayOcds.length
  //timelost should be required (update back first)
  const timelost = todayOcds.reduce(
    (acc, { timeLost }) => acc + (timeLost || 0),
    0
  )

  const trends = useMemo(() => {
    if (timelost < 10) return '☀️'
    if (timelost >= 10 && timelost < 20) return '🌤️'
    if (timelost >= 20 && timelost < 30) return '☁️'
    if (timelost >= 30) return '🌧️'
  }, [timelost])

  return (
    <MainLayout>
      <h1 className="text-secondary-500 mb-6">Hello {user?.name}</h1>

      <p className="text-primary-500 text-3xl font-semibold mb-2">Today</p>
      <div className="grid grid-cols-3 mb-10">
        <div className="text-center text-secondary-500">
          <p className="text-5xl">{todayEvents}</p>
          <p className="uppercase">events</p>
        </div>
        <div className="text-center text-secondary-500">
          <p className="text-5xl">
            {timelost}
            <span className="text-base">min</span>
          </p>
          <p className="uppercase">timelost</p>
        </div>
        <div className="text-center text-secondary-500">
          <p className="text-5xl">{trends}</p>
          <p className="uppercase">trend</p>
        </div>
      </div>

      <p className="text-primary-500 font-semibold mb-2 text-lg">
        Last Reports
      </p>
      <RoundedBlock className=" mb-8">
        <div className="flex flex-col gap-2">
          {Object.keys(previousOcds).map(date => (
            <div
              key={date}
              className="rounded-lg w-full h-full bg-white text-secondary-500 border-transparent hover:border-secondary-200 border-2 transition-all px-2 py-3 text-lg"
            >
              <p className="text-secondary-300 text-xs">{date}</p>
              <p>{previousOcds[date].length} events</p>
            </div>
          ))}
        </div>
      </RoundedBlock>

      <Link href="/ocds/new">
        <div className="flex justify-center items-center h-12 w-12 rounded-[50%] bg-primary-500 text-white font-semibold text-4xl">
          +
        </div>
      </Link>
    </MainLayout>
  )
}

export default DashboardView
