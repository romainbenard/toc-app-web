import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import type { User } from '@/types/User'
import { TokenData } from '@/types/token'
import type { LogInBody } from '@/validations/auth.validation'

import 'server-only'

const { server } = config

export const logInUser = async (credentials: LogInBody) => {
  const res = await fetch(`${server.url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) {
    console.error('[#logInUser] Failed: ', await res.json())
    return null
  }

  const data: ApiResponse<({ token: TokenData } & User) | null> =
    await res.json()

  if (!data.success || !data.data) return null

  return data.data
}
