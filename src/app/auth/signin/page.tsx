import { getServerSession } from 'next-auth/next'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { ClientSafeProvider, getProviders, LiteralUnion } from 'next-auth/react'
import { options } from '@/app/api/auth/[...nextauth]/options'
import SignInView from '@/views/SignInView'

export type ProvidersSignInList = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null

const SignInPage = async () => {
  const session = await getServerSession(options)

  if (session) {
    return { redirect: { destination: '/dashboard' } }
  }

  const providers: ProvidersSignInList = await getProviders()

  return <SignInView providers={providers} />
}

export default SignInPage
