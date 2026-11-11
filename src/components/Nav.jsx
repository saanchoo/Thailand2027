import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { HuntCounter } from './fun'
const L = [['route', 'Ruta'], ['bangkok', 'Bangkok'], ['bichos', 'Bichos'], ['krabi', 'Krabi'], ['monos', 'Monos'], ['itinerary', 'Días'], ['contrato', 'Contrato']]
export default function Nav() {
  const { scrollYProgress: p, scrollY } = useScroll()
  const op = useTransform(scrollY, [300, 600], [0, 1])
  const pe = useTransform(scrollY, v => (v > 400 ? 'auto' : 'none'))
  const w = useSpring(p, { stiffness: 200, damping: 40 })
  return (
    <motion.header style={{ opacity: op, pointerEvents: pe }} className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/75 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" className="shrink-0 text-sm font-semibold">S&amp;N <span className="text-gold">’27</span></a>
        <nav className="no-scrollbar flex flex-1 gap-4 overflow-x-auto text-xs text-neutral-300">
          {L.map(([id, t]) => <a key={id} href={`#${id}`} className="shrink-0 py-2 hover:text-white">{t}</a>)}
        </nav>
        <HuntCounter />
      </div>
      <motion.div className="h-px origin-left bg-gold" style={{ scaleX: w }} />
    </motion.header>
  )
}
