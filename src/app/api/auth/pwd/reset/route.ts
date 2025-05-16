import { db } from '@/db'
import { aesDecrypt, aesEncrypt } from '@/utils/aes.server'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { first } from 'lodash-es'
import { NextResponse, type NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

const adminEmail = process.env.NEXT_APP_ADMIN_EMAIL
const adminEmailPassword = process.env.NEXT_APP_ADMIN_EMAIL_KEY

// 忘记密码
export async function POST(request: NextRequest) {
  const { email } = await request.json()
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    auth: { user: adminEmail, pass: adminEmailPassword },
  })

  const resetSign = jwt.sign({ email }, process.env.NEXT_APP_JWT_SECRET!, { expiresIn: '1h' })
  const encryptedResetSign = await aesEncrypt(resetSign)

  try {
    const { error } = await db.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-app.com/auth/callback', // 重置密码后的回调URL
    })

    // http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6ImlzOGRGMFlQSlhVemd1NmciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3hzYm9meGtyaWl3bW5saWN0cGNlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiY2UyYThmZS1lZTU4LTQyOWQtYWJmMS04MmZkMjU0NmI2YmMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ3MzgxODY4LCJpYXQiOjE3NDczNzgyNjgsImVtYWlsIjoiZGFyY3JhbmRleEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE3NDczNzgyNjh9XSwic2Vzc2lvbl9pZCI6ImMxYWNkYzFmLWRhMzQtNDcxZS04NjhhLWJhZTRkMGUwODU4ZCIsImlzX2Fub255bW91cyI6ZmFsc2V9.vplrglEV4O9y1ulpDY8VfE55HWiqUjQlYkcXCouY1-Q&expires_at=1747381868&expires_in=3600&refresh_token=mc3nidhdvsgb&token_type=bearer&type=recovery

    // 发送邮件
    await transporter.sendMail({
      from: adminEmail,
      to: email,
      subject: '重置登录密码',
      text: '',
      html: `重置链接 <a href="http://localhost:3000/user/reset-password?sign=${encryptedResetSign}">重置密码</a>`,
    })

    return NextResponse.json({ message: '邮件发送成功' })
  } catch (error) {
    console.error('发送邮件时出错:', error)
    return NextResponse.json({ message: '邮件发送失败' }, { status: 500 })
  }
}

// 重置密码
export async function PUT(request: NextRequest) {
  const { newPassword, sign = '' } = await request.json()

  try {
    const decryptedSign = await aesDecrypt(sign)
    const dataFromSign = jwt.verify(decryptedSign, process.env.NEXT_APP_JWT_SECRET!)
    const email: string = typeof dataFromSign === 'string' ? dataFromSign : dataFromSign?.email

    const { data: users, error: selectErr } = await db.from('account').select().eq('email', email)
    if (selectErr) {
      return NextResponse.json({ message: '用户不存在' }, { status: 400 })
    }

    const user = first(users)
    const hashedPassword = await hash(newPassword, 10)
    const { error: updateErr } = await db.from('account').update({ password: hashedPassword }).eq('id', user.id)

    if (updateErr) {
      return NextResponse.json({ message: '密码重置失败' }, { status: 500 })
    }

    return NextResponse.json({ message: '密码重置成功' })
  } catch (error) {
    return NextResponse.json({ message: '密码重置失败' }, { status: 500 })
  }
}
