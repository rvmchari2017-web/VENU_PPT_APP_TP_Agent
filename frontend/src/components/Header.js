import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ user, onLogout }) {
  const loc = useLocation()
  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/">SlideForgeAi</Link>
      </div>
      <div className="header-center">
        {loc.pathname === '/gallery' && <button className="btn">Create New Presentation</button>}
      </div>
      <div className="user-area">
        {user ? (
          <>
            <span>Welcome, {user}</span>
            <button onClick={onLogout} className="btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  )
}
