import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import config from '@/config'
import CreateOcdView from '@/views/CreateOcdView'

const { appUrl } = config

const CreateOcdPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.accessToken) {
    redirect(`${appUrl}/auth/signin`)
  }

  return <CreateOcdView user={session.user} token={session.accessToken} />
}

export default CreateOcdPage
