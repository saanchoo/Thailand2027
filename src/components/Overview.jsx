import { PlaneTakeoff, PlaneLanding } from 'lucide-react'
import { Reveal, Badge } from './ui'
import { Polaroid, HiddenMonkey } from './fun'
import { TRIP, PHOTO } from '../data'

const stats = [
  { n: '12', l: 'días', s: '16 → 28 de marzo' },
  { n: '10', l: 'noches', s: '3 en Bangkok · 7 en Krabi' },
  { n: '2', l: 'hoteles', s: 'Hacer la maleta lo justo' },
  { n: '∞', l: 'monos', s: 'Objetivo personal de Nuria' },
]
const cast = [
  ['Nuria', 'Fan nº1 de los monos. Detecta un macaco a 200 m. Enemiga declarada de las cucarachas.'],
  ['Sergio', 'Organizador, guía y catador oficial de bichos. Responsable de las gafas que robará un mono.'],
  ['Los macacos', 'Actores secundarios. Sin guion, sin contrato y sin ningún respeto por la propiedad privada.'],
]

export default function Overview() {
  return (
    <section id="overview" className="light relative overflow-hidden bg-[#f5f5f7] py-24 text-neutral-900 sm:py-40">
      <HiddenMonkey id="overview" className="right-3 top-6" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <Reveal><p className="eyebrow text-amber-700">El reparto</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="h-display mt-4 text-4xl sm:text-6xl md:text-7xl">Dos viajeros. <span className="text-neutral-400">Una ciudad que no duerme y una costa que casi no se despierta.</span></h2>
            </Reveal>
            <div className="mt-10 grid gap-3">
              {cast.map(([n, t], i) => (
                <Reveal key={n} delay={i * 0.08} className="flex gap-4 rounded-3xl bg-white p-5">
                  <span className="w-24 shrink-0 font-semibold">{n}</span><span className="text-neutral-600">{t}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[300px]"><Polaroid src={PHOTO.cartel} caption="Sergio & Nuria · Tailandia 2027" rotate={-4} overlay={
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-4 pt-16 text-center text-white">
              <div className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/70">Una película de Sergio</div>
              <div className="h-display mt-1 text-[2rem] leading-[0.9]">LOST IN<br />THAILAND</div>
              <div className="mt-1 text-sm font-light italic text-gold">Found in Paradise</div>
            </div>} /></div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-neutral-200 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="bg-white p-5 sm:p-8">
              <div className="h-display text-4xl sm:text-6xl">{s.n}</div>
              <div className="mt-1 font-semibold">{s.l}</div>
              <div className="mt-2 text-sm text-neutral-500">{s.s}</div>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal className="flex items-start gap-4 rounded-3xl bg-white p-6 sm:p-8">
            <PlaneTakeoff className="mt-1 shrink-0 text-amber-700" />
            <div>
              <div className="flex flex-wrap items-center gap-2 font-semibold">Ida <Badge kind="given" className="!bg-emerald-100 !text-emerald-700" /></div>
              <p className="mt-1 text-neutral-600">{TRIP.out.date} · {TRIP.out.time} desde {TRIP.out.from}</p>
              <p className="text-neutral-600">Llegada a {TRIP.out.to} · {TRIP.out.arr}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex items-start gap-4 rounded-3xl bg-white p-6 sm:p-8">
            <PlaneLanding className="mt-1 shrink-0 text-amber-700" />
            <div>
              <div className="flex flex-wrap items-center gap-2 font-semibold">Vuelta <Badge kind="book" className="!bg-sky-100 !text-sky-700" /></div>
              <p className="mt-1 text-neutral-600">{TRIP.back.date} · Krabi → Bangkok → Madrid</p>
              <p className="text-neutral-600">Llegada {TRIP.back.arr}</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6 text-sm text-neutral-500">Estilo: mochila con caprichos de lujo · Koh Jum descartado: añadía un día de barcos y traslados por cada lado.</Reveal>
      </div>
    </section>
  )
}
