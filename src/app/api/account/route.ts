import { db } from '@/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET() {
  const { data, error } = await db.from('account').select()

  if (error) {
    return NextResponse.json({
      message: 'Error fetching data',
      error,
    })
  }

  return NextResponse.json({
    message: 'Hello from the account API route',
    data,
  })
}

export async function POST(request: NextRequest) {
  const { nickname, email, password } = await request.json()

  const { data, error } = await db.from('account').insert([{ nickname, email, password }])

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
