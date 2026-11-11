import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Plane, Car, TrainFront, Ship, Footprints, Sailboat } from 'lucide-react'
import { img } from '../data'

export const MODE = { plane: Plane, car: Car, train: TrainFront, boat: Ship, walk: Footprints, kayak: Sailboat }
export const MODE_LABEL = { plane: 'Avión', car: 'Taxi', train: 'Tren / taxi', boat: 'Barco', walk: 'A pie', kayak: 'Kayak' }

const ease = [0.22, 1, 0.36, 1]
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1, ease, delay }}>
      {children}
    </M>
  )
}

export function Badge({ kind = 'est', className = '' }) {
  const map = { est: ['Estimación', 'bg-amber-400/15 text-amber-300 ring-amber-300/30'], given: ['Dato vuestro', 'bg-emerald-400/15 text-emerald-300 ring-emerald-300/30'], book: ['Por reservar', 'bg-sky-400/15 text-sky-300 ring-sky-300/30'] }
  const [t, c] = map[kind]
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${c} ${className}`}>{t}</span>
}

// Image that drifts against scroll for depth
export function Parallax({ file, alt, className = '', strength = 15, w = 1600 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={img(file, w)} alt={alt} loading="lazy" decoding="async" style={{ y, scale: 1 + strength / 50 }}
        className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

export function SectionHead({ eyebrow, title, sub, light, center }) {
  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${center ? 'text-center' : ''}`}>
      <Reveal><p className={`eyebrow ${light ? 'text-amber-700' : 'text-gold'}`}>{eyebrow}</p></Reveal>
      <Reveal delay={0.1}><h2 className="h-display mt-4 text-4xl sm:text-6xl md:text-7xl">{title}</h2></Reveal>
      {sub && <Reveal delay={0.2}><p className={`mt-6 max-w-2xl text-lg sm:text-xl ${center ? 'mx-auto' : ''} ${light ? 'text-neutral-600' : 'text-neutral-400'}`}>{sub}</p></Reveal>}
    </div>
  )
}
