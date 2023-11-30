import { getOcd } from '@/server/services/ocds/getOcd'
import SingleOcdView from '@/views/SingleOcdView'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import config from '@/config'
import { options } from '@/app/api/auth/[...nextauth]/options'

const { appUrl } = config

const SingleOcd = async () => {
  const session = await getServerSession(options)

  const headersList = headers()
  const header_url = headersList.get('x-url') || ''

  const ocdId = header_url.split(`${appUrl}/ocd/`)[1]

  if (!session || !session.accessToken || !ocdId) return notFound()

  const ocd = await getOcd(ocdId, session?.accessToken)

  if (!ocd) return notFound()

  return <SingleOcdView ocd={ocd} />
}

export default SingleOcd
