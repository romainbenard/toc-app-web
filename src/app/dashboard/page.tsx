import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import DashboardView from '@/views/DashboardView'
import { options } from '../api/auth/[...nextauth]/options'

const DashboardPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user) {
    redirect('http://localhost:3000/api/auth/signin/providers')
  }

  return <DashboardView user={session.user} />
}

export default DashboardPage
