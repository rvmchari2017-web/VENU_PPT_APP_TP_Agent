import axios, { AxiosInstance } from 'axios'

const API_BASE: string = process.env.REACT_APP_API || 'http://localhost:5000'

const instance: AxiosInstance = axios.create({ baseURL: API_BASE })

instance.interceptors.request.use((cfg) => {
  const token: string | null = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default instance
