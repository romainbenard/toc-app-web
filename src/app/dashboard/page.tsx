import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import config from '@/config'
import { getOcds } from '@/server/services/ocds/getOcds'
import { Ocd } from '@/types/ocd'
import { getAnteriorDate } from '@/utils/date'
import { sortOcdsByDate } from '@/utils/sortOcdsByDate'
import DashboardView from '@/views/DashboardView'
import { options } from '../api/auth/[...nextauth]/options'

const { appUrl } = config

const TODAY = new Intl.DateTimeFormat('en-US').format(new Date())
const WEEK_DAYS = 7

const DashboardPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.accessToken) {
    redirect(`${appUrl}/auth/signin`)
  }

  const { user, accessToken } = session

  const ocds = await getOcds(
    { authorId: user.id, from: getAnteriorDate(WEEK_DAYS) },
    accessToken
  )

  let sortedOcds = sortOcdsByDate(ocds)

  let ocdsOfTheDay: Ocd[] = []
  let lastWeekOcds = sortedOcds

  if (sortedOcds[TODAY]) {
    ocdsOfTheDay = sortedOcds[TODAY]

    delete lastWeekOcds[TODAY]
  }

  return (
    <DashboardView
      user={session.user}
      todayOcds={ocdsOfTheDay}
      previousOcds={lastWeekOcds}
    />
  )
}

export default DashboardPage
