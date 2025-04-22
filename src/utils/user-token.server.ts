'use server'

import { db } from '@/db'
import jwt from 'jsonwebtoken'
import { type NextRequest } from 'next/server'

// 生成 token
export async function generateToken(userId: string) {
  const token = jwt.sign({ userId }, process.env.NEXT_APP_JWT_SECRET!, {
    expiresIn: '1h',
  })

  return token
}

// 从 token 中获取用户 ID
export async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  // 客户端请求需要添加 header.authorization = ${token}

  const token = request.headers.get('authorization')
  if (!token) {
    return null
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.NEXT_APP_JWT_SECRET!)
    const userId = decodedToken.userId

    const { data, error } = await db.from('account').select().eq('id', userId)

    if (error || data?.length === 0) {
      return null
    }
    return userId
  } catch (error) {
    console.error('解析token时出错:', error)
    return null
  }
}
