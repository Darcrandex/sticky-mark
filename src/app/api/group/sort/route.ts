import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const sortedArr = (await request.json()) as { id: string; sort: number }[]
  const { data, error } = await db.from('group').upsert(sortedArr).eq('uid', userId).select()

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
