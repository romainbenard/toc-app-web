import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const { server } = config

const emailValidation = z.string().email()

const POST = async (req: NextRequest) => {
  const body = await req.json()

  const parse = emailValidation.safeParse(body)

  if (!parse.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid body' },
      { status: 400 }
    )
  }

  const res = await fetch(`${server.url}/users/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: parse.data }),
  })

  const data: ApiResponse<User | null> = await res.json()

  return NextResponse.json(data)
}

export { POST }
