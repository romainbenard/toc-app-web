import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { Ocd } from '@/types/ocd.d'
import { createOcdValidation } from '@/validations/ocd.validation'

const { server } = config

const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  const body = await req.json()

  const parse = createOcdValidation.safeParse(body)

  if (!parse.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid body' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${server.url}/ocds/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parse.data),
    })
    const data: ApiResponse<Ocd> = await res.json()

    revalidatePath('/')
    return NextResponse.json(data)
  } catch (error) {
    console.log(`[api/o/create] #POST`, error)

    throw new Error(`[api/o/create] POST Request Failed`)
  }
}

export { POST }
