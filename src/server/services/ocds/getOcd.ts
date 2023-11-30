import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { Ocd } from '@/types/ocd'

import 'server-only'

const { server } = config

export const getOcd = async (id: string, token: string) => {
  const res = await fetch(`${server.url}/ocds/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) return null

  const data: ApiResponse<Ocd | null> = await res.json()

  if (!data.success || !data.data) return null

  return data.data
}
