import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'
import { NextRequest, NextResponse } from 'next/server'
const { server } = config

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const token = searchParams.get('token')

  const res = await fetch(`${server.url}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data: ApiResponse<User | null> = await res.json()

  return NextResponse.json(data)
}
