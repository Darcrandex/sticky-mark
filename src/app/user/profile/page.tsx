/**
 * @name UserProfile
 * @description
 * @author darcrand
 */

'use client'

import { http } from '@/utils/http.client'
import { useQuery } from '@tanstack/react-query'

export default function UserProfile() {
  const { data } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await http.get('/api/auth/user/info')
      return res.data
    },
  })

  console.log('data', data)

  return (
    <>
      <h1>UserProfile</h1>
    </>
  )
}
