import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import DashboardView from '@/views/DashboardView'

const DashboardPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user) {
    redirect('http://localhost:3000/api/auth/signin/providers')
  }

  const { user } = session
  return <DashboardView user={user} />
}

export default DashboardPage
