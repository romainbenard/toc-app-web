import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'

const { server } = config

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${server.url}/users/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })

  const data: ApiResponse<User | null> = await res.json()

  if (!data.success) return null

  return data.data!
}
