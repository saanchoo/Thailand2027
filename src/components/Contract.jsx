import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CLAUSES, PHOTO } from '../data'
import { Monkey, Polaroid, HiddenMonkey } from './fun'

export default function Contract() {
  const [signed, setSigned] = useState(false)
  const [no, setNo] = useState({ x: 0, y: 0, n: 0 })
  const box = useRef(null)
  const flee = () => {
    const w = box.current?.offsetWidth || 300
    setNo(s => ({ x: (Math.random() - 0.5) * (w - 160), y: (Math.random() - 0.5) * 60, n: s.n + 1 }))
  }
  const noText = ['No', '¿Seguro?', 'Piénsalo', 'Hay monos…', 'Error 404', 'Que no, que sí'][Math.min(no.n, 5)]
  return (
    <section id="contrato" className="relative overflow-hidden bg-black py-24 sm:py-40">
      <HiddenMonkey id="contrato" className="right-4 top-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[2rem] bg-[#f6efe2] p-6 text-neutral-900 shadow-2xl sm:p-10">
          <p className="eyebrow text-amber-700">Documento vinculante (más o menos)</p>
          <h2 className="h-display mt-3 text-3xl sm:text-5xl">Contrato de viaje<br />Sergio &amp; Nuria</h2>
          <p className="mt-4 text-neutral-600">Reunidos en Madrid, de una parte Sergio (organizador, comedor de bichos) y de otra parte Nuria (fan de los monos, enemiga de las cucarachas), acuerdan las siguientes cláusulas:</p>
          <ol className="mt-6 space-y-3">
            {CLAUSES.map((c, i) => <li key={c} className="flex gap-3"><span className="font-semibold tabular-nums text-amber-700">{i + 1}.</span><span>{c}</span></li>)}
          </ol>
          <div ref={box} className="relative mt-10 flex h-40 flex-col items-center justify-center gap-4 border-t border-dashed border-neutral-300 pt-6 sm:h-32 sm:flex-row">
            <AnimatePresence mode="wait">
              {!signed ? (
                <motion.div key="q" exit={{ opacity: 0 }} className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <p className="text-lg font-semibold">Nuria, ¿aceptas?</p>
                  <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: 0.92 }} onClick={() => setSigned(true)} className="rounded-full bg-black px-7 py-3 font-semibold text-white">Sí, acepto</motion.button>
                    <motion.button animate={{ x: no.x, y: no.y }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      onPointerEnter={flee} onTouchStart={e => { e.preventDefault(); flee() }} onClick={flee}
                      className="rounded-full bg-neutral-200 px-5 py-3 text-sm text-neutral-600">{noText}</motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <p className="font-['Segoe_Script','Brush_Script_MT',cursive] text-3xl">Nuria ✓ &nbsp; Sergio ✓</p>
                  <p className="mt-2 text-sm text-neutral-600">Firmado. Nos vamos a Tailandia.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[300px]"><Polaroid src={PHOTO.atardecer} caption="Krabi, marzo 2027" rotate={3} /></div>
      </div>
      {/* celebration: monkeys raining */}
      <AnimatePresence>
        {signed && Array.from({ length: 14 }).map((_, i) => (
          <motion.div key={i} className="pointer-events-none fixed top-0 z-[70]" style={{ left: `${(i * 37) % 100}%` }}
            initial={{ y: -120, rotate: 0 }} animate={{ y: '110vh', rotate: (i % 2 ? 1 : -1) * 360 }} transition={{ duration: 2.4 + (i % 4) * 0.4, delay: i * 0.08, ease: 'easeIn' }}>
            <Monkey size={36 + (i % 3) * 14} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  )
}
