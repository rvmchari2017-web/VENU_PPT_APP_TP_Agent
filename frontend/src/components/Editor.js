import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Editor(){
  const { id } = useParams()
  const [presentation, setPresentation] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const nav = useNavigate()

  React.useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get(`/presentations/${id}`)
        setPresentation(res.data.presentation)
      }catch(e){
        console.error(e)
      }
    })()
  },[id])

  if(!presentation) return <div>Loading...</div>

  const slides = presentation.slides || []
  const slide = slides[selectedIndex] || {}

  const updateSlide = (changes) => {
    const copy = {...presentation}
    copy.slides = copy.slides.map(s=> s.id===slide.id ? {...s, ...changes} : s)
    setPresentation(copy)
  }

  return (
    <div className="editor">
      <div className="editor-top">
        <button onClick={()=>nav('/gallery')}>← Back</button>
        <div className="title">{presentation.title}</div>
        <div className="actions">
          <button>Undo</button>
          <button>Redo</button>
          <button>Save</button>
          <button>Export</button>
        </div>
      </div>

      <div className="editor-body">
        <aside className="slides-list">
          {slides.map((s,idx)=> (
            <div key={s.id} className={`slide-item ${idx===selectedIndex? 'active':''}`} onClick={()=>setSelectedIndex(idx)}>
              <div className="slide-thumb">{s.title}</div>
              <div className="slide-controls">
                <button onClick={(e)=>{e.stopPropagation(); /* move up */}}>↑</button>
                <button onClick={(e)=>{e.stopPropagation(); /* move down */}}>↓</button>
                <button onClick={(e)=>{e.stopPropagation(); /* delete */}}>✕</button>
              </div>
            </div>
          ))}
          <div style={{padding:8}}>
            <button className="btn">Add Slide</button>
          </div>
        </aside>

        <section className="slide-canvas">
          <h3>Slide Preview</h3>
          <div className="slide-card">
            <h2 contentEditable onInput={(e)=> updateSlide({title: e.currentTarget.textContent})}>{slide.title}</h2>
            <div className="content" contentEditable onInput={(e)=> updateSlide({content: e.currentTarget.textContent})}>{slide.content}</div>
          </div>
        </section>

        <aside className="customizer">
          <h3>Customize</h3>
          <div>
            <label>Title font size</label>
            <input type="range" min={12} max={72} />
          </div>
          <div>
            <label>Content font size</label>
            <input type="range" min={8} max={40} />
          </div>
          <div>
            <label>Font color</label>
            <input type="color" />
          </div>
          <div>
            <label>AI generate content</label>
            <textarea placeholder="Describe changes" rows={3}></textarea>
            <button className="btn">Regenerate</button>
          </div>
          <div>
            <h4>Background Image</h4>
            <input type="file" />
            <div>
              <label>Opacity</label>
              <input type="range" min={0} max={100} />
            </div>
            <div>
              <label>Blur</label>
              <input type="range" min={0} max={20} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
