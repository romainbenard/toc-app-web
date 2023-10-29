type LoginType = 'oauth' | 'credentials'

export type User = {
  id: string
  email: string
  name: string
  userId: string
  loginType: LoginType
  loginProvider: string
  email: string
  name: string
  password?: string
}
