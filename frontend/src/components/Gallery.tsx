import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

interface Presentation {
  id: string
  title: string
  slides: Array<any>
  created_at?: string
  updated_at?: string
}

const Gallery: React.FC = () => {
  const [presentations, setPresentations] = React.useState<Presentation[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [message, setMessage] = React.useState<string>('')
  const [messageType, setMessageType] = React.useState<'success' | 'error' | ''>('')
  const nav = useNavigate()

  const fetchPresentations = async () => {
    try {
      setLoading(true)
      const res = await api.get('/presentations')
      setPresentations(res.data.presentations || [])
    } catch (e: any) {
      showMessage('Failed to load presentations', 'error')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPresentations()
  }, [])

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return

    try {
      await api.delete(`/presentations/${id}`)
      setPresentations(presentations.filter((p) => p.id !== id))
      showMessage('Presentation deleted', 'success')
    } catch (e: any) {
      showMessage('Failed to delete presentation', 'error')
      console.error(e)
    }
  }

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h2>Your Presentations</h2>
        <button className="btn" onClick={() => nav('/create')}>
          ✨ Create New
        </button>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading presentations...</div>
      ) : presentations.length === 0 ? (
        <div className="empty">
          No presentations yet.{' '}
          <button
            className="btn"
            onClick={() => nav('/create')}
            style={{ marginLeft: 8 }}
          >
            Create one now
          </button>
        </div>
      ) : (
        <div className="grid">
          {presentations.map((p) => (
            <div className="card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.slides?.length || 0} slides</p>
              {p.updated_at && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Updated: {formatDate(p.updated_at)}
                </p>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  className="btn"
                  onClick={() => nav(`/editor/${p.id}`)}
                  style={{ flex: 1 }}
                >
                  Open
                </button>
                <button
                  className="btn"
                  onClick={() => handleDelete(p.id, p.title)}
                  style={{
                    background: 'var(--error)',
                    color: 'white',
                    flex: 0.4
                  }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
