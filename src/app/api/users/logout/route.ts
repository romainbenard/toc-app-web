import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logOutUser } from '@/server/services/auth'

const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  const parse = z.string().safeParse(token)

  if (!parse.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid query' },
      { status: 400 }
    )
  }

  const res = await logOutUser(parse.data)

  if (!res)
    return NextResponse.json({ message: 'An error occured' }, { status: 400 })

  return NextResponse.json(res)
}

export { POST }
