import { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth'
import { app, FIREBASE_ENABLED } from '../lib/firebase'
let auth = null
if (FIREBASE_ENABLED && app) auth = getAuth(app)
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(FIREBASE_ENABLED)
  useEffect(() => {
    if (!FIREBASE_ENABLED) { setUser({ email: 'dev@atticor.com', displayName: 'Dev User' }); setLoading(false); return }
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false) })
    return unsub
  }, [])
  const signInWithGoogle = async () => { if (!FIREBASE_ENABLED) return; await signInWithPopup(auth, new GoogleAuthProvider()) }
  const signOut = async () => { if (!FIREBASE_ENABLED) return; await fbSignOut(auth) }
  return { user, loading, signInWithGoogle, signOut }
}