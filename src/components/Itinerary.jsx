import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'motion/react'
import { DAYS } from '../data'
import { SectionHead, MODE, MODE_LABEL } from './ui'
import { Monkey, HiddenMonkey } from './fun'

const cityColor = p => (p.includes('Madrid') ? '#8e8e93' : p.includes('Bangkok') && !p.includes('→') ? '#e8c27a' : '#3fb8c9')

export default function Itinerary() {
  const list = useRef(null)
  const nodes = useRef([])
  const [h, setH] = useState(1)
  const [pos, setPos] = useState([])
  const [active, setActive] = useState(-1)
  // progress = how far the viewport's 55% line has travelled through the list (measured live, layout-proof)
  const raw = useMotionValue(0)
  const p = useSpring(raw, { stiffness: 400, damping: 45, mass: 0.3 })
  useEffect(() => {
    let f = 0
    const on = () => { cancelAnimationFrame(f); f = requestAnimationFrame(() => {
      const r = list.current?.getBoundingClientRect(); if (!r) return
      raw.set(Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height)))
    }) }
    on(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [raw])
  const top = useTransform(p, v => v * h)

  useEffect(() => {
    const measure = () => {
      if (!list.current) return
      setH(list.current.offsetHeight)
      setPos(nodes.current.map(n => (n ? n.offsetTop + 28 : 0)))
    }
    measure()
    const ro = new ResizeObserver(measure); ro.observe(list.current)
    return () => ro.disconnect()
  }, [])
  useMotionValueEvent(top, 'change', y => {
    let a = -1; pos.forEach((t, i) => { if (y >= t - 4) a = i })
    if (a !== active) setActive(a)
  })
  const cur = DAYS[Math.max(0, active)]
  const Icon = MODE[cur.mode]
  const go = i => nodes.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <section id="itinerary" className="relative bg-black py-24 sm:py-40">
      <HiddenMonkey id="dias" className="right-3 top-10" />
      <SectionHead eyebrow="Día a día" title="Baja y viaja." sub="El mono va colgado de la ruta contigo. Cada día se enciende al llegar, y la burbuja dorada dice cómo nos movemos." />
      <nav className="sticky top-[calc(3rem+env(safe-area-inset-top))] z-20 mx-auto mt-12 flex bg-black/90 backdrop-blur-xl max-w-6xl gap-1 overflow-x-auto px-3 py-2 no-scrollbar sm:rounded-full" aria-label="Ir al día">
        {DAYS.map((d, i) => (
          <button key={d.d} onClick={() => go(i)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition sm:text-sm ${i === active ? 'bg-white text-black' : i < active ? 'text-white' : 'text-neutral-500'}`}>
            {d.d} mar
          </button>
        ))}
      </nav>
      <div ref={list} className="relative mx-auto mt-12 max-w-4xl pl-20 pr-4 sm:pl-32 sm:pr-6">
        {/* rail */}
        <div className="absolute bottom-0 left-8 top-0 w-px bg-white/10 sm:left-16" />
        <motion.div className="absolute left-8 top-0 w-px origin-top bg-gradient-to-b from-gold via-gold to-sea sm:left-16" style={{ height: h, scaleY: p }} />
        {/* the monkey hangs from the route and rides it; the bubble shows today's transport */}
        <motion.div className="absolute left-8 z-10 sm:left-16" style={{ top }}>
          <motion.div key={cur.mode} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="absolute -top-9 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-black shadow-[0_0_30px_rgba(232,194,122,.7)]">
            <Icon size={14} style={cur.mode === 'plane' ? { transform: 'rotate(45deg)' } : undefined} />
          </motion.div>
          <span className="absolute -top-8 left-5 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur">{MODE_LABEL[cur.mode]}</span>
          <motion.div className="absolute -left-[15px] -top-[3px]" style={{ transformOrigin: '15px 3px' }}
            animate={{ rotate: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
            <Monkey hang size={48} className="drop-shadow-[0_6px_14px_rgba(0,0,0,.6)]" />
          </motion.div>
        </motion.div>

        <ol className="space-y-6 sm:space-y-10">
          {DAYS.map((d, i) => {
            const on = i <= active, M = MODE[d.mode]
            return (
              <li key={d.d} ref={el => (nodes.current[i] = el)} className="relative">
                <span className={`absolute top-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 -left-8 sm:-left-16 ${on ? 'h-3.5 w-3.5 border-gold bg-gold' : 'h-3 w-3 border-neutral-600 bg-black'}`} />
                <motion.div
                  animate={{ opacity: on ? 1 : 0.35, x: on ? 0 : 12 }} transition={{ duration: 0.6 }}
                  className={`rounded-3xl p-5 transition-colors duration-500 sm:p-7 ${i === active ? 'bg-neutral-900 ring-1 ring-white/10' : ''}`}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="h-display text-4xl sm:text-5xl">{d.d}</span>
                    <span className="text-sm text-neutral-500">{d.wd} · marzo</span>
                    <span className="eyebrow" style={{ color: cityColor(d.place) }}>{d.place}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{d.title}</h3>
                  {d.leg && <p className="mt-2 flex items-center gap-2 text-sm text-neutral-400"><M size={14} className="text-gold" />{d.leg}</p>}
                  <ul className="mt-4 grid gap-1.5 text-sm">
                    {d.items.map(([t, x]) => (
                      <li key={x} className="flex gap-4"><span className="w-12 shrink-0 tabular-nums text-neutral-500">{t}</span><span className="text-neutral-200">{x}</span></li>
                    ))}
                  </ul>
                  {d.joke && <p className="mt-4 border-l-2 border-gold/60 pl-3 text-sm italic text-gold/90">{d.joke}</p>}
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
      <p className="mx-auto mt-12 max-w-4xl px-4 text-xs text-neutral-500 sm:px-6">Las horas, salvo el vuelo de ida, son sugerencias. Los vuelos internos y la vuelta no están reservados: no se asume ningún horario.</p>
    </section>
  )
}
