import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Clock, Euro } from 'lucide-react'
import { EXPERIENCES, img } from '../data'
import { SectionHead, Badge } from './ui'
import { HiddenMonkey } from './fun'

const FILTERS = ['Todo', 'Bangkok', 'Krabi', 'Monos', 'Aventura', 'Comida', 'Noche']

export default function Experiences() {
  const [f, setF] = useState('Todo')
  const list = EXPERIENCES.filter(e => f === 'Todo' || e.city === f || e.cat === f || (f === 'Aventura' && ['Islas', 'Selva', 'Playas'].includes(e.cat)))
  return (
    <section id="experiences" className="relative overflow-hidden bg-black py-24 sm:py-40">
      <HiddenMonkey id="exp" className="left-3 top-8" />
      <SectionHead eyebrow="Experiencias" title="Catorce momentos que valen el vuelo." sub="Todos los precios son estimaciones para los dos, en euros — no presupuestos. Se confirman antes de pagar." />
      <div className="no-scrollbar mx-auto mt-12 flex max-w-6xl gap-2 overflow-x-auto px-4 sm:px-6">
        {FILTERS.map(x => (
          <button key={x} onClick={() => setF(x)} className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${f === x ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'}`}>{x}</button>
        ))}
      </div>
      <motion.div layout className="mx-auto mt-8 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map(e => (
            <motion.article layout key={e.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }} className="group overflow-hidden rounded-3xl bg-neutral-900">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img(e.img, 800)} alt={e.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs">{e.city} · {e.cat}</span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{e.text}</p>
                <dl className="mt-5 grid gap-2 text-sm text-neutral-300">
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-gold" />{e.where}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-gold" />{e.dur}</div>
                  <div className="flex items-center gap-2"><Euro size={14} className="text-gold" />{e.cost} los dos <Badge /></div>
                </dl>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
