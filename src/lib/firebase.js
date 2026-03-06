import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const requiredKeys = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID']
export const FIREBASE_ENABLED = requiredKeys.every(k => import.meta.env[k])
export let app = null, db = null
if (FIREBASE_ENABLED) {
  app = initializeApp({ apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId: import.meta.env.VITE_FIREBASE_APP_ID })
  db = getFirestore(app)
}