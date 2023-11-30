import { getUserById } from '@/server/services/users/getUserById'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const token = searchParams.get('token')

  if (!id || !token)
    return NextResponse.json(
      { success: false, message: 'Invalid query' },
      { status: 400 }
    )

  const user = await getUserById(id, token)

  return NextResponse.json(user)
}
