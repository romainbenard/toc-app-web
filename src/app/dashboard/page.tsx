import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
  const session = await getServerSession(options)

  if (!session) {
    redirect('http://localhost:3000/api/auth/signin/providers')
  }

  const { user } = session
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  )
}

export default DashboardPage
