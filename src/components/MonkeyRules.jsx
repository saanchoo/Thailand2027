import { motion } from 'motion/react'
import { MONKEY_RULES, PHOTO, IMG, img } from '../data'
import { Reveal } from './ui'
import { Monkey, Polaroid, HiddenMonkey } from './fun'

export default function MonkeyRules() {
  return (
    <section id="monos" className="light relative overflow-hidden bg-[#fbf4e8] py-24 text-neutral-900 sm:py-40">
      <HiddenMonkey id="monos" className="bottom-6 left-4" />
      {/* swinging monkeys on a vine */}
      <svg className="absolute left-0 top-16 h-24 w-full" preserveAspectRatio="none" viewBox="0 0 100 20" aria-hidden="true"><path d="M0 2 Q25 18 50 6 T100 4" fill="none" stroke="#5fae7c" strokeWidth=".8" /></svg>
      {[12, 48, 82].map((x, i) => (
        <motion.div key={x} className="absolute top-20 origin-top" style={{ left: `${x}%` }} animate={{ rotate: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 2.6 + i * 0.4, ease: 'easeInOut' }}>
          <Monkey hang size={i === 1 ? 54 : 42} />
        </motion.div>
      ))}
      <div className="mx-auto max-w-6xl px-4 pt-36 sm:px-6">
        <Reveal><p className="eyebrow text-amber-700">Para Nuria, que vino por los monos</p></Reveal>
        <Reveal delay={0.1}><h2 className="h-display mt-4 text-4xl sm:text-6xl md:text-7xl">Reglamento oficial<br />de los macacos.</h2></Reveal>
        <Reveal delay={0.2}><p className="mt-6 max-w-2xl text-lg text-neutral-600">En Krabi viven macacos de cola larga en libertad: en los acantilados de Railay, en las colinas de Ao Nang y alrededor del Tiger Cave. Los vamos a ver. Pero con normas.</p></Reveal>
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_340px]">
          <ol className="grid gap-3 sm:grid-cols-2">
            {MONKEY_RULES.map(([n, t], i) => (
              <Reveal key={n} delay={i * 0.06} as="li" className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="eyebrow text-amber-700">{n}</div>
                <p className="mt-2 text-lg font-medium leading-snug">{t}</p>
              </Reveal>
            ))}
          </ol>
          <div className="relative mx-auto w-full max-w-[300px]">
            <Polaroid src={PHOTO.monos} caption="El mono que robó las gafas de Sergio" rotate={-5} />
            <Reveal className="mt-10 overflow-hidden rounded-3xl">
              <img src={img(IMG.monkey, 700)} alt="Macaco de cola larga en Ao Nang" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <p className="bg-white p-3 text-xs text-neutral-500">Macaco de cola larga real, en Ao Nang. Este no ha firmado el reglamento.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
