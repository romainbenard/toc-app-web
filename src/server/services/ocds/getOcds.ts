import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { Ocd } from '@/types/ocd'
import { QueryOcds } from '@/validations/ocd.validation'

import 'server-only'

const { server } = config

export const getOcds = async (query: QueryOcds, token: string) => {
  const res = await fetch(`${server.url}/ocds?${new URLSearchParams(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) return { number: 0, ocds: [] }

  const data: ApiResponse<{ number: number; ocds: Ocd[] }> = await res.json()

  if (!data.success || !data.data) return { number: 0, ocds: [] }

  return data.data
}
