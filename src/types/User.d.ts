export type LoginType = 'oauth' | 'credentials'

type UserWithCredential = {
  loginType: 'credentials'
  loginProvider: 'credentials'
  id: string
  name: string
  email: string
  name: string
  password: string
}

export type UserWithOAuth = {
  loginType: 'oauth'
  loginProvider: string
  providerId: string
  id: string
  email: string
  name: string
}
export type User = UserWithCredential | UserWithOAuth
