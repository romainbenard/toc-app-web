import { getUserByEmail } from '@/server/services/users/getUserByEmail'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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

  const user = await getUserByEmail(parse.data)

  return NextResponse.json(user)
}

export { POST }
