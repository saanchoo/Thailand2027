import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { img, IMG } from '../data'

const fade = (d, extra = {}) => ({ initial: { opacity: 0, y: 12, ...extra.i }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { delay: d, duration: 1.2, ease: [0.22, 1, 0.36, 1] } })

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.35])
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const ty = useTransform(scrollYProgress, [0, 1], [0, -120])
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black">
      <motion.img src={img(IMG.hero, 2000)} alt="Barca longtail bajo los acantilados de Krabi" fetchpriority="high"
        style={{ scale }} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black" />
      <motion.div style={{ opacity: op, y: ty }} className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-[env(safe-area-inset-top)] text-center">
        <motion.p {...fade(0.2)} className="eyebrow text-white/70">Una película de Sergio</motion.p>
        <motion.p {...fade(0.6)} className="mt-2 text-sm text-white/70 sm:text-base">Protagonizada por <span className="font-semibold text-white">Nuria</span> · con la participación especial de un montón de macacos</motion.p>
        <h1 className="h-display mt-6 flex flex-wrap justify-center gap-x-[0.25em] text-[15vw] sm:text-[11vw] lg:text-[9.5rem]">
          {['LOST', 'IN', 'THAILAND'].map((w, i) => (
            <motion.span key={w} {...fade(1 + i * 0.18, { i: { y: 60, filter: 'blur(12px)' } })}>{w}</motion.span>
          ))}
        </h1>
        <motion.p {...fade(1.8)} className="mt-3 text-2xl font-light italic text-gold sm:text-4xl">Found in Paradise</motion.p>
        <motion.p {...fade(2.2)} className="mt-8 max-w-md text-sm text-white/75 sm:text-base">
          Sergio &amp; Nuria · 16 — 28 de marzo de 2027<br />Bangkok · Krabi · templos, neón, manglares, monos y algún bicho frito.
        </motion.p>
        <motion.p {...fade(2.6)} className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/40">No apta para cucarachas</motion.p>
      </motion.div>
      <motion.a href="#overview" aria-label="Bajar" className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown size={28} /></motion.a>
    </section>
  )
}
