import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { TokenData } from '@/types/token'
import type { User } from '@/types/User'
import {
  type LogInBody,
  type SignUpBody,
  signUpValidation,
} from '@/validations/auth.validation'

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

export const logOutUser = async (token: string) => {
  const res = await fetch(`${server.url}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    console.error('[#logOutUser] Failed: ', await res.json())
    throw new Error('Log out failed')
  }

  return res.json()
}

export const signUpUser = async (body: SignUpBody) => {
  const parse = signUpValidation.safeParse(body)

  if (!parse.success) return null

  const res = await fetch(`${server.url}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parse.data),
  })

  if (!res.ok) {
    console.error('[#signUpUser] Failed: ', await res.json())
    throw new Error('Signup failed')
  }

  const data: ApiResponse<User> = await res.json()

  return data
}
