import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login({ onLogin }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/login', { username, password })
      const { token } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      onLogin(username)
      nav('/gallery')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>Don't have account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}
