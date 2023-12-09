import { getServerSession } from 'next-auth/next'
import { options } from '@/app/api/auth/[...nextauth]/options'
import SignUpView from '@/views/SignUpView'

const SignUpPage = async () => {
  const session = await getServerSession(options)

  if (session) {
    return { redirect: { destination: '/dashboard' } }
  }

  return <SignUpView />
}

export default SignUpPage
