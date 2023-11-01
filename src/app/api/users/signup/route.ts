import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { signUpValidation } from '@/validations/auth'
import { NextRequest, NextResponse } from 'next/server'

const { server } = config

const POST = async (req: NextRequest) => {
  const body = await req.json()

  const parse = signUpValidation.safeParse(body)

  if (!parse.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid body' },
      { status: 400 }
    )
  }

  const res = await fetch(`${server.url}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parse.data),
  })

  const data: ApiResponse = await res.json()
  return NextResponse.json({ data })
}

export { POST }
