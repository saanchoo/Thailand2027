import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'motion/react'
import { Plane, Car } from 'lucide-react'
import geo from '../geo.json'
import { Badge } from './ui'

const W = geo.world, T = geo.th
const q = (a, b, lift) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - lift; return `M${a}Q${mx},${my} ${b}` }
const RET = q(W.pts.KBV, W.pts.MAD, 250)
const DOM = `M${T.pts.BKK}Q${T.pts.BKK[0] + 120},${(T.pts.BKK[1] + T.pts.KBV[1]) / 2} ${T.pts.KBV}`

// Moves a marker along an SVG path as `p` (0..1) changes
function useFollow(pathRef, p) {
  const x = useMotionValue(-99), y = useMotionValue(-99), r = useMotionValue(0)
  useMotionValueEvent(p, 'change', v => {
    const el = pathRef.current; if (!el) return
    const L = el.getTotalLength(), a = el.getPointAtLength(v * L), b = el.getPointAtLength(Math.min(L, v * L + 1))
    x.set(a.x); y.set(a.y); r.set((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI)
  })
  return { x, y, r }
}

function Marker({ m, Icon, op, size = 22, color = '#e8c27a' }) {
  return (
    <motion.g style={{ x: m.x, y: m.y, opacity: op }}>
      <circle r={size} fill="#000" stroke={color} strokeWidth="1.5" />
      <motion.g style={{ rotate: m.r }}><Icon x={-size / 2} y={-size / 2} width={size} height={size} color={color} style={{ transform: 'rotate(45deg)', transformOrigin: 'center', transformBox: 'fill-box' }} /></motion.g>
    </motion.g>
  )
}

function City({ at, label, on, align = 'start', dy = -16 }) {
  return (
    <motion.g style={{ opacity: on }}>
      <circle cx={at[0]} cy={at[1]} r="14" fill="#e8c27a" opacity=".18"><animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite" /></circle>
      <circle cx={at[0]} cy={at[1]} r="5" fill="#e8c27a" />
      <text x={at[0] + (align === 'end' ? -12 : 12)} y={at[1] + dy} textAnchor={align} fill="#fff" fontSize="20" fontWeight="600">{label}</text>
    </motion.g>
  )
}

const captions = [
  { r: [0, 0.06, 0.36, 0.42], k: 'Tramo 1 · Avión', t: 'Madrid → Bangkok', s: 'Mar 16 mar 15:25 → Mié 17 mar 13:40 · ~9.900 km. Nuria en ventanilla.', b: 'given' },
  { r: [0.44, 0.5, 0.72, 0.78], k: 'Tramo 2 · Avión + taxi', t: 'Bangkok → Krabi', s: 'Sáb 20 mar · ~1 h 20 de vuelo y ~30–40 min de taxi. Territorio mono.', b: 'book' },
  { r: [0.8, 0.85, 0.98, 1.01], k: 'Tramo 3 · Aviones', t: 'Krabi → Bangkok → Madrid', s: 'Sáb 27 mar → Dom 28 mar por la mañana · escala en Bangkok. Sin monos en la maleta.', b: 'book' },
]

function Caption({ c, p }) {
  const o = useTransform(p, c.r, [0, 1, 1, 0])
  const y = useTransform(p, c.r, [30, 0, 0, -30])
  return (
    <motion.div style={{ opacity: o, y }} className="glass absolute inset-x-4 bottom-6 mx-auto max-w-md rounded-3xl p-5 sm:bottom-10 sm:left-10 sm:right-auto sm:mx-0 sm:p-6">
      <div className="flex items-center gap-2"><span className="eyebrow text-gold">{c.k}</span><Badge kind={c.b} /></div>
      <div className="h-display mt-2 text-2xl sm:text-4xl">{c.t}</div>
      <p className="mt-2 text-sm text-neutral-400">{c.s}</p>
    </motion.div>
  )
}

export default function JourneyMap() {
  const ref = useRef(null), outRef = useRef(null), domRef = useRef(null), retRef = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const pOut = useTransform(p, [0.06, 0.36], [0, 1], { clamp: true })
  const pDom = useTransform(p, [0.5, 0.72], [0, 1], { clamp: true })
  const pRet = useTransform(p, [0.84, 0.98], [0, 1], { clamp: true })
  const worldOp = useTransform(p, [0, 0.4, 0.46, 0.76, 0.82], [1, 1, 0, 0, 1])
  const thOp = useTransform(p, [0.4, 0.46, 0.76, 0.82], [0, 1, 1, 0])
  const worldScale = useTransform(p, [0.36, 0.46, 0.76, 0.84], [1, 2.2, 2.2, 1])
  const thScale = useTransform(p, [0.4, 0.48], [0.6, 1])
  const mOut = useFollow(outRef, pOut), mDom = useFollow(domRef, pDom), mRet = useFollow(retRef, pRet)
  const opOut = useTransform(p, [0.05, 0.07, 0.36, 0.4], [0, 1, 1, 0])
  const opDom = useTransform(p, [0.49, 0.51, 0.72, 0.75], [0, 1, 1, 0])
  const opRet = useTransform(p, [0.83, 0.85, 0.98, 1], [0, 1, 1, 0])
  const one = useMotionValue(1)
  const bkkOn = useTransform(p, [0.34, 0.37], [0.25, 1])
  const kbvOn = useTransform(p, [0.7, 0.73], [0.25, 1])

  return (
    <section id="route" ref={ref} className="relative h-[420vh] bg-black">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute left-0 right-0 top-20 z-10 px-4 text-center sm:top-24">
          <p className="eyebrow text-gold">La ruta</p>
          <h2 className="h-display mt-3 text-3xl sm:text-5xl">≈ 20.000 km. Tres vuelos. Dos valientes.</h2>
        </div>
        <motion.svg viewBox="0 0 1000 620" className="absolute top-[22%] h-[64%] w-full max-w-6xl" style={{ maskImage: 'radial-gradient(ellipse at center, #000 50%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 50%, transparent 78%)', opacity: worldOp, scale: worldScale, transformOrigin: '90% 78%' }} aria-label="Mapa de Madrid a Tailandia">
          <path d={W.land} fill="#1c1c1e" stroke="#2c2c2e" strokeWidth=".6" />
          <path d={W.outbound} fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1.5" strokeDasharray="3 6" />
          <motion.path ref={outRef} d={W.outbound} fill="none" stroke="#e8c27a" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: pOut }} />
          <motion.path ref={retRef} d={RET} fill="none" stroke="#3fb8c9" strokeWidth="2" strokeLinecap="round" style={{ pathLength: pRet }} />
          <City at={W.pts.MAD} label="Madrid" on={one} />
          <City at={W.pts.BKK} label="Bangkok" on={bkkOn} align="end" />
          <City at={W.pts.KBV} label="Krabi" on={kbvOn} align="end" dy={28} />
          <Marker m={mOut} Icon={Plane} op={opOut} />
          <Marker m={mRet} Icon={Plane} op={opRet} color="#3fb8c9" />
        </motion.svg>
        <motion.svg viewBox="0 0 600 900" className="absolute top-[20%] h-[72%] w-full" style={{ maskImage: 'radial-gradient(ellipse at center, #000 50%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 50%, transparent 78%)', opacity: thOp, scale: thScale }} aria-label="Mapa de Bangkok a Krabi">
          <path d={T.others} fill="#141416" stroke="#2c2c2e" strokeWidth=".8" />
          <path d={T.thai} fill="#1f2a24" stroke="#5fae7c" strokeOpacity=".5" strokeWidth="1" />
          <path d={DOM} fill="none" stroke="#fff" strokeOpacity=".15" strokeDasharray="3 6" strokeWidth="2" />
          <motion.path ref={domRef} d={DOM} fill="none" stroke="#e8c27a" strokeWidth="3" strokeLinecap="round" style={{ pathLength: pDom }} />
          <text x="50" y="690" fill="#3fb8c9" opacity=".5" fontSize="18" letterSpacing="4">MAR DE</text><text x="50" y="714" fill="#3fb8c9" opacity=".5" fontSize="18" letterSpacing="4">ANDAMÁN</text>
          <text x="330" y="600" fill="#3fb8c9" opacity=".5" fontSize="18" letterSpacing="4">GOLFO DE</text>
          <text x="330" y="624" fill="#3fb8c9" opacity=".5" fontSize="18" letterSpacing="4">TAILANDIA</text>
          <City at={T.pts.BKK} label="Bangkok · 3 noches" on={one} />
          <City at={T.pts.KBV} label="Krabi · 7 noches" on={kbvOn} />
          <Marker m={mDom} Icon={Plane} op={opDom} size={26} />
        </motion.svg>
        {captions.map(c => <Caption key={c.t} c={c} p={p} />)}
        <div className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-neutral-500 sm:flex"><Car size={14} /> Los trayectos por tierra, en el día a día</div>
      </div>
    </section>
  )
}
