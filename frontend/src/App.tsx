import React, { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Gallery from './components/Gallery'
import Create from './components/Create'
import Editor from './components/Editor'
import Header from './components/Header'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [user, setUser] = React.useState<string | null>(() => localStorage.getItem('username'))

  const onLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
  }

  return (
    <div className="app-root">
      <Header user={user} onLogout={onLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/gallery" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={(u: string) => setUser(u)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/login" />} />
          <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
          <Route path="/editor/:id" element={user ? <Editor /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
