export interface TokenData {
  token: string
  expiresIn: number
}

export interface DataStoredInToken {
  id: string
  iat: number
  exp: number
}
