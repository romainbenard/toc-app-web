import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import config from '@/config'
import DashboardView from '@/views/DashboardView'
import { options } from '../api/auth/[...nextauth]/options'

const { appUrl } = config

const DashboardPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user) {
    redirect(`${appUrl}/auth/signin`)
  }

  return <DashboardView user={session.user} />
}

export default DashboardPage
