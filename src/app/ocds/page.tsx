import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import config from '@/config'
import { getOcds } from '@/server/services/ocds/getOcds'
import AllOcdsView from '@/views/AllOcdsView'

const { appUrl } = config

const OcdsPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.accessToken) {
    redirect(`${appUrl}/auth/signin`)
  }

  const { user, accessToken } = session

  const ocds = await getOcds({ authorId: user.id }, accessToken)

  return <AllOcdsView user={user} ocds={ocds} />
}

export default OcdsPage
