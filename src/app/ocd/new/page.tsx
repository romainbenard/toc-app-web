import { options } from '@/app/api/auth/[...nextauth]/options'
import CreateOcdView from '@/views/CreateOcdView'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const CreateOcdPage = async () => {
  const session = await getServerSession(options)

  if (!session || !session.user) {
    redirect('http://localhost:3000/api/auth/signin/providers')
  }
  return <CreateOcdView user={session.user} />
}

export default CreateOcdPage
