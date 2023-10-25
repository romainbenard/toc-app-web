import config from '@/config'
import { ApiResponse } from '@/types/ApiServer'
import { User } from '@/types/User'

const { server } = config

type Credentials = {
  email: string
  password: string
}

export const logInHandler = async (credentials: Credentials) => {
  try {
    const res = await fetch(`${server.url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    var data: ApiResponse<User | null> = await res.json()
  } catch (error) {
    console.warn('[#logInHandler]: ', error)

    throw new Error('Server Error: Login Failed')
  }

  return data
}
