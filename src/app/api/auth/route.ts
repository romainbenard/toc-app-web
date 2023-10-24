import { postLoginHandler } from '@/server/auth/handlers'

export const POST = async (req: Request) => postLoginHandler(req)
