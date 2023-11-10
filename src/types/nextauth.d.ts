import { DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    accessToken?: string
  }

  interface Session extends DefaultSession {
    user?: User
    accessToken?: string
  }

  interface JWT extends DefaultJWT {
    accessToken?: string
  }
}
