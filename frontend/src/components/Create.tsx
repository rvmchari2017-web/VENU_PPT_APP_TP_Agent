import React, { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Create: React.FC = () => {
  const [mode, setMode] = React.useState<string>('ai')
  const [text, setText] = React.useState<string>('')
  const [title, setTitle] = React.useState<string>('')
  const [slideCount, setSlideCount] = React.useState<string>('5')
  const [imageChoice, setImageChoice] = React.useState<string>('ai_images')
  const [website, setWebsite] = React.useState<string>('')
  const [logo, setLogo] = React.useState<string>('')
  const [file, setFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const nav = useNavigate()

  const validateForm = (): boolean => {
    setError('')
    
    if (!title.trim() && mode !== 'upload') {
      setError('Title is required')
      return false
    }
    
    if (mode === 'ai' && !text.trim()) {
      setError('Please provide details for AI generation')
      return false
    }
    
    if (mode === 'upload' && !file) {
      setError('Please select a file to upload')
      return false
    }
    
    return true
  }

  const generate = async (): Promise<void> => {
    if (!validateForm()) return

    try {
      setLoading(true)
      
      let content = text
      let pres_title = title || 'Generated'

      // Handle file upload
      if (mode === 'upload' && file) {
        const formData = new FormData()
        formData.append('file', file)
        
        const uploadRes = await api.post('/upload-document', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        
        content = uploadRes.data.text
        pres_title = file.name.split('.')[0] || 'Uploaded'
      }

      // Generate presentation
      const res = await api.post('/generate', {
        mode,
        text: content,
        title: pres_title,
        slide_count: slideCount,
        imageChoice,
        website,
        logo,
      })
      
      const pres = res.data.presentation
      nav(`/editor/${pres.id}`)
    } catch (e: any) {
      setError(e.response?.data?.message || 'Generation failed')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-page">
      <h2>Create Presentation</h2>
      
      {error && (
        <div className="message error" style={{ marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div className="form-grid">
        <div className="card">
          <h3>Input</h3>
          <label>Mode</label>
          <div>
            <label>
              <input
                type="radio"
                checked={mode === 'ai'}
                onChange={() => setMode('ai')}
                disabled={loading}
              />
              AI generate
            </label>
            <label>
              <input
                type="radio"
                checked={mode === 'user'}
                onChange={() => setMode('user')}
                disabled={loading}
              />
              Write manually
            </label>
            <label>
              <input
                type="radio"
                checked={mode === 'upload'}
                onChange={() => setMode('upload')}
                disabled={loading}
              />
              Upload file
            </label>
          </div>

          {mode !== 'upload' && (
            <>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter presentation title"
                disabled={loading}
              />
              <label>Details</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder={
                  mode === 'ai'
                    ? 'Describe the topic and content for the presentation...'
                    : 'Write your presentation content here...'
                }
                disabled={loading}
              />
            </>
          )}

          {mode === 'upload' && (
            <>
              <label>Document</label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const f = e.dataTransfer?.files?.[0]
                  if (f) setFile(f)
                }}
                style={{
                  border: '2px dashed var(--border-light)',
                  padding: 12,
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={loading}
                />
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Drag & drop a file here, or click to choose
                </div>
              </div>
              {file && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Selected: {file.name}
                </p>
              )}
            </>
          )}

          <label>Slides: {slideCount}</label>
          <input
            type="range"
            min={3}
            max={15}
            value={slideCount}
            onChange={(e) => setSlideCount(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="card">
          <h3>Images & Theme</h3>
          <div>
            <label>
              <input
                type="radio"
                checked={imageChoice === 'ai_images'}
                onChange={() => setImageChoice('ai_images')}
                disabled={loading}
              />
              AI generated images
            </label>
            <label>
              <input
                type="radio"
                checked={imageChoice === 'web_search'}
                onChange={() => setImageChoice('web_search')}
                disabled={loading}
              />
              Search from web
            </label>
            <label>
              <input
                type="radio"
                checked={imageChoice === 'no_images'}
                onChange={() => setImageChoice('no_images')}
                disabled={loading}
              />
              No images (themes only)
            </label>
          </div>
          <label>Company website (optional)</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.example.com"
            disabled={loading}
          />
          <label>Logo URL (optional)</label>
          <input
            type="url"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="https://..."
            disabled={loading}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn" onClick={generate} disabled={loading}>
          {loading ? '⏳ Generating...' : '✨ Generate'}
        </button>
      </div>
    </div>
  )
}

export default Create
