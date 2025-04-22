/**
 * @name ResetPassword
 * @description
 * @author darcrand
 */

'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ResetPasswordContent() {
  const search = useSearchParams()
  const token = search.get('token')

  const onSubmit = async () => {
    const data = {
      newPassword: '123123',
      token,
    }

    await fetch('/api/auth/pwd/reset', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  return (
    <>
      <h1>ResetPassword</h1>
      <p>token {token}</p>

      <button type='button' onClick={onSubmit}>
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
