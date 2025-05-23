import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await db.from('mark').select().eq('uid', userId)

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

  const { title, url } = await request.json()
  const { data, error } = await db
    .from('mark')
    .insert([{ title, url, uid: userId }])
    .select()

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
