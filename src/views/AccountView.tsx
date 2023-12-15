'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import MainLayout from '@/components/layouts/MainLayout'
import fetchAppInstance from '@/utils/fetchAppInstance'

type Props = { user: Session['user']; token: string }

const AccountView = ({ user, token }: Props) => {
  const handleSignOut = async () => {
    await fetchAppInstance(`/users/logout?token=${token}`, 'POST')

    return signOut()
  }

  return (
    <MainLayout>
      <h1>Hello {user?.name}</h1>
      <button className="text-black" onClick={handleSignOut}>
        Log out
      </button>
    </MainLayout>
  )
}

export default AccountView
