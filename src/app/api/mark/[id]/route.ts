import { db } from '@/db'
import { getUserIdFromToken } from '@/utils/user-token.server'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest, ctx: API.NextContext<{ id: string }>) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { data, error } = await db.from('mark').select().eq('id', id).eq('uid', userId)

  if (error) {
    return NextResponse.json({
      message: 'Error fetching data',
      error,
    })
  }

  return NextResponse.json({
    message: 'success',
    data: first(data),
  })
}

export async function PUT(request: NextRequest, ctx: API.NextContext<{ id: string }>) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { title, url } = await request.json()
  const { error } = await db.from('mark').update({ title, url }).eq('id', id).eq('uid', userId)

  if (error) {
    return NextResponse.json({
      message: 'Error updating data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data updated successfully',
    data: id,
  })
}

export async function DELETE(request: NextRequest, ctx: API.NextContext<{ id: string }>) {
  const userId = await getUserIdFromToken(request)
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { error } = await db.from('mark').delete().eq('id', id).eq('uid', userId)

  if (error) {
    return NextResponse.json({
      message: 'Error deleting data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data deleted successfully',
    data: id,
  })
}
