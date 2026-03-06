import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { FIREBASE_ENABLED } from './lib/firebase'

export default function App() {
  const { user, loading, signInWithGoogle } = useAuth()
  if (loading) return <div style={{color:'#fff',padding:'2rem'}}>Loading...</div>
  if (!user && FIREBASE_ENABLED) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f1217'}}>
      <div style={{textAlign:'center',color:'#fff'}}>
        <h1>Atticor Doom &amp; Deliverables</h1>
        <button onClick={signInWithGoogle} style={{marginTop:'2rem',padding:'1rem 2rem',background:'#4285F4',color:'#fff',border:'none',borderRadius:'8px',user:'pointer'}}>Sign in with Google</button>
      </div>
    </div>
  )
  return (
    <div style={{padding:'2rem',color:'#fff',background:'#0f1217',minHeight:'100vh'}}>
      <h1>Atticor Doom &amp; Deliverables</h1>
      <p style={{color:'#888'}}>Firebase: {FIREBASE_ENABLED ? '✅ Connected' : 'storing locally'}</p>
      <p style={{color:'#888'}}>User: {user?.email || 'dev mode'}</p>
    </div>
  )
}