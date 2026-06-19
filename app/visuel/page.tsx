"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";

// Le frame source fait 2160x2160px — on exporte à cette résolution native
// pour ne jamais upscaler ni downscaler le PNG du frame (perte de netteté).
const CANVAS_SIZE = 2160;
const FRAME_SRC = "/images/frame.png";

export default function VisuelPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [photoDims, setPhotoDims] = useState({ w: 0, h: 0 });
  const [scale, setScale] = useState(1);
  // offset est exprimé en PIXELS RELATIFS À UN CONTENEUR DE TAILLE 1 (fraction),
  // ainsi il est indépendant de la taille réelle du conteneur à l'écran
  // et reproductible à l'identique sur le canvas d'export.
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // fraction de la taille du conteneur
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Charge le frame dans un canvas offscreen pour détecter les zones transparentes
  useEffect(() => {
    const img = new Image();
    img.src = FRAME_SRC;
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        frameCanvasRef.current = c;
      }
    };
  }, []);

  // Détecte si le point touché est dans la zone transparente du frame
  const isInTransparentZone = (clientX: number, clientY: number): boolean => {
    const fc = frameCanvasRef.current;
    const container = containerRef.current;
    if (!fc || !container) return true;
    const rect = container.getBoundingClientRect();
    const px = Math.floor(((clientX - rect.left) / rect.width) * fc.width);
    const py = Math.floor(((clientY - rect.top) / rect.height) * fc.height);
    const ctx = fc.getContext("2d");
    if (!ctx) return true;
    return ctx.getImageData(px, py, 1, 1).data[3] < 128;
  };

  // Pointer events — souris + tactile, mouvement libre sans blocage
  const onPointerDown = (e: React.PointerEvent) => {
    if (!isInTransparentZone(e.clientX, e.clientY)) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };

    // On convertit le delta en pixels écran -> fraction de la taille du conteneur,
    // pour que l'offset stocké soit indépendant de la résolution d'affichage.
    const containerSize = containerRef.current.offsetWidth || 1;
    setOffset((prev) => ({
      x: prev.x + dx / containerSize,
      y: prev.y + dy / containerSize,
    }));
    e.preventDefault();
  };

  const onPointerUp = () => { isDragging.current = false; };

  // Chargement photo — stocke les dimensions naturelles
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => setPhotoDims({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = src;
      setPhotoSrc(src);
      setScale(1);
      setOffset({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  /**
   * Calcule le rectangle de dessin de la photo pour UNE taille de conteneur donnée
   * (containerSize en px). Cette fonction est LA SOURCE UNIQUE DE VÉRITÉ pour la
   * géométrie : l'aperçu CSS et le canvas d'export l'utilisent tous les deux,
   * ce qui garantit qu'ils affichent exactement la même chose.
   *
   * Logique : la photo "couvre" d'abord le conteneur (comme object-fit: cover),
   * puis on applique le zoom (scale) et le déplacement (offset, en fraction du
   * conteneur) autour du CENTRE DU CONTENEUR — exactement comme le ferait
   * `transform: translate(...) scale(...)` sur un élément déjà centré et cover.
   */
  const computeDrawRect = (
    natW: number,
    natH: number,
    containerSize: number
  ) => {
    const aspect = natW / natH;
    // Taille "cover" de base (remplit le carré container x container)
    const baseW = aspect >= 1 ? containerSize * aspect : containerSize;
    const baseH = aspect >= 1 ? containerSize : containerSize / aspect;

    const w = baseW * scale;
    const h = baseH * scale;

    // Centre du conteneur + déplacement (offset est une fraction de containerSize)
    const cx = containerSize / 2 + offset.x * containerSize;
    const cy = containerSize / 2 + offset.y * containerSize;

    return { x: cx - w / 2, y: cy - h / 2, w, h };
  };

  // Génère et télécharge — utilise EXACTEMENT la même géométrie que l'aperçu
  const generateAndDownload = useCallback(async () => {
    if (!photoSrc) return;
    setIsDownloading(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      // Fond blanc de sécurité : si jamais la photo ne couvre pas 100% du canvas
      // (cas limite à scale très réduit), on évite la transparence "blanche" au bord.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const photo = new Image();
      photo.src = photoSrc;
      await new Promise((resolve, reject) => {
        photo.onload = resolve;
        photo.onerror = reject;
      });

      const rect = computeDrawRect(
        photo.naturalWidth,
        photo.naturalHeight,
        CANVAS_SIZE
      );
      ctx.drawImage(photo, rect.x, rect.y, rect.w, rect.h);

      const frame = new Image();
      frame.src = FRAME_SRC;
      await new Promise((resolve, reject) => {
        frame.onload = resolve;
        frame.onerror = reject;
      });
      ctx.drawImage(frame, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "miscion-camp-2026.png";
      a.click();
    } finally {
      setIsDownloading(false);
    }
  }, [photoSrc, scale, offset]);

  // Rect d'aperçu recalculé à chaque render à partir de la même fonction
  const containerSize = containerRef.current?.offsetWidth || 0;
  const previewRect =
    photoSrc && photoDims.w && containerSize
      ? computeDrawRect(photoDims.w, photoDims.h, containerSize)
      : null;

  return (
    <main className="min-h-screen bg-cream px-6 py-24 md:py-32">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="font-body text-viral text-sm font-semibold tracking-[0.2em] uppercase">
            Génère ton visuel
          </p>
          <h1 className="font-display uppercase text-dark text-4xl md:text-6xl mt-3">
            Je suis un Aigle
          </h1>
          <p className="font-body text-dark/70 text-base mt-4 max-w-sm mx-auto">
            Ajoute ta photo, positionne-la librement et partage ton visuel MISCION CAMP 2026.
          </p>
        </motion.div>

        {/* Étapes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          {[
            { step: "01", label: "Ta photo" },
            { step: "02", label: "Positionne" },
            { step: "03", label: "Télécharge" },
          ].map(({ step, label }, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="font-display text-cta text-lg leading-none">{step}</span>
                <span className="font-body text-dark/50 text-xs mt-1">{label}</span>
              </div>
              {i < 2 && <span className="text-dark/20 text-sm">→</span>}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Zone upload */}
          {!photoSrc && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingFile(false);
                if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
              onDragLeave={() => setIsDraggingFile(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-300 ${
                isDraggingFile
                  ? "border-cta bg-cta/5 scale-[1.02]"
                  : "border-dark/20 bg-white hover:border-cta"
              }`}
            >
              <motion.div
                animate={{ y: isDraggingFile ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Upload className="w-10 h-10 text-dark/30 mx-auto mb-4" />
              </motion.div>
              <p className="font-body text-dark font-semibold">
                {isDraggingFile ? "Lâche ta photo ici" : "Clique ou glisse ta photo ici"}
              </p>
              <p className="font-body text-dark/40 text-sm mt-2">PNG, JPG acceptés</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
              />
            </motion.div>
          )}

          {/* Éditeur */}
          {photoSrc && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Aperçu interactif — géométrie pilotée par computeDrawRect,
                  identique pixel pour pixel à ce qui sera exporté. */}
              <div
                ref={containerRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative aspect-square rounded-2xl overflow-hidden bg-dark touch-none select-none cursor-grab active:cursor-grabbing"
              >
                {previewRect && (
                  <img
                    src={photoSrc}
                    alt="Ta photo"
                    draggable={false}
                    className="absolute pointer-events-none max-w-none"
                    style={{
                      left: previewRect.x,
                      top: previewRect.y,
                      width: previewRect.w,
                      height: previewRect.h,
                    }}
                  />
                )}

                {/* Frame par-dessus */}
                <img
                  src={FRAME_SRC}
                  alt="Frame MISCION"
                  draggable={false}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* Hint disparaît après 3s */}
                <motion.p
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs text-white/90 bg-dark/50 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none"
                >
                  👆 Glisse librement pour repositionner
                </motion.p>
              </div>

              {/* Contrôle zoom */}
              <div className="bg-white rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-dark text-sm font-semibold">Zoom</p>
                  <span className="font-body text-dark/40 text-xs bg-dark/5 px-2 py-1 rounded-full">
                    {Math.round(scale * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setScale((s) => Math.max(0.3, parseFloat((s - 0.1).toFixed(2))))}
                    className="w-8 h-8 rounded-full bg-dark/5 flex items-center justify-center hover:bg-dark/10 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-dark" />
                  </button>
                  <input
                    type="range" min="0.3" max="3" step="0.01" value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="flex-1 accent-[#FFBD3F]"
                  />
                  <button
                    onClick={() => setScale((s) => Math.min(3, parseFloat((s + 0.1).toFixed(2))))}
                    className="w-8 h-8 rounded-full bg-dark/5 flex items-center justify-center hover:bg-dark/10 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-dark" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={generateAndDownload}
                  disabled={isDownloading}
                  whileHover={!isDownloading ? { scale: 1.05, boxShadow: "0 0 24px rgba(255,189,63,0.5)" } : {}}
                  whileTap={!isDownloading ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-cta text-dark font-body font-semibold px-6 py-4 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Génération en cours…
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Télécharger mon visuel
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={() => {
                    setPhotoSrc(null);
                    setScale(1);
                    setOffset({ x: 0, y: 0 });
                    setPhotoDims({ w: 0, h: 0 });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-dark/20 text-dark font-body font-medium px-6 py-4 rounded-full hover:border-dark transition-colors duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Changer de photo
                </motion.button>
              </div>
              

              <p className="font-body text-dark/40 text-xs text-center">
                Visuel en 2160×2160px · Parfait pour WhatsApp & Instagram
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </main>
  );
}