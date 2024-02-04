import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import config from '@/config'
import { getOcds } from '@/server/services/ocds/getOcds'
import { getDate } from '@/utils/date'
import { QueryOcds } from '@/validations/ocd.validation'
import AllOcdsView from '@/views/AllOcdsView'

const { appUrl } = config

const OcdsPage = async ({
  searchParams,
}: {
  searchParams?: { date: string }
}) => {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.accessToken) {
    redirect(`${appUrl}/auth/signin`)
  }

  const { user, accessToken } = session

  let query: QueryOcds = { authorId: user.id }

  if (searchParams?.date) {
    let d = new Date(searchParams.date.replaceAll('_', '/'))

    const dateQuery = getDate(d).toISOString()

    query.from = dateQuery
    query.to = dateQuery
  }

  const ocds = await getOcds(query, accessToken)

  return <AllOcdsView user={user} ocds={ocds} />
}

export default OcdsPage
