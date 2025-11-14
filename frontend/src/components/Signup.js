import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Signup() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/signup', { username, password })
      setMessage('Account created, please login')
      setTimeout(() => nav('/login'), 1000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="auth-box">
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Sign up</button>
      </form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}
