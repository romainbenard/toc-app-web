import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import config from '@/config'
import AccountView from '@/views/AccountView'
import { options } from '../api/auth/[...nextauth]/options'

const { appUrl } = config

const AccountPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.accessToken) {
    return redirect(`${appUrl}/auth/signin`)
  }

  const { user, accessToken } = session

  return <AccountView user={user} token={accessToken} />
}

export default AccountPage
