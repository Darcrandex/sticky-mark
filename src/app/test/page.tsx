/**
 * @name TestPage
 * @description
 * @author darcrand
 */

'use client'

import { http } from '@/utils/http.client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TestPage() {
  const [url, setUrl] = useState('')

  const { data, refetch } = useQuery({
    enabled: false,
    queryKey: ['logo-url', url],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const res = await http.get<API.Result<string>>('/api/tools/get-logo', { params: { url } })
      return res.data
    },
  })

  return (
    <>
      <h1>输入网址获取网站的 logo</h1>

      <input className='m-4 block w-xl border p-2' type='text' value={url} onChange={(e) => setUrl(e.target.value)} />

      <button type='button' onClick={() => refetch()}>
        send
      </button>

      <hr />

      {data?.data && <img src={data?.data} className='block w-20' referrerPolicy='no-referrer' />}
    </>
  )
}
