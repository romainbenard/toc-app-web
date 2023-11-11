import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import DashboardPageView from '@/views/DashboardPageView'

const DashboardPage = async () => {
  const session = await getServerSession(options)

  // if (!session) {
  //   redirect('http://localhost:3000/api/auth/signin/providers')
  // }

  // const { user } = session
  return <DashboardPageView />
}

export default DashboardPage
