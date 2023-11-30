import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'

import 'server-only'

const { server } = config

export const getUserById = async (id: string, token: string) => {
  const res = await fetch(`${server.url}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) return null

  const data: ApiResponse<User | null> = await res.json()

  if (!data.success || !data.data) return null

  return data.data
}
