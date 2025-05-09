import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { type NextRequest, NextResponse } from 'next/server'

// 更新排序
export async function PUT(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const sortedArr = (await request.json()) as { id: string; sort: number }[]
  const { data, error } = await db.from('mark').upsert(sortedArr).eq('uid', userId).select()

  if (error) {
    return NextResponse.json({
      message: 'Error updating data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data updated successfully',
    data: data.map((v) => v.id),
  })
}
