import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import config from '@/config'
import { SignUpBody, logInValidation } from '@/validations/auth'
import { User } from '@/types/User'
import { logInHandler } from '@/server/services/auth/logInHandler'
import fetchAppInstance from '@/utils/fetchInstance'
import { ApiResponse } from '@/types/ApiServer'

const { auth, appUrl } = config

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: auth.providers.github.id,
      clientSecret: auth.providers.github.secret,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const res = await logInHandler({
          ...credentials,
          loginType: 'credentials',
        })

        if (!res.success || !res.data) {
          return null
        }

        const { id, email, name, token } = res.data
        //TODO: manage expire on jwt
        const user = { id, name, email, accessToken: token.token }

        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account || account.type === 'email') return false

      if (account?.type === 'oauth' && user.email) {
        const existedUser = await getUserByEmail(user.email)

        if (!existedUser) {
          const signUpBody: SignUpBody = {
            loginType: 'oauth',
            loginProvider: account?.provider,
            providerId: user.id,
            email: user.email,
            name: user.name || 'randomName',
          }

          await fetchAppInstance<SignUpBody>(
            '/users/signup',
            'POST',
            signUpBody
          )
        }

        //TODO: Create login API route to do request server-side
        const res = await logInHandler({
          loginType: account.type,
          email: user.email,
          providerId: user.id,
        })

        if (!res.success || !res.data) return false

        //TODO: check how to set expires with backend jwt
        user.accessToken = res.data.token.token
      }

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard'
    },
    async session({ session, token }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token = { accessToken: user.accessToken }
      }

      return token
    },
  },
}
