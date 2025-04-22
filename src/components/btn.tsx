/**
 * @name MyButton
 * @description
 * @author darcrand
 */

'use client'

export default function MyButton() {
  const getData = async () => {
    console.log('======> onClick')

    const res = await fetch('/api/account')
    const data = await res.json()

    console.log('======> GET account', data)
  }

  const onAdd = async () => {
    const data = {
      email: 'abc@gmail.com',
      nickname: 'abc',
      password: '123456',
    }

    const res = await fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    console.log('======> POST account', result)
  }

  return (
    <>
      <div>MyButton</div>

      <div className='flex gap-4 text-xl'>
        <button type='button' onClick={getData}>
          get
        </button>

        <button type='button' onClick={onAdd}>
          add
        </button>
      </div>
    </>
  )
}
