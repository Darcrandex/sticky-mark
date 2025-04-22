import { db } from '@/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { title, url } = await request.json()

  const { data, error } = await db.from('mark').update({ title, url }).eq('id', id)

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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data, error } = await db.from('mark').delete().eq('id', id)

  if (error) {
    return NextResponse.json({
      message: 'Error deleting data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data deleted successfully',
    data,
  })
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data, error } = await db.from('mark').select().eq('id', id)

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
