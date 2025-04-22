/**
 * @name ResetPassword
 * @description
 * @author darcrand
 */

'use client'

import { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const onSend = async () => {
    await fetch('/api/auth/pwd/reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  return (
    <>
      <h1>ResetPassword</h1>

      <input className='m-4 border p-2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

      <button onClick={onSend} className='m-4' type='button'>
        send
      </button>
    </>
  )
}
