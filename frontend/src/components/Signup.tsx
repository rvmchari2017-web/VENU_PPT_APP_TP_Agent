import React, { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string | null>(null)
  const [messageType, setMessageType] = React.useState<'success' | 'error'>('success')
  const [loading, setLoading] = React.useState<boolean>(false)
  const nav = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setMessage(null)

    if (!username.trim() || username.length < 3) {
      setMessage('Username must be at least 3 characters')
      setMessageType('error')
      return
    }

    if (!password || password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setMessageType('error')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setMessageType('error')
      return
    }

    try {
      setLoading(true)
      await api.post('/signup', { username, password })
      setMessage('Account created! Redirecting to login...')
      setMessageType('success')
      setTimeout(() => nav('/login'), 1500)
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Signup failed')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-box">
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username (min. 3 characters)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      {message && (
        <div className={`message ${messageType}`} style={{ marginTop: 12 }}>
          {message}
        </div>
      )}
      <p style={{ marginTop: 16 }}>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Signup
