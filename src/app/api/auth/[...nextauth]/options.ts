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
        const parse = logInValidation.safeParse(credentials)

        if (!parse.success || parse.data.loginType === 'oauth') return null
        //TODO: Create login API route to do request server-side
        const res = await logInHandler(parse.data)

        if (!res.success || !res.data) {
          return null
        }

        return res.data
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === 'oauth' && user.email) {
        let existedUser: User | null | undefined = null

        try {
          const res = await fetch(`${appUrl}/api/users/email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.email),
          })
          const body: ApiResponse<User> = await res.json()

          if (!body.success) return false

          existedUser = body.data
        } catch (error) {
          console.warn(
            error,
            '[src/app/api/auth/[...nextauth]/options.ts] #signIn /api/users/email'
          )
          return false
        }

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
