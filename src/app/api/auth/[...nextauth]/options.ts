import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { verify } from 'jsonwebtoken'
import config from '@/config'
import { logInUser, signUpUser } from '@/server/services/auth'
import { getUserByEmail } from '@/server/services/users/getUserByEmail'
import { getUserById } from '@/server/services/users/getUserById'
import { DataStoredInToken } from '@/types/token'
import { SignUpBody } from '@/validations/auth.validation'
const { auth } = config

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

        const res = await logInUser({
          ...credentials,
          loginType: 'credentials',
        })

        if (!res) return null

        const { id, email, name, token } = res
        //TODO: manage expire on jwt
        const user = { id, name, email, accessToken: token.token }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
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

          await signUpUser(signUpBody)
        }

        const res = await logInUser({
          loginType: account.type,
          email: user.email,
          providerId: user.id,
        })

        if (!res) return false

        user.accessToken = res.token.token
      }

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard'
    },
    async session({ session, token, user }) {
      if (user) {
        session.user = user
      }

      const { id } = verify(
        token.accessToken as string,
        auth.nextAuthSecret
      ) as DataStoredInToken

      const findUser = await getUserById(id, token.accessToken as string)

      if (typeof token.accessToken === 'string' && findUser) {
        session.accessToken = token.accessToken
        session.user = findUser
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
