import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

const adminEmail = process.env.NEXT_APP_ADMIN_EMAIL
const adminEmailPassword = process.env.NEXT_APP_ADMIN_EMAIL_KEY

// 忘记密码
export async function POST(request: NextRequest) {
  const userId = '123123123'
  const { email } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    auth: {
      user: adminEmail, // 你的 Gmail 邮箱地址
      pass: adminEmailPassword, // 你的 Gmail 邮箱密码或应用专用密码
    },
  })

  const resetToken = jwt.sign({ userId }, process.env.NEXT_APP_JWT_SECRET!, { expiresIn: '1h' })

  try {
    // 发送邮件
    await transporter.sendMail({
      from: adminEmail,
      to: email,
      subject: '重置登录密码',
      text: '',

      html: `重置链接 <a href="http://localhost:3000/user/reset-password?token=${resetToken}">重置密码</a>`,
    })

    return NextResponse.json({ message: '邮件发送成功' })
  } catch (error) {
    console.error('发送邮件时出错:', error)
    return NextResponse.json({ message: '邮件发送失败' }, { status: 500 })
  }
}

// 重置密码
export async function PUT(request: NextRequest) {
  const userIdFromToken = '123123123'
  const { newPassword, token: queryToken } = await request.json()

  if (!queryToken) {
    return NextResponse.json({ message: '缺少token' }, { status: 400 })
  }

  try {
    const query: any = jwt.verify(queryToken, process.env.NEXT_APP_JWT_SECRET!)
    const userIdFromQuery = query.userId

    return NextResponse.json({
      message: '密码重置成功',
      data: {
        userIdFromQuery,
        userIdFromToken,
        newPassword,
      },
    })
  } catch (error) {
    console.error('解析token时出错:', error)
    return NextResponse.json({ message: 'token解析失败' }, { status: 500 })
  }
}
