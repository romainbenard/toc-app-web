import { SignUpBody, signUpValidation } from '@/validations/auth.validation'
import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'

import 'server-only'

const { server } = config

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
