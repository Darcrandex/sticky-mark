/**
 * @name ResetPassword
 * @description
 * @author darcrand
 */

'use client'

import { userService } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!email) {
        throw new Error('Email is required')
      }

      await userService.forgotPwd({ email })
    },
  })

  return (
    <>
      <h1>ResetPassword</h1>

      <input className='m-4 border p-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

      <button disabled={isPending} onClick={() => mutate()} className='m-4' type='button'>
        send
      </button>
    </>
  )
}
