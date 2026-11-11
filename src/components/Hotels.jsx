import { Check, Minus, BedDouble } from 'lucide-react'
import { HOTELS, img } from '../data'
import { SectionHead, Reveal } from './ui'

export default function Hotels() {
  return (
    <section id="hotels" className="light bg-[#f5f5f7] py-24 text-neutral-900 sm:py-40">
      <SectionHead light eyebrow="Dónde dormir" title="Dos bases. Elige barrio." sub="Zonas, no reservas: falta elegir hotel concreto y ver precios reales. Los rangos por noche son estimaciones para una doble en marzo (final de temporada alta)." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2">
        {HOTELS.map((h, i) => (
          <Reveal key={h.area} delay={(i % 2) * 0.1} className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative aspect-[16/9]">
              <img src={img(h.img, 1000)} alt={h.area} loading="lazy" className="h-full w-full object-cover" />
              <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${h.alt ? 'bg-white/90 text-neutral-700' : 'bg-black text-white'}`}>{h.alt ? 'Alternativa' : 'Recomendado'}</span>
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur">Foto ilustrativa, no es el hotel</span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow text-amber-700">{h.city} · {h.nights} noches</p>
              <h3 className="mt-2 text-2xl font-semibold">{h.area}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="h-display text-4xl">{h.perNight}</span><span className="text-neutral-500">/ noche</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500"><BedDouble size={14} className="mr-1 inline" />{h.total} en total · <span className="font-semibold text-amber-700">estimación</span></p>
              <ul className="mt-5 space-y-2 text-sm">
                {h.pros.map(p => <li key={p} className="flex gap-2"><Check size={16} className="shrink-0 text-emerald-600" />{p}</li>)}
                <li className="flex gap-2 text-neutral-500"><Minus size={16} className="shrink-0" />{h.cons}</li>
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mx-auto mt-8 max-w-6xl px-4 text-sm text-neutral-500 sm:px-6">
        El día de lujo puede ser una noche mejorada en el resort o un day pass en uno de alto nivel.
      </Reveal>
    </section>
  )
}
