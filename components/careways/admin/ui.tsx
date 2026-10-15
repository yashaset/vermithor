'use client'

import { KeyboardEvent, useState } from 'react'
import a from './admin.module.css'
import { ART } from '../data'

type P = { size?: number }
const st = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const I = ({ size = 18, d }: P & { d: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...st} aria-hidden><path d={d} /></svg>
)

export const IcGrid = (p: P) => <I {...p} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
export const IcTag = (p: P) => <I {...p} d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01" />
export const IcMail = (p: P) => <I {...p} d="M4 5h16v14H4zM4 7l8 6 8-6" />
export const IcInbox = (p: P) => <I {...p} d="M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v7H2v-7z" />
export const IcExternal = (p: P) => <I {...p} d="M14 4h6v6M10 14 20 4M19 14v6H4V5h6" />
export const IcReset = (p: P) => <I {...p} d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
export const IcPlus = (p: P) => <I {...p} d="M12 5v14M5 12h14" />
export const IcEdit = (p: P) => <I {...p} d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
export const IcCopy = (p: P) => <I {...p} d="M9 9h11v11H9zM5 15H4V4h11v1" />
export const IcTrash = (p: P) => <I {...p} d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
export const IcClose = (p: P) => <I {...p} d="M6 6l12 12M18 6 6 18" />
export const IcCheck = (p: P) => <I {...p} d="M5 12l5 5L20 7" />
export const IcDownload = (p: P) => <I {...p} d="M12 3v12M7 10l5 5 5-5M4 21h16" />
export const IcPhone = (p: P) => <I {...p} d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
export const IcSearch = (p: P) => <I {...p} d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5" />
export const IcRefresh = (p: P) => <I {...p} d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5" />
export const IcUpload = (p: P) => <I {...p} d="M12 16V4M7 9l5-5 5 5M4 20h16" />
export const IcPage = (p: P) => <I {...p} d="M4 4h16v16H4zM4 9h16M9 9v11" />
export const IcChat = (p: P) => <I {...p} d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6A8 8 0 1 1 21 12z" />

export const IMAGE_OPTIONS: { src: string; label: string }[] = [
  { src: ART.lake, label: 'Lake palace' },
  { src: ART.suite, label: 'Royal suite' },
  { src: ART.pool, label: 'Pool villa' },
  { src: ART.haveli, label: 'Haveli' },
  { src: ART.pink, label: 'Pink palace' },
  { src: ART.fort, label: 'Hill fort' },
  { src: ART.coast, label: 'Coast' },
  { src: ART.hills, label: 'Hills' },
  { src: ART.hero, label: 'Lake at night' },
  { src: ART.jet, label: 'Private jet' },
  { src: ART.car, label: 'Vintage car' },
]

/** Reads an image file and downsizes it to a JPEG data URL (max 1600px wide) so it fits the demo store. */
function fileToDataUrl(file: File, maxW = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file isn’t an image we can read'))
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const uploaded = value && !IMAGE_OPTIONS.some((o) => o.src === value) ? value : null

  const onFile = async (file?: File) => {
    if (!file) return
    setErr('')
    if (!file.type.startsWith('image/')) return setErr('Choose a JPG, PNG or WebP image')
    if (file.size > 15 * 1024 * 1024) return setErr('That image is over 15 MB')
    setBusy(true)
    try { onChange(await fileToDataUrl(file)) } catch (e) { setErr((e as Error).message) } finally { setBusy(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div className={a.imgGrid} role="radiogroup" aria-label="Image">
      <label className={a.imgUpload} aria-label="Upload an image">
        <input type="file" accept="image/*" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = '' }} />
        {busy ? <span className={a.spin} /> : <IcUpload size={20} />}
        <span>{busy ? 'Resizing…' : 'Upload'}</span>
      </label>
      {uploaded && (
        <button type="button" role="radio" aria-checked className={a.imgOn} aria-label="Uploaded image" title="Uploaded image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={uploaded} alt="" />
        </button>
      )}
      {IMAGE_OPTIONS.map((o) => (
        <button key={o.src} type="button" role="radio" aria-checked={value === o.src} aria-label={o.label}
          className={value === o.src ? a.imgOn : a.imgOpt} onClick={() => onChange(o.src)} title={o.label}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={o.src} alt="" />
        </button>
      ))}
    </div>
    {err && <span className={a.err}>{err}</span>}
    </div>
  )
}

export function ChipsInput({ id, value, onChange, max = 6, placeholder }: { id: string; value: string[]; onChange: (v: string[]) => void; max?: number; placeholder?: string }) {
  const [text, setText] = useState('')
  const add = () => {
    const t = text.trim().slice(0, 40)
    if (t && !value.includes(t) && value.length < max) onChange([...value, t])
    setText('')
  }
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
    if (e.key === 'Backspace' && !text && value.length) onChange(value.slice(0, -1))
  }
  return (
    <div className={a.chipsInput}>
      {value.map((v) => (
        <span key={v} className={a.chip}>{v}<button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(value.filter((x) => x !== v))}>×</button></span>
      ))}
      {value.length < max && (
        <input id={id} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onKey} onBlur={add} placeholder={value.length ? 'Add another…' : placeholder} />
      )}
    </div>
  )
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={a.switch} onClick={(e) => { e.stopPropagation(); onChange(!checked) }} />
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return <div className={a.toast} role="status"><IcCheck size={16} />{message}</div>
}

export const relTime = (iso: string) => {
  const s = Math.round((Date.now() - Date.parse(iso)) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} d ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export const fmtDay = (iso?: unknown) =>
  typeof iso === 'string' && iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''
