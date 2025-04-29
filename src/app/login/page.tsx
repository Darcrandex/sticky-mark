/**
 * @name Login
 * @description
 * @author darcrand
 */

'use client'
import { getValuesFromFormData } from '@/utils/common.client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function Login() {
  const [msg, setMsg] = useState('hello world')
  useEffect(() => {
    console.log(msg)
  }, [])

  const navigate = useRouter()
  const [mode, setMode] = useState<'in' | 'up'>('in')

  useEffect(() => {
    console.log('====>login page', mode)
  }, [])

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const values = getValuesFromFormData(formData)
      console.log('=====>values', values)
    },
  })

  return (
    <>
      <section className='relative flex h-screen flex-col items-center justify-center'>
        <main>
          <header>
            <h1 className='text-center text-3xl font-bold'>Sticky Mark</h1>
          </header>

          <form action={mutate}>
            <input type='email' name='email' maxLength={30} />
            <input type='password' name='password' maxLength={30} />

            <button type='submit'>登录</button>
          </form>

          <footer>
            <p>注册新账号</p>
          </footer>
        </main>
      </section>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}
