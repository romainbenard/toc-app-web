export enum OcdCategory {
  CHECKING = 'CHECKING',
  ORGANISATION = 'ORGANISATION',
  CONTAMINATION = 'CONTAMINATION',
  INTRUSIVE_THOUGHT = 'INTRUSIVE_THOUGHT',
}

export enum OcdLocation {
  HOME = 'HOME',
  WORK = 'WORK',
  PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
  OUTDOOR = 'OUTDOOR',
}

type Ocd = {
  id: string
  name: string
  category: OcdCategory
  intensity: number
  location: string
  date: Date
  description?: string
  repetition?: number
  timeLost: number
  createdAt: string
  updatedAt: string
  author: string
  authorId: string
}
