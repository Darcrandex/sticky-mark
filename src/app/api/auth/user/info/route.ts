import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { first, omit } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

// 获取用户信息
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await db.from('account').select().eq('id', userId)

  if (error) {
    return NextResponse.json({ message: 'Error fetching data', error })
  }

  return NextResponse.json({ message: 'Data fetched successfully', data: omit(first(data), 'password') })
}
