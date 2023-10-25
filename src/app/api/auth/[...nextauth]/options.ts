import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import config from '@/config'
import { logInValidation } from '@/validations/auth'
import { User } from '@/types/User'
import { logInHandler } from '@/server/services/auth/logInHandler'
import { getUserByEmail } from '@/server/services/users/getUserByEmail'

const { server, auth } = config

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: auth.providers.github.id,
      clientSecret: auth.providers.github.secret,
    }),
    CredentialsProvider({
      name: 'Credientials',
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

        if (!parse.success) return null

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
      if (account?.type !== 'credentials' && user.email) {
        let existedUser: User | null = null

        try {
          existedUser = await getUserByEmail(user.email)
        } catch (error) {
          console.warn(
            error,
            '[src/app/api/auth/[...nextauth]/options.ts #getUserByEmail] #signIn'
          )
          return false
        }

        if (!existedUser) {
          // Add to database
        }

        return true
      }

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard'
    },
    async session({ session, token }) {
      return { ...session, id: token.sub }
    },
  },
}
