import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageOff } from 'lucide-react'

// Original cartoon macaque (hand-drawn SVG). `hang` = one arm raised to grab a line.
export function Monkey({ size = 64, hang = false, className = '', style }) {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className={className} style={style} aria-hidden="true">
      <path d="M70 92 C95 95 96 70 84 66" fill="none" stroke="#8a5a36" strokeWidth="6" strokeLinecap="round" />
      {hang
        ? <path d="M38 62 L30 30 L32 6" fill="none" stroke="#8a5a36" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M34 70 Q22 82 30 94" fill="none" stroke="#8a5a36" strokeWidth="9" strokeLinecap="round" />}
      <path d="M66 70 Q78 82 70 94" fill="none" stroke="#8a5a36" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="50" cy="84" rx="20" ry="22" fill="#a06b42" />
      <ellipse cx="50" cy="88" rx="12" ry="14" fill="#e9c9a1" />
      <path d="M40 104 l-4 12 M60 104 l4 12" stroke="#8a5a36" strokeWidth="8" strokeLinecap="round" />
      <circle cx="26" cy="46" r="9" fill="#a06b42" /><circle cx="26" cy="46" r="5" fill="#e9b48f" />
      <circle cx="74" cy="46" r="9" fill="#a06b42" /><circle cx="74" cy="46" r="5" fill="#e9b48f" />
      <circle cx="50" cy="44" r="23" fill="#a06b42" />
      <path d="M50 30 C36 30 32 40 34 48 C35 58 42 64 50 64 C58 64 65 58 66 48 C68 40 64 30 50 30Z" fill="#f0c9a6" />
      <circle cx="43" cy="44" r="3.4" fill="#2b1a10" /><circle cx="57" cy="44" r="3.4" fill="#2b1a10" />
      <circle cx="44" cy="43" r="1.1" fill="#fff" /><circle cx="58" cy="43" r="1.1" fill="#fff" />
      <ellipse cx="50" cy="52" rx="5" ry="3" fill="#d79c7d" />
      <path d="M44 57 Q50 62 56 57" fill="none" stroke="#2b1a10" strokeWidth="2" strokeLinecap="round" />
      {hang && <circle cx="32" cy="6" r="5" fill="#8a5a36" />}
    </svg>
  )
}

// Polaroid photo slot. Falls back to an illustrated card until the photo exists in /photos.
export function Polaroid({ src, caption, rotate = -3, className = '', aspect = 'aspect-[4/5]', overlay }) {
  const [err, setErr] = useState(false)
  return (
    <motion.figure initial={{ opacity: 0, y: 40, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate }} viewport={{ once: true, margin: '-10%' }}
      transition={{ type: 'spring', stiffness: 80, damping: 14 }}
      className={`relative bg-white p-3 pb-14 text-neutral-900 shadow-2xl ${className}`}>
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 to-emerald-100 ${aspect}`}>
        {!err
          ? <img src={src} alt={caption} loading="lazy" onError={() => setErr(true)} className="h-full w-full object-cover" />
          : <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-xs text-neutral-500">
              <Monkey size={56} /><ImageOff size={16} /><span>Foto en camino…</span>
            </div>}
        {overlay && !err && overlay}
      </div>
      <figcaption className="absolute inset-x-3 bottom-3 text-center font-['Marker_Felt','Comic_Sans_MS','Segoe_Print',cursive] text-base sm:text-lg">{caption}</figcaption>
      <Monkey size={44} className="absolute -right-5 -top-6 rotate-12 drop-shadow" />
    </motion.figure>
  )
}

// Hidden-monkey hunt for Nuria
const Ctx = createContext(null)
export const TOTAL_HIDDEN = 6
export function HuntProvider({ children }) {
  const [found, setFound] = useState([])
  const [toast, setToast] = useState(null)
  const find = useCallback(id => setFound(f => {
    if (f.includes(id)) return f
    const n = [...f, id]
    setToast(n.length === TOTAL_HIDDEN ? '¡Nuria, los has encontrado TODOS! Premio: Sergio te debe un masaje tailandés (pagado por él).' : `¡Mono encontrado! ${n.length}/${TOTAL_HIDDEN}`)
    setTimeout(() => setToast(null), n.length === TOTAL_HIDDEN ? 6000 : 2200)
    return n
  }), [])
  return (
    <Ctx.Provider value={{ found, find }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-sm font-medium text-neutral-900 shadow-2xl">
            <Monkey size={40} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
export const useHunt = () => useContext(Ctx)

export function HiddenMonkey({ id, className = '' }) {
  const { found, find } = useHunt()
  const got = found.includes(id)
  return (
    <motion.button aria-label="Mono escondido" onClick={() => find(id)} className={`absolute z-10 ${className}`}
      initial={{ y: 30 }} whileInView={{ y: got ? 30 : 0 }} viewport={{ margin: '-20%' }} whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.6 }} style={{ opacity: got ? 0.35 : 1 }}>
      <Monkey size={42} />
    </motion.button>
  )
}

export function HuntCounter() {
  const { found } = useHunt()
  return (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 py-0.5 pl-1 pr-2 text-xs tabular-nums" title="Monos escondidos encontrados">
      <Monkey size={18} /> {found.length}/{TOTAL_HIDDEN}
    </span>
  )
}
