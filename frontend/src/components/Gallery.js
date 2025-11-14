import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Gallery(){
  const [presentations, setPresentations] = React.useState([])
  const nav = useNavigate()

  React.useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get('/presentations')
        setPresentations(res.data.presentations || [])
      }catch(e){
        console.error(e)
      }
    })()
  },[])

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h2>Your Presentations</h2>
        <button className="btn" onClick={()=>nav('/create')}>Create New Presentation</button>
      </div>
      {presentations.length===0 ? (
        <div className="empty">No presentations yet. Click "Create New Presentation"</div>
      ) : (
        <div className="grid">
          {presentations.map(p=> (
            <div className="card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.slides?.length} slides</p>
              <button className="btn" onClick={()=>nav(`/editor/${p.id}`)}>Open</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
