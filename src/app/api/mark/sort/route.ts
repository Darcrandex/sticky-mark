import { db } from '@/db'
import { type NextRequest, NextResponse } from 'next/server'

// 更新排序
export async function PUT(request: NextRequest) {
  const sortedArr = (await request.json()) as { id: string; sort: number }[]

  const { data, error } = await db.from('mark').upsert(sortedArr).select()

  if (error) {
    return NextResponse.json({
      message: 'Error updating data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data updated successfully',
    data,
  })
}
