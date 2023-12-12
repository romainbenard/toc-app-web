import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

const Home = async () => {
  const session = await getServerSession(options)

  if (session) {
    redirect('/dashboard')
  }

  return redirect('/auth/signin')
}

export default Home
