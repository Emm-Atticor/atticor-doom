import { FIREBASE_ENABLED, db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, onSnapshot, serverTimestamp, addDoc } from 'firebase/firestore'
const lsGet = k => { try { return JSON.parse(localStorage.getItem(k) || 'null') } catch { return null } }
const lsSet = (k, v) => localStorage.setItem(k, JSON.stringify(v))
async function fsGet(name) { const s = await getDocs(collection(db, name)); const r = {}; s.forEach(d => r[d.id] = d.data()); return r}
export async function getIscis() { return FIREBASE_ENABLED ? fsGet('iscis') : lsGet('iscis') || {}}
export async function saveIsci(id, data) { return FIREBASE_ENABLED ? setDoc(doc(db, 'iscis', id), data) : lsSet('iscis', {...lsGet('iscis')||{},[id]:data})}
export async function deleteIsci(id) { if (FIREBASE_ENABLED) return deleteDoc(doc(db, 'iscis', id)); const c = lsGet('iscis')||{}; delete c[id]; lsSet('iscis',c)}
export async function getEstimates() { return FIREBASE_ENABLED ? fsGet('estimates') : lsGet('estimates') || {}}
export async function saveEstimate(id, data) { return FIREBASE_ENABLED ? setDoc(doc(db, 'estimates', id), data) : lsSet('estimates', {...lsGet('estimates')||{},[id]:data})}
export async function getRotations() { return FIREBASE_ENABLED ? fsGet('rotations') : lsGet('rotations') || {}}
export async function saveRotation(id, data) { return FIREBASE_ENABLED ? setDoc(doc(db, 'rotations', id), data) : lsSet('rotations', {...lsGet('rotations')||{},[id]:data})}
export async function getConfirmations() { return FIREBASE_ENABLED ? fsGet('confirmations') : lsGet('confirmations') || {}}
export async function confirmStation(e, s, data) { const id=`${e}__${s}`; return FIREBASE_ENABLED ? setDoc(doc(db,'confirmations',id),data) : lsSet('confirmations',{,...lsGet('confirmations')||{},[id]:data})}
export function subscribeToConfirmations(cb) { if (!FIREBASE_ENABLED) { cb(lsGet('confirmations')||{}); return null } return onSnapshot(collection(db,'confirmations'),s => { const r={}; s.forEach(d => r[did]=d.data()); cb(r) })}
export async function getOohContractOverrides() { return FIREBASE_ENABLED ? fsGet('oohContracts') : lsGet('oohContracts') || {}}
export async function saveOohContractOverride(id, data) { return FIREBASE_ENABLED ? setDoc(doc(db,'oohContracts',id),data) : lsSet('oohContracts', {...lsGet('oohContracts')||{},[id]:data})}
export async function getDismissedAlerts() { return FIREBASE_ENABLED ? fsGet('alerts') : lsGet('alerts') || {}}
export async function dismissAlert(id, sn) { const d={dismissedAt:new Date().toISOString(),snoozeUntil:sn}; return FIREBASE_ENABLED ? setDoc(doc(db,'alerts',id),d) : lsSet('alerts',{...lsGet('alerts')||{},[id]:d})}
export async function getAuditLog() { if (FIREBASE_ENABLED) { const s=await getDocs(collection(db,'auditLog')); return s.docs.map(d=>({id:d.id,...d.data()})) } return lsGet('auditLog')||[]}
export async function addAuditEntry(user,action,details) { const e={user,action,details,timestamp:new Date().toISOString()}; if (FIREBASE_ENABLED) { const r=await addDoc(collection(db,'auditLog'),{...e,timestamp:serverTimestamp()}); return {id:r.id,...e} } const log=lsGet('auditLog')||[]; const n={id:Date.now().toString(),...e}; lsSet('auditLog',[n,...log].slice(0,500)); return n}