import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './globals.css'

const container: HTMLElement | null = document.getElementById('root')
if (container) {
  const root: Root = createRoot(container)
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
