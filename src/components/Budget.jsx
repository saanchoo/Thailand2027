import { useState } from 'react'
import { motion } from 'motion/react'
import { BUDGET } from '../data'
import { SectionHead, Reveal, Badge } from './ui'

const TOTAL = BUDGET.reduce((s, b) => s + b.v, 0)
const R = 80, C = 2 * Math.PI * R
const eur = n => Math.round(n).toLocaleString('es-ES', { useGrouping: 'always' }) + ' €'

export default function Budget() {
  const [sel, setSel] = useState(null)
  const [per, setPer] = useState(false)
  const div = per ? 2 : 1
  let acc = 0
  const s = sel != null ? BUDGET[sel] : null
  return (
    <section id="budget" className="light bg-white py-24 text-neutral-900 sm:py-40">
      <SectionHead light eyebrow="Presupuesto" title={<>{eur(TOTAL / div)}. <span className="text-neutral-400">Cada euro, pensado.</span></>}
        sub="Objetivo para los dos, sin los vuelos Madrid ↔ Bangkok. Todo son estimaciones de planificación: ningún precio está verificado." />
      <div className="mx-auto mt-10 flex max-w-6xl justify-start px-4 sm:px-6">
        <div className="inline-flex rounded-full bg-neutral-100 p-1 text-sm">
          {['Los dos', 'Por persona'].map((t, i) => (
            <button key={t} onClick={() => setPer(!!i)} className={`rounded-full px-4 py-1.5 transition ${per === !!i ? 'bg-white shadow' : 'text-neutral-500'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <svg viewBox="0 0 200 200" className="-rotate-90">
            {BUDGET.map((b, i) => {
              const len = (b.v / TOTAL) * C, off = acc; acc += len
              return (
                <motion.circle key={b.k} cx="100" cy="100" r={R} fill="none" stroke={b.c} strokeWidth={sel === i ? 26 : 20}
                  strokeDasharray={`${Math.max(0, len - 1.5)} ${C}`} strokeDashoffset={-off}
                  initial={{ opacity: 0 }} whileInView={{ opacity: sel == null || sel === i ? 1 : 0.25 }} viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: sel == null ? i * 0.08 : 0 }}
                  className="cursor-pointer transition-[stroke-width]" onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} onClick={() => setSel(sel === i ? null : i)} />
              )
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-neutral-500">{s ? s.k : per ? 'Por persona' : 'Total los dos'}</div>
            <div className="h-display text-4xl sm:text-5xl">{eur((s ? s.v : TOTAL) / div)}</div>
            <div className="text-sm text-neutral-500">{s ? `${Math.round((s.v / TOTAL) * 100)}%` : `${eur(TOTAL / div / 12)} / día`}</div>
          </div>
        </Reveal>
        <ul className="space-y-1">
          {BUDGET.map((b, i) => (
            <li key={b.k}>
              <button onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)} onClick={() => setSel(sel === i ? null : i)}
                className={`w-full rounded-2xl p-3 text-left transition ${sel === i ? 'bg-neutral-100' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 font-medium"><span className="h-3 w-3 rounded-full" style={{ background: b.c }} />{b.k}</span>
                  <span className="tabular-nums font-semibold">{eur(b.v / div)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <motion.div className="h-full rounded-full" style={{ background: b.c }} initial={{ width: 0 }} whileInView={{ width: `${(b.v / 700) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} />
                </div>
                <div className="mt-1.5 text-xs text-neutral-500">{b.note}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Reveal className="mx-auto mt-12 grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {[
          ['Rango', '2.000 – 2.500 €', 'El objetivo está en medio'],
          ['Excursiones', '≈ 180–365 €', 'Templos, crucero, kayak, Railay, Hong y Tiger Cave vs 400 €'],
          ['Mayor riesgo', 'Hoteles', 'Un resort de ensueño 7 noches puede pasar de 700 € él solo'],
        ].map(([a, b, c]) => (
          <div key={a} className="rounded-3xl bg-[#f5f5f7] p-6">
            <div className="flex items-center gap-2 text-sm text-neutral-500">{a} <Badge className="!bg-amber-100 !text-amber-700" /></div>
            <div className="h-display mt-2 text-2xl">{b}</div>
            <div className="mt-1 text-sm text-neutral-500">{c}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
