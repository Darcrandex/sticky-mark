import { db } from '@/db'
import { hash } from 'bcryptjs'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'

// 用户注册
export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // 1. 检查邮箱是否重复
  const { data, error } = await db.from('account').select().eq('email', email)
  if (error) {
    return NextResponse.json({ message: 'Error fetching data', error })
  }

  if (data.length > 0) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  // 2. insert
  // 2.1 hashed password
  const hashedPassword = await hash(password, 10)

  // 2.2 insert
  const { data: insertData, error: insertError } = await db
    .from('account')
    .insert({ email, password: hashedPassword })
    .select()

  if (insertError) {
    return NextResponse.json({ message: 'Error inserting data', insertError })
  }

  return NextResponse.json({
    message: 'register successfully',
    data: first(insertData)?.id,
  })
}
