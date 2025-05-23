import { http } from '@/utils/http.client'

export const userService = {
  login: (data: { email: string; password: string }) => {
    return http.post<API.Result<string>>('/api/auth/user/login', data)
  },

  signUp: (data: { email: string; password: string }) => {
    return http.post('/api/auth/user/register', data)
  },

  forgotPwd: (data: { email: string }) => {
    return http.post('/api/auth/pwd/reset', data)
  },

  resetPwd: (data: { newPassword: string; sign: string }) => {
    return http.put('/api/auth/pwd/reset', data)
  },
}
