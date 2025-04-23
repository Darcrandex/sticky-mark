import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

// 只允许获取当前登录用户的数据
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await db.from('group').select().eq('uid', userId)

  if (error) {
    return NextResponse.json({
      message: 'Error fetching data',
      error,
    })
  }

  return NextResponse.json({
    message: 'success',
    data,
  })
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { name, icon, sort } = await request.json()
  const { data, error } = await db.from('group').insert({ name, icon, sort, uid: userId }).select()

  if (error) {
    return NextResponse.json({
      message: 'Error inserting data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data inserted successfully',
    data: first(data)?.id,
  })
}
