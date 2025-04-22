/**
 * @name Sign
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Sign() {
  const tabs = [
    { title: 'Sign In', key: 'sign-in' },
    { title: 'Sign Up', key: 'sign-up' },
  ]

  const search = useSearchParams()
  const navigate = useRouter()
  const tab = search.get('tab') || 'sign-in'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async () => {
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      if (tab === 'sign-in') {
        const res = await userService.login({ email, password })
        const token = res.data.data
        localStorage.setItem('token', token)
        navigate.replace('/')
      } else if (tab === 'sign-up') {
        await userService.signUp({ email, password })
        navigate.replace('/user/sign?tab=sign-in')
      }

      setEmail('')
      setPassword('')
    },
  })

  return (
    <>
      <header className='m-4'>
        <nav className='flex justify-center gap-4'>
          {tabs.map((tab) => (
            <Link key={tab.key} replace href={`/user/sign?tab=${tab.key}`} className='border p-4'>
              {tab.title}
            </Link>
          ))}
        </nav>
      </header>

      <main className='m-4 mx-auto flex max-w-xl flex-col gap-4'>
        <input className='border p-2' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='border p-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className='m-4' type='button' onClick={() => onSubmit()} disabled={isPending}>
          {tabs.find((t) => t.key === tab)?.title}
        </button>
      </main>
    </>
  )
}
