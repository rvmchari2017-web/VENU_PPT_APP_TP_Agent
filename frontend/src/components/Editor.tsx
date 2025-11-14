import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

interface Slide {
  id: string
  title: string
  content: string
  image: string | null
  style: {
    titleFontSize: number
    contentFontSize: number
    fontColor: string
    backgroundColor: string
    backgroundImage: string | null
    backgroundOpacity: number
    backgroundBlur: number
    fontFamily?: string
    fontWeight?: string
    fontStyle?: string
    textDecoration?: string
    textAlign?: string
    contentFontFamily?: string
    contentFontWeight?: string
    contentTextAlign?: string
  }
}

interface Presentation {
  id: string
  title: string
  slides: Slide[]
  owner: string
}

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const nav = useNavigate()

  // Fetch presentation
  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/presentations/${id}`)
        setPresentation(res.data.presentation)
      } catch (e: any) {
        showMessage('Failed to load presentation', 'error')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPresentation()
  }, [id])

  if (loading) {
    return <div className="editor"><div className="loading">Loading presentation...</div></div>
  }

  if (!presentation) {
    return <div className="editor"><div className="error">Presentation not found</div></div>
  }

  const slides: Slide[] = presentation.slides || []
  const slide: Slide | undefined = slides[selectedIndex]

  if (!slide) {
    return <div className="editor"><div className="error">No slides found</div></div>
  }

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const pushHistory = (snapshot?: Presentation | null) => {
    try {
      const snap = snapshot ? snapshot : presentation
      if (!snap) return
      const s = JSON.stringify(snap)
      const next = history.slice(0, historyIndex + 1)
      next.push(s)
      // cap history
      if (next.length > 50) next.shift()
      setHistory(next)
      setHistoryIndex(next.length - 1)
    } catch (e) {
      console.error('history push error', e)
    }
  }

  const undo = () => {
    if (historyIndex <= 0) return
    const ni = historyIndex - 1
    const snap = JSON.parse(history[ni]) as Presentation
    setPresentation(snap)
    setHistoryIndex(ni)
    showMessage('Undone', 'success')
  }

  const redo = () => {
    if (historyIndex >= history.length - 1) return
    const ni = historyIndex + 1
    const snap = JSON.parse(history[ni]) as Presentation
    setPresentation(snap)
    setHistoryIndex(ni)
    showMessage('Redone', 'success')
  }

  const updateSlideData = async (changes: Partial<Slide>): Promise<void> => {
    try {
      setSaving(true)
      await api.put(`/presentations/${id}/slides/${slide.id}`, changes)
      
      // Update local state
      const updatedSlides = slides.map((s) =>
        s.id === slide.id ? { ...s, ...changes } : s
      )
      setPresentation((prev) => prev ? { ...prev, slides: updatedSlides } : null)
      pushHistory({ ...presentation!, slides: updatedSlides })
      showMessage('Slide saved', 'success')
    } catch (e: any) {
      showMessage('Failed to save slide', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const updatePresentationTitle = async (newTitle: string) => {
    try {
      setSaving(true)
      await api.put(`/presentations/${id}`, { title: newTitle })
      setPresentation((prev) => prev ? { ...prev, title: newTitle } : null)
      pushHistory({ ...presentation!, title: newTitle })
      showMessage('Presentation title updated', 'success')
    } catch (e: any) {
      showMessage('Failed to update title', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleAddSlide = async () => {
    try {
      setSaving(true)
      const res = await api.post(`/presentations/${id}/slides`, {
        title: 'New Slide',
        content: '',
        image: null,
        style: {
          titleFontSize: 32,
          contentFontSize: 18,
          fontColor: '#000000',
          backgroundColor: '#ffffff',
          backgroundImage: null,
          backgroundOpacity: 100,
          backgroundBlur: 0
        }
      })
      
      const newSlide = res.data.slide
      setPresentation((prev) => prev ? { ...prev, slides: [...prev.slides, newSlide] } : null)
      setSelectedIndex(slides.length)
      pushHistory()
      showMessage('Slide added', 'success')
    } catch (e: any) {
      showMessage('Failed to add slide', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSlide = async (slideId: string, index: number) => {
    if (slides.length === 1) {
      showMessage('Cannot delete the last slide', 'error')
      return
    }
    
    if (!confirm('Delete this slide?')) return
    
    try {
      setSaving(true)
      await api.delete(`/presentations/${id}/slides/${slideId}`)
      
      const updatedSlides = slides.filter((s) => s.id !== slideId)
      setPresentation((prev) => prev ? { ...prev, slides: updatedSlides } : null)
      
      // Update selected index
      if (index >= updatedSlides.length) {
        setSelectedIndex(updatedSlides.length - 1)
      } else {
        setSelectedIndex(index)
      }
      
      showMessage('Slide deleted', 'success')
      pushHistory()
    } catch (e: any) {
      showMessage('Failed to delete slide', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleMoveSlide = async (direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? selectedIndex - 1 : selectedIndex + 1
    
    if (newIndex < 0 || newIndex >= slides.length) return
    
    try {
      setSaving(true)
      const slideIds = slides.map((s, i) => {
        if (i === selectedIndex) return slides[newIndex].id
        if (i === newIndex) return slides[selectedIndex].id
        return s.id
      })
      
      await api.post(`/presentations/${id}/slides/reorder`, { slide_ids: slideIds })
      
      // Reorder locally
      const updatedSlides = [...slides]
      const temp = updatedSlides[selectedIndex]
      updatedSlides[selectedIndex] = updatedSlides[newIndex]
      updatedSlides[newIndex] = temp
      
      setPresentation((prev) => prev ? { ...prev, slides: updatedSlides } : null)
      setSelectedIndex(newIndex)
      pushHistory()
      showMessage('Slide moved', 'success')
    } catch (e: any) {
      showMessage('Failed to move slide', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleExport = async () => {
    try {
      setSaving(true)
      const res = await api.get(`/presentations/${id}/export`, {
        responseType: 'blob'
      })
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${presentation.title}.pptx`)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      
      showMessage('Presentation exported', 'success')
    } catch (e: any) {
      showMessage('Failed to export presentation', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNow = async () => {
    // Save full current slide
    await updateSlideData({ title: slide.title, content: slide.content, style: slide.style })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      setSaving(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await api.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      await updateSlideData({ image: res.data.url })
      showMessage('Image uploaded', 'success')
    } catch (e: any) {
      showMessage('Failed to upload image', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleBackgroundImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      setSaving(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await api.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      await updateSlideData({
        style: {
          ...slide.style,
          backgroundImage: res.data.url
        }
      })
      showMessage('Background image uploaded', 'success')
    } catch (e: any) {
      showMessage('Failed to upload background', 'error')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="editor">
        <div className="editor-top">
        <button 
          onClick={() => nav('/gallery')} 
          disabled={saving}
          title="Back to Gallery"
        >
          ← Back
        </button>
        <input
          type="text"
          className="editor-title-input"
          value={presentation.title}
          onChange={(e) => {
            setPresentation((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }}
          onBlur={(e) => updatePresentationTitle(e.target.value)}
          disabled={saving}
        />
        <div className="actions">
          <button onClick={undo} disabled={historyIndex <= 0 || saving} title="Undo">
            ↺ Undo
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1 || saving} title="Redo">
            ↻ Redo
          </button>
          <button onClick={handleSaveNow} disabled={saving} title="Save">
            💾 Save
          </button>
          <button onClick={handleExport} disabled={saving} title="Export as PPTX">
            📥 Export
          </button>
        </div>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="editor-body">
        <aside className="slides-list">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`slide-item ${idx === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <div className="slide-thumb">
                <div className="slide-title">{s.title || `Slide ${idx + 1}`}</div>
                <div className="slide-preview">{s.content?.substring(0, 30)}...</div>
              </div>
              <div className="slide-controls">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMoveSlide('up')
                  }}
                  disabled={idx === 0 || saving}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMoveSlide('down')
                  }}
                  disabled={idx === slides.length - 1 || saving}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteSlide(s.id, idx)
                  }}
                  disabled={slides.length === 1 || saving}
                  title="Delete slide"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div style={{ padding: 8 }}>
            <button
              className="btn"
              onClick={handleAddSlide}
              disabled={saving}
            >
              + Add Slide
            </button>
          </div>
        </aside>

        <section className="slide-canvas">
          <h3>Slide Preview</h3>
          <div
            className="slide-card"
            style={{
              backgroundColor: slide.style.backgroundColor,
              backgroundImage: slide.style.backgroundImage
                ? `url('${slide.style.backgroundImage}')`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                const text = e.currentTarget.textContent || ''
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id ? { ...s, title: text } : s
                        )
                      }
                    : null
                )
              }}
              onBlur={() => updateSlideData({ title: slide.title })}
              style={{
                fontSize: `${slide.style.titleFontSize}px`,
                color: slide.style.fontColor
              }}
            >
              {slide.title}
            </h2>
            <div
              className="content"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                const text = e.currentTarget.textContent || ''
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id ? { ...s, content: text } : s
                        )
                      }
                    : null
                )
              }}
              onBlur={() => updateSlideData({ content: slide.content })}
              style={{
                fontSize: `${slide.style.contentFontSize}px`,
                color: slide.style.fontColor
              }}
            >
              {slide.content}
            </div>
            {slide.image && (
              <img src={slide.image} alt="slide" className="slide-image" />
            )}
          </div>
        </section>

        <aside className="customizer">
          <h3>Customize</h3>
          <div>
            <label>Title font size: {slide.style.titleFontSize}px</label>
            <input
              type="range"
              min={12}
              max={72}
              value={slide.style.titleFontSize}
              onChange={(e) => {
                const size = parseInt(e.target.value)
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id
                            ? {
                                ...s,
                                style: { ...s.style, titleFontSize: size }
                              }
                            : s
                        )
                      }
                    : null
                )
              }}
              onMouseUp={() =>
                updateSlideData({
                  style: { ...slide.style, titleFontSize: slide.style.titleFontSize }
                })
              }
            />
            <div style={{ marginTop: 8 }}>
              <label>Font family</label>
              <select
                value={(slide.style as any).fontFamily || 'Inter'}
                onChange={(e) => {
                  const fam = e.target.value
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id ? { ...s, style: { ...s.style, fontFamily: fam } } : s
                          )
                        }
                      : null
                  )
                }}
              >
                <option>Inter</option>
                <option>Arial</option>
                <option>Roboto</option>
                <option>Georgia</option>
                <option>Helvetica</option>
              </select>
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Weight</label>
              <select
                value={(slide.style as any).fontWeight || '600'}
                onChange={(e) => {
                  const w = e.target.value
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id ? { ...s, style: { ...s.style, fontWeight: w } } : s
                          )
                        }
                      : null
                  )
                }}
              >
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi-bold</option>
                <option value="700">Bold</option>
                <option value="800">Extra-bold</option>
              </select>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? { ...s, style: { ...s.style, fontStyle: (s.style as any).fontStyle === 'italic' ? 'normal' : 'italic' } }
                              : s
                          )
                        }
                      : null
                  )
                }}
              >
                I
              </button>
              <button
                onClick={() => {
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? { ...s, style: { ...s.style, textDecoration: (s.style as any).textDecoration === 'underline' ? 'none' : 'underline' } }
                              : s
                          )
                        }
                      : null
                  )
                }}
              >
                U
              </button>
              <button
                onClick={() => {
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? { ...s, style: { ...s.style, textAlign: 'left' } }
                              : s
                          )
                        }
                      : null
                  )
                }}
              >
                L
              </button>
              <button
                onClick={() => {
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? { ...s, style: { ...s.style, textAlign: 'center' } }
                              : s
                          )
                        }
                      : null
                  )
                }}
              >
                C
              </button>
              <button
                onClick={() => {
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? { ...s, style: { ...s.style, textAlign: 'right' } }
                              : s
                          )
                        }
                      : null
                  )
                }}
              >
                R
              </button>
            </div>
          </div>
          <div>
            <label>Content font size: {slide.style.contentFontSize}px</label>
            <input
              type="range"
              min={8}
              max={40}
              value={slide.style.contentFontSize}
              onChange={(e) => {
                const size = parseInt(e.target.value)
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id
                            ? {
                                ...s,
                                style: { ...s.style, contentFontSize: size }
                              }
                            : s
                        )
                      }
                    : null
                )
              }}
              onMouseUp={() =>
                updateSlideData({
                  style: { ...slide.style, contentFontSize: slide.style.contentFontSize }
                })
              }
            />
            <div style={{ marginTop: 8 }}>
              <label>Content font family</label>
              <select
                value={(slide.style as any).contentFontFamily || 'Inter'}
                onChange={(e) => {
                  const fam = e.target.value
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id ? { ...s, style: { ...s.style, contentFontFamily: fam } } : s
                          )
                        }
                      : null
                  )
                }}
              >
                <option>Inter</option>
                <option>Arial</option>
                <option>Roboto</option>
                <option>Georgia</option>
              </select>
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Content weight</label>
              <select
                value={(slide.style as any).contentFontWeight || '400'}
                onChange={(e) => {
                  const w = e.target.value
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id ? { ...s, style: { ...s.style, contentFontWeight: w } } : s
                          )
                        }
                      : null
                  )
                }}
              >
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi-bold</option>
                <option value="700">Bold</option>
              </select>
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Content align</label>
              <select
                value={(slide.style as any).contentTextAlign || 'left'}
                onChange={(e) => {
                  const a = e.target.value
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id ? { ...s, style: { ...s.style, contentTextAlign: a } } : s
                          )
                        }
                      : null
                  )
                }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
          <div>
            <label>Font color</label>
            <input
              type="color"
              value={slide.style.fontColor}
              onChange={(e) => {
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id
                            ? {
                                ...s,
                                style: { ...s.style, fontColor: e.target.value }
                              }
                            : s
                        )
                      }
                    : null
                )
              }}
              onBlur={() =>
                updateSlideData({
                  style: { ...slide.style, fontColor: slide.style.fontColor }
                })
              }
            />
          </div>
          <div>
            <label>Background color</label>
            <input
              type="color"
              value={slide.style.backgroundColor}
              onChange={(e) => {
                setPresentation((prev) =>
                  prev
                    ? {
                        ...prev,
                        slides: prev.slides.map((s) =>
                          s.id === slide.id
                            ? {
                                ...s,
                                style: { ...s.style, backgroundColor: e.target.value }
                              }
                            : s
                        )
                      }
                    : null
                )
              }}
              onBlur={() =>
                updateSlideData({
                  style: { ...slide.style, backgroundColor: slide.style.backgroundColor }
                })
              }
            />
          </div>
          <div>
            <label>Slide Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={saving}
            />
          </div>
          <div>
            <h4>Background Image</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageUpload}
              disabled={saving}
            />
            <div>
              <label>Opacity: {slide.style.backgroundOpacity}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={slide.style.backgroundOpacity}
                onChange={(e) => {
                  const opacity = parseInt(e.target.value)
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? {
                                  ...s,
                                  style: { ...s.style, backgroundOpacity: opacity }
                                }
                              : s
                          )
                        }
                      : null
                  )
                }}
                onMouseUp={() =>
                  updateSlideData({
                    style: { ...slide.style, backgroundOpacity: slide.style.backgroundOpacity }
                  })
                }
              />
            </div>
            <div>
              <label>Blur: {slide.style.backgroundBlur}px</label>
              <input
                type="range"
                min={0}
                max={20}
                value={slide.style.backgroundBlur}
                onChange={(e) => {
                  const blur = parseInt(e.target.value)
                  setPresentation((prev) =>
                    prev
                      ? {
                          ...prev,
                          slides: prev.slides.map((s) =>
                            s.id === slide.id
                              ? {
                                  ...s,
                                  style: { ...s.style, backgroundBlur: blur }
                                }
                              : s
                          )
                        }
                      : null
                  )
                }}
                onMouseUp={() =>
                  updateSlideData({
                    style: { ...slide.style, backgroundBlur: slide.style.backgroundBlur }
                  })
                }
              />
            </div>
          </div>
          <div>
            <h4>AI Regenerate Content</h4>
            <textarea
              placeholder="Enter a prompt to regenerate slide content"
              id="ai-prompt"
              style={{ width: '100%', minHeight: 80 }}
            />
            <button
              className="btn"
              onClick={async () => {
                const promptEl = document.getElementById('ai-prompt') as HTMLTextAreaElement | null
                const prompt = promptEl?.value || ''
                if (!prompt) {
                  showMessage('Please enter a prompt', 'error')
                  return
                }
                try {
                  setSaving(true)
                  const res = await api.post(`/presentations/${id}/slides/${slide.id}/ai-generate`, { prompt })
                  const updated = res.data.slide
                  setPresentation((prev) => prev ? { ...prev, slides: prev.slides.map((s) => s.id === updated.id ? updated : s) } : null)
                  pushHistory()
                  showMessage('AI regenerated content', 'success')
                } catch (e: any) {
                  showMessage(e.response?.data?.message || 'AI generation failed', 'error')
                } finally {
                  setSaving(false)
                }
              }}
            >
              ✨ Regenerate
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Editor
