/**
 * @name ResetPassword
 * @description
 * @author darcrand
 */

'use client'

import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
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
