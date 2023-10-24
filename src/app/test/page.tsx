import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const TestPage = async () => {
  const session = await getServerSession(options)
  console.log({ session })
  if (!session) {
    redirect('http://localhost:3000/api/auth/signin/providers')
  }

  const { user } = session
  return <h1>Welcome {user?.name}</h1>
}

export default TestPage
