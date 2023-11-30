import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'

import 'server-only'

const { server } = config

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${server.url}/users/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) return null

  const data: ApiResponse<User | null> = await res.json()

  if (!data.success || !data.data) return null

  return data.data
}
