import { http } from '@/utils/http.client'

export const userService = {
  login: (data: { email: string; password: string }) => {
    return http.post<API.Result<string>>('/api/auth/user/sign-in', data)
  },

  signUp: (data: { email: string; password: string }) => {
    return http.post('/api/auth/user/sign-up', data)
  },
}
