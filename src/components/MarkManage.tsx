/**
 * @name MarkManage
 * @description
 * @author darcrand
 */

'use client'

import { useState } from 'react'

export default function MarkManage() {
  const [list, setList] = useState<any[]>([])

  const getAll = async () => {
    const res = await fetch('/api/mark', {
      method: 'GET',
      cache: 'no-store',
    })
    const data = await res.json()
    console.log('data', data)
    if (Array.isArray(data?.data)) {
      setList(data.data)
    }
  }

  const addMark = async () => {
    const title = `test ${Math.random()}`
    const url = `https://www.baidu.com/${Math.random()}`

    const res = await fetch('/api/mark', {
      method: 'POST',
      body: JSON.stringify({ title, url }),
    })

    const data = await res.json()
    console.log('data', data)
  }

  const updateMark = async (id: string) => {
    const title = `new title ${Math.random()}`
    const url = `https://www.google.com/${Math.random()}`

    const res = await fetch(`/api/mark/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, url }),
    })

    const data = await res.json()
    console.log('data', data)
  }

  const deleteMark = async (id: string) => {
    const res = await fetch(`/api/mark/${id}`, {
      method: 'DELETE',
    })

    const data = await res.json()
    console.log('data', data)
  }

  return (
    <>
      <div>MarkManage</div>

      <div className='flex flex-col gap-3'>
        <button onClick={getAll}>Get All</button>
        <button onClick={addMark}>addMark</button>
      </div>

      <ol className='list-decimal pl-3'>
        {list.map((item) => (
          <li key={item.id} className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <span>{item.title}</span>
              <span>{item.url}</span>
            </div>
            <button onClick={() => updateMark(item.id)}>update</button>
            <button onClick={() => deleteMark(item.id)}>delete</button>
          </li>
        ))}
      </ol>
    </>
  )
}
