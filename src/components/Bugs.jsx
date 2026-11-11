import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Skull, Check, X } from 'lucide-react'
import { BUGS, PHOTO } from '../data'
import { SectionHead, Badge } from './ui'
import { Polaroid, HiddenMonkey } from './fun'

// "Menú degustación del valor" — Sergio vs Nuria, with Nuria's fear meter
export default function Bugs() {
  const [eaten, setEaten] = useState({}) // k -> 'S' | 'N' | 'B'
  const [msg, setMsg] = useState(null)
  const fear = Math.min(100, Object.keys(eaten).reduce((s, k) => s + BUGS.find(b => b.k === k).fear * 9, 0))
  const s = Object.values(eaten).filter(v => v !== 'N').length, n = Object.values(eaten).filter(v => v !== 'S').length
  const eat = (b, who) => {
    setEaten(e => ({ ...e, [b.k]: who === 'N' && e[b.k] === 'S' ? 'B' : who === 'S' && e[b.k] === 'N' ? 'B' : (e[b.k] === 'B' ? 'B' : who) }))
    setMsg(who === 'N' ? (b.boss ? 'Nuria se ha comido la cucaracha. Repetimos: NURIA. SE HA COMIDO. LA CUCARACHA.' : `Nuria: «${b.nuria}»`) : b.boss ? 'Sergio se come la cucaracha. Nuria pide otra habitación.' : `Sergio: «${b.taste}». Sin dramas.`)
  }
  return (
    <section id="bichos" className="relative overflow-hidden bg-[#120c08] py-24 sm:py-40">
      <HiddenMonkey id="bichos" className="right-3 top-24" />
      <SectionHead eyebrow="Reto oficial · Bangkok, jueves noche" title={<>Menú degustación<br /><span className="text-gold">del valor.</span></>}
        sub="Hemos venido a probarlo todo. TODO. Nuria tiene miedo a las cucarachas; Sergio tiene un plan. Toca para ver quién se atreve." />
      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="sticky top-[calc(3rem+env(safe-area-inset-top))] z-10 -mx-4 mb-5 bg-[#120c08]/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:px-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Miedómetro de Nuria</span>
              <span className="tabular-nums text-neutral-400">Sergio {s} · Nuria {n}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" animate={{ width: `${Math.max(4, fear)}%` }} transition={{ type: 'spring', stiffness: 90, damping: 14 }} />
            </div>
            <p className="mt-1 text-xs text-neutral-500">{fear < 30 ? 'Tranquila. De momento.' : fear < 70 ? 'Nuria empieza a mirar billetes de vuelta.' : fear < 100 ? 'Nivel de alerta: grito en público.' : 'Nivel máximo. Se ha subido a una silla.'}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {BUGS.map(b => {
              const st = eaten[b.k]
              return (
                <li key={b.k} className={`rounded-3xl p-5 ring-1 transition ${b.boss ? 'bg-red-950/40 ring-red-500/40 sm:col-span-2' : 'bg-white/5 ring-white/10'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-lg font-semibold">{b.boss && <Skull size={18} className="text-red-400" />}{b.k}</div>
                      <div className="text-xs italic text-neutral-500">{b.th}</div>
                    </div>
                    <div className="text-right text-xs text-neutral-400">Miedo Nuria<div className={`text-lg font-semibold tabular-nums ${b.boss ? 'text-red-400' : ''}`}>{b.fear}/10</div></div>
                  </div>
                  <p className="mt-2 text-sm text-neutral-400">{b.taste}</p>
                  <div className="mt-4 flex gap-2">
                    {[['S', 'Sergio'], ['N', 'Nuria']].map(([w, name]) => {
                      const done = st === w || st === 'B'
                      return (
                        <motion.button key={w} whileTap={{ scale: 0.92 }} onClick={() => eat(b, w)}
                          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium transition ${done ? 'bg-gold text-black' : 'bg-white/10 hover:bg-white/15'}`}>
                          {done ? <Check size={15} /> : null}{name} {done ? 'se lo come' : '¿se atreve?'}
                        </motion.button>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500"><Badge /> Los puestos de bichos fritos son típicos de zonas turísticas y mercados nocturnos; qué hay cada día y a qué precio (normalmente pocos euros) no está verificado.</p>
        </div>
        <div className="mx-auto w-full max-w-[300px] lg:pt-20">
          <Polaroid src={PHOTO.bichos} caption="Prueba nº1: el grillo" rotate={4} />
        </div>
      </div>
      <AnimatePresence>
        {msg && (
          <motion.div key={msg} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mx-auto mt-8 flex max-w-xl items-center gap-3 px-4 text-center text-lg sm:text-xl">
            <span className="flex-1">{msg}</span>
            <button onClick={() => setMsg(null)} aria-label="Cerrar" className="text-neutral-500"><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
