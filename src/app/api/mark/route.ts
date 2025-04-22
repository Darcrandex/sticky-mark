import { db } from '@/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET() {
  const { data, error } = await db.from('mark').select()

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
  const uid = '7030f228-270c-4501-bcf7-a47bd42b769e'
  const { title, url } = await request.json()

  const { data, error } = await db.from('mark').insert([{ title, url, uid }])

  if (error) {
    return NextResponse.json({
      message: 'Error inserting data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Data inserted successfully',
    data,
  })
}
