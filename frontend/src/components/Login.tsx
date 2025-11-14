import React, { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

interface LoginProps {
  onLogin: (username: string) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const nav = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (!username.trim()) {
      setError('Username is required')
      return
    }

    if (!password) {
      setError('Password is required')
      return
    }

    try {
      setLoading(true)
      const res = await api.post('/login', { username, password })
      const { token } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      onLogin(username)
      nav('/gallery')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && (
        <div className="message error" style={{ marginTop: 12 }}>
          {error}
        </div>
      )}
      <p style={{ marginTop: 16 }}>
        Don't have account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login
