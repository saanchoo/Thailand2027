import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { img, IMG, filePage } from '../data'

const DEPART = new Date('2027-03-16T15:25:00+01:00') // Madrid, CET (horario de invierno hasta el 28 de marzo)

function useCountdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const s = Math.max(0, (DEPART - now) / 1000)
  return [['días', Math.floor(s / 86400)], ['horas', Math.floor((s % 86400) / 3600)], ['min', Math.floor((s % 3600) / 60)], ['sec', Math.floor(s % 60)]]
}

export default function Finale() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(p, [0, 1], [1.25, 1])
  const op = useTransform(p, [0.4, 0.9], [0, 1])
  const cd = useCountdown()
  return (
    <>
      <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black">
        <motion.img src={img(IMG.railay, 2000)} alt="Playa de Railay, Krabi" loading="lazy" style={{ scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <motion.div style={{ opacity: op }} className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="eyebrow text-gold">Bangkok · Ao Thalane · Railay · Islas Hong</p>
          <h2 className="h-display mt-5 text-5xl sm:text-8xl">Nos vemos<br />en el paraíso.</h2>
          <div className="mt-12 grid grid-cols-4 gap-3 sm:gap-6">
            {cd.map(([l, v]) => (
              <div key={l} className="glass min-w-16 rounded-2xl px-3 py-3 sm:min-w-24 sm:px-5 sm:py-4">
                <div className="h-display text-3xl tabular-nums sm:text-5xl">{String(v).padStart(2, '0')}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-400 sm:text-xs">{l}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-400">para despegar de Madrid · 16 de marzo de 2027, 15:25</p>
        </motion.div>
      </section>
      <footer className="bg-black px-4 py-12 text-xs leading-relaxed text-neutral-500 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p>Lost in Thailand · 2027 · Una película de Sergio, protagonizada por Nuria. Ningún macaco fue alimentado durante el rodaje. Los precios son estimaciones en euros para los dos; no hay reservas, horarios ni precios verificados salvo el vuelo de ida.</p>
          <p className="mt-3">Fotografía de destinos: colaboradores de Wikimedia Commons, bajo sus licencias libres —{' '}
            {Object.values(IMG).map((f, i) => <a key={f} href={filePage(f)} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">{i + 1}{i < Object.values(IMG).length - 1 ? ', ' : ''}</a>)}.
          </p>
        </div>
      </footer>
    </>
  )
}
