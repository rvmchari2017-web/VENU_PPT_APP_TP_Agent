import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Create(){
  const [mode, setMode] = React.useState('ai')
  const [text, setText] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [slideCount, setSlideCount] = React.useState(5)
  const [imageChoice, setImageChoice] = React.useState('ai_images')
  const [website, setWebsite] = React.useState('')
  const [logo, setLogo] = React.useState('')
  const nav = useNavigate()

  const generate = async ()=>{
    try{
      const res = await api.post('/generate', { mode, text, title: title||'Generated', slide_count: slideCount, imageChoice, website, logo })
      const pres = res.data.presentation
      nav(`/editor/${pres.id}`)
    }catch(e){
      console.error(e)
      alert('Generation failed')
    }
  }

  return (
    <div className="create-page">
      <h2>Create Presentation</h2>
      <div className="form-grid">
        <div className="card">
          <h3>Input</h3>
          <label>Mode</label>
          <div>
            <label><input type="radio" checked={mode==='ai'} onChange={()=>setMode('ai')} /> AI generate</label>
            <label><input type="radio" checked={mode==='user'} onChange={()=>setMode('user')} /> Write manually</label>
            <label><input type="radio" checked={mode==='upload'} onChange={()=>setMode('upload')} /> Upload file</label>
          </div>
          {mode!=='upload' && (
            <>
              <label>Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} />
              <label>Details</label>
              <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} />
            </>
          )}
          <label>Slides: {slideCount}</label>
          <input type="range" min={3} max={15} value={slideCount} onChange={e=>setSlideCount(e.target.value)} />
        </div>

        <div className="card">
          <h3>Images & Theme</h3>
          <div>
            <label><input type="radio" checked={imageChoice==='ai_images'} onChange={()=>setImageChoice('ai_images')} /> AI generated images</label>
            <label><input type="radio" checked={imageChoice==='web_search'} onChange={()=>setImageChoice('web_search')} /> Search from web</label>
            <label><input type="radio" checked={imageChoice==='no_images'} onChange={()=>setImageChoice('no_images')} /> No images (themes only)</label>
          </div>
          <label>Company website (optional)</label>
          <input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="www.example.com" />
          <label>Logo URL (optional)</label>
          <input value={logo} onChange={e=>setLogo(e.target.value)} placeholder="https://..." />
        </div>
      </div>
      <div style={{marginTop:16}}>
        <button className="btn" onClick={generate}>Generate</button>
      </div>
    </div>
  )
}
