import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import type { User } from '@/types/User'
import { TokenData } from '@/types/token'
import type { LogInBody } from '@/validations/auth.validation'

import 'server-only'

const { server } = config

export const logInHandler = async (credentials: LogInBody) => {
  try {
    const res = await fetch(`${server.url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    var data: ApiResponse<({ token: TokenData } & User) | null> =
      await res.json()
  } catch (error) {
    console.warn('[#logInHandler]: ', error)

    throw new Error('Server Error: Login Failed')
  }

  return data
}
