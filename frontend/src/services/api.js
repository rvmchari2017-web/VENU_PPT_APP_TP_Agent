import axios from 'axios'

const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000'

const instance = axios.create({ baseURL: API_BASE })

instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default instance
