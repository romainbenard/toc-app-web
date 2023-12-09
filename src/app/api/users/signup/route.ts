import { NextRequest, NextResponse } from 'next/server'
import { signUpUser } from '@/server/services/auth'

const POST = async (req: NextRequest) => {
  const body = await req.json()

  const user = await signUpUser(body)

  if (!user)
    return NextResponse.json({ message: 'An error occured' }, { status: 400 })

  return NextResponse.json(user)
}

export { POST }
