import { db } from '@/db'
import { generateToken } from '@/utils/user-token.server'
import { compare } from 'bcryptjs'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

// 登录
export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // 1. check exists
  const { data, error } = await db.from('account').select().eq('email', email)

  if (error) {
    return NextResponse.json({ message: 'Error fetching data', error })
  }

  if (data.length === 0) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 })
  }

  // 2. check password
  const isPasswordValid = await compare(password, first(data).password)

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 })
  }

  // 3. return token
  const token = await generateToken(first(data).id)

  return NextResponse.json({ message: 'Login successful', data: token })
}
