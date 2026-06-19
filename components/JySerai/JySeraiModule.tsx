'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

// ─── Constantes ───────────────────────────────────────────────
const OUTPUT_SIZE = 1080
const SCALE = OUTPUT_SIZE / 720
const PHOTO_ZONE = {
  x: Math.round(118 * SCALE),
  y: Math.round(360 * SCALE),
  width: Math.round(241 * SCALE),
  height: Math.round(286 * SCALE),
}
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3

const photoImgRef = useRef<HTMLImageElement>(null);

export default function JySeraiModule() {

  // ─── States ───────────────────────────────────────────────
  const [photo, setPhoto]   = useState<string | null>(null)
  const [pret, setPret]     = useState(false)
  const [zoom, setZoom]     = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // ─── Refs ─────────────────────────────────────────────────
  const inputRef          = useRef<HTMLInputElement>(null)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const userPhotoRef      = useRef<HTMLImageElement | null>(null)
  const templateRef       = useRef<HTMLImageElement | null>(null)
  const isDragging        = useRef(false)
  const dragStart         = useRef({ x: 0, y: 0 })
  const offsetAtDragStart = useRef({ x: 0, y: 0 })

  // ─── Chargement du template au montage ────────────────────
  useEffect(() => {
    const template = new Image()
    template.src = '/forma-profil.png'
    template.onload = () => {
      templateRef.current = template
      dessiner({ x: 0, y: 0 }, 1)
    }
  }, [])

  // ─── Fonction principale de dessin ────────────────────────
  const dessiner = useCallback((off: { x: number; y: number }, z: number) => {
    const canvas   = canvasRef.current
    const template = templateRef.current
    if (!canvas || !template) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 1. Fond crème
    ctx.fillStyle = '#FFFBD5'
    ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE)

    // 2. Photo utilisateur si disponible
    const userPhoto = userPhotoRef.current
    if (userPhoto) {
      // Calcul "cover" de base pour remplir la zone
      const zoneRatio  = PHOTO_ZONE.width / PHOTO_ZONE.height
      const photoRatio = userPhoto.width / userPhoto.height

      let sw = userPhoto.width
      let sh = userPhoto.height

      if (photoRatio > zoneRatio) {
        sw = userPhoto.height * zoneRatio
      } else {
        sh = userPhoto.width / zoneRatio
      }

      // Application du zoom : on réduit la portion source (zoom in = voir moins de source)
      sw = sw / z
      sh = sh / z

      // Centrage + offset utilisateur (converti en coordonnées source)
      const scaleX = sw / PHOTO_ZONE.width
      const scaleY = sh / PHOTO_ZONE.height
      const sx = (userPhoto.width  - sw) / 2 - off.x * scaleX
      const sy = (userPhoto.height - sh) / 2 - off.y * scaleY

      ctx.drawImage(
        userPhoto,
        sx, sy, sw, sh,
        PHOTO_ZONE.x, PHOTO_ZONE.y,
        PHOTO_ZONE.width, PHOTO_ZONE.height
      )
    }

    // 3. Template par-dessus (il efface la zone noire et garde son fond transparent)
    ctx.drawImage(template, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)

    setPret(!!userPhotoRef.current)
  }, [])

  // ─── Redessiner quand offset ou zoom changent ──────────────
  useEffect(() => {
    dessiner(offset, zoom)
  }, [offset, zoom, dessiner])

  // ─── Chargement photo utilisateur ─────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPret(false)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.src = ev.target?.result as string
      img.onload = () => {
        userPhotoRef.current = img
        setPhoto(img.src)
        setOffset({ x: 0, y: 0 })
        setZoom(1)
        dessiner({ x: 0, y: 0 }, 1)
      }
    }
    reader.readAsDataURL(file)
  }

  // ─── Conversion écran → coordonnées canvas ────────────────
  const ecranVersCanvas = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect   = canvas.getBoundingClientRect()
    const scaleX = OUTPUT_SIZE / rect.width
    const scaleY = OUTPUT_SIZE / rect.height
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top)  * scaleY,
    }
  }

  // ─── Vérifier si le pointeur est dans la zone photo ───────
  const estDansZone = (cx: number, cy: number) =>
    cx >= PHOTO_ZONE.x &&
    cx <= PHOTO_ZONE.x + PHOTO_ZONE.width &&
    cy >= PHOTO_ZONE.y &&
    cy <= PHOTO_ZONE.y + PHOTO_ZONE.height

  // ─── Événements souris ────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (!userPhotoRef.current) return
    const pos = ecranVersCanvas(e.clientX, e.clientY)
    if (!estDansZone(pos.x, pos.y)) return
    isDragging.current        = true
    dragStart.current         = pos
    offsetAtDragStart.current = offset
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const pos = ecranVersCanvas(e.clientX, e.clientY)
    setOffset({
      x: offsetAtDragStart.current.x + (pos.x - dragStart.current.x),
      y: offsetAtDragStart.current.y + (pos.y - dragStart.current.y),
    })
  }

  const onMouseUp = () => { isDragging.current = false }

  // ─── Événements touch (mobile) ────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    if (!userPhotoRef.current) return
    const touch = e.touches[0]
    const pos   = ecranVersCanvas(touch.clientX, touch.clientY)
    if (!estDansZone(pos.x, pos.y)) return
    isDragging.current        = true
    dragStart.current         = pos
    offsetAtDragStart.current = offset
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const pos   = ecranVersCanvas(touch.clientX, touch.clientY)
    setOffset({
      x: offsetAtDragStart.current.x + (pos.x - dragStart.current.x),
      y: offsetAtDragStart.current.y + (pos.y - dragStart.current.y),
    })
  }

  const onTouchEnd = () => { isDragging.current = false }

  // ─── Téléchargement ───────────────────────────────────────
  const telecharger = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const lien      = document.createElement('a')
    lien.download   = 'jy-serai-camp-jeunesse.png'
    lien.href       = canvas.toDataURL('image/png')
    lien.click()
  }

  // ─── Rendu ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FFFBD5] flex flex-col items-center justify-center gap-6 px-4 py-12">

      <h1 className="font-display text-4xl md:text-5xl uppercase text-[#301D0F] text-center">
        Génère ton image
      </h1>
      <p className="text-[#301D0F]/60 text-center text-sm max-w-sm">
        Choisis ta photo, repositionne-la dans la zone et télécharge ton image à partager.
      </p>

      {/* Bouton upload */}
      <button
        onClick={() => inputRef.current?.click()}
        className="bg-[#FFBD3F] text-[#301D0F] font-bold px-6 py-3 rounded-xl uppercase tracking-wide"
      >
        {photo ? 'Changer ma photo' : 'Choisir ma photo'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />

      {/* Canvas */}
      <div className="flex flex-col items-center gap-2">
        {photo && (
          <p className="text-xs text-[#301D0F]/50">
            Glisse ta photo dans la zone pour la repositionner
          </p>
        )}
        <canvas
          ref={canvasRef}
          width={OUTPUT_SIZE}
          height={OUTPUT_SIZE}
          className="w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-2xl shadow-xl cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>

      {/* Slider zoom */}
      {photo && (
        <div className="flex items-center gap-3 w-full max-w-xs">
          <span className="text-sm text-[#301D0F]/60">−</span>
          <input
            type="range"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-[#FF297F]"
          />
          <span className="text-sm text-[#301D0F]/60">+</span>
        </div>
      )}

      {/* Bouton télécharger */}
      {photo && pret && (
        <button
          onClick={telecharger}
          className="bg-[#FF297F] text-white font-bold px-8 py-4 rounded-xl uppercase text-lg tracking-wide shadow-lg"
        >
          ⬇ Télécharger mon image
        </button>
      )}

    </div>
  )
}