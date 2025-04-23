/**
 * @name ResetPassword
 * @description
 * @author darcrand
 */

'use client'

import { userService } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function ResetPasswordContent() {
  const search = useSearchParams()
  const sign = search.get('sign')
  const [newPassword, setNewPassword] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!newPassword || !sign) {
        throw new Error('newPassword is required')
      }

      await userService.resetPwd({ newPassword, sign })
    },
  })

  return (
    <>
      <h1>ResetPassword</h1>
      <p>sign {sign}</p>

      <p className='m-4'>
        <input
          type='password'
          className='block border p-2'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </p>

      <button type='button' disabled={isPending} onClick={() => mutate()}>
        onSubmit
      </button>
    </>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
