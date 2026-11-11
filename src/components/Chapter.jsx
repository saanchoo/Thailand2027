import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MapPin } from 'lucide-react'
import { img } from '../data'
import { Reveal, Parallax } from './ui'
import { Polaroid } from './fun'

// Cinematic chapter: pinned full-bleed image that zooms out while the title fades in, then an editorial gallery.
export default function Chapter({ id, n, city, dates, tagline, cover, lines, gallery, hotelArea, light, photo }) {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], [1.3, 1])
  const dim = useTransform(p, [0, 0.5, 1], [0.2, 0.45, 0.7])
  const tOp = useTransform(p, [0.05, 0.3], [0, 1])
  const tY = useTransform(p, [0.05, 0.3], [80, 0])
  const sOp = useTransform(p, [0.35, 0.6], [0, 1])
  return (
    <section id={id} className={light ? 'light bg-white text-neutral-900' : 'bg-black'}>
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.img src={img(cover, 2000)} alt={city} loading="lazy" style={{ scale }} className="absolute inset-0 h-full w-full object-cover" />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black" />
          <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <motion.p style={{ opacity: tOp }} className="eyebrow text-gold">Capítulo {n} · {dates}</motion.p>
            <motion.h2 style={{ opacity: tOp, y: tY }} className="h-display mt-4 text-[18vw] sm:text-[12vw] lg:text-[11rem]">{city}</motion.h2>
            <motion.p style={{ opacity: sOp }} className="mt-4 max-w-xl text-lg text-white/85 sm:text-2xl">{tagline}</motion.p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px]">
        <div className="max-w-4xl space-y-6">
          {lines.map((l, i) => (
            <Reveal key={i} delay={0.05}>
              <p className={`h-display text-3xl sm:text-5xl ${i % 2 ? (light ? 'text-neutral-400' : 'text-neutral-500') : ''}`}>{l}</p>
            </Reveal>
          ))}
        </div>
        {photo && <div className="mx-auto w-full max-w-[280px]"><Polaroid src={photo.src} caption={photo.c} rotate={photo.r || 3} /></div>}
        </div>
        <Reveal className={`mt-10 flex items-center gap-2 text-sm ${light ? 'text-neutral-500' : 'text-neutral-400'}`}><MapPin size={16} /> Campamento base: {hotelArea}</Reveal>
        <div className="mt-16 grid grid-cols-6 gap-3 sm:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={g.f} delay={i * 0.08} className={['col-span-6 md:col-span-4', 'col-span-3 md:col-span-2', 'col-span-3 md:col-span-2', 'col-span-6 md:col-span-4'][i % 4]}>
              <figure>
                <Parallax file={g.f} alt={g.c} w={1200} className={`rounded-3xl ${i % 4 === 0 || i % 4 === 3 ? 'aspect-[16/10]' : 'aspect-[4/5]'}`} />
                <figcaption className={`mt-3 text-sm ${light ? 'text-neutral-500' : 'text-neutral-400'}`}>{g.c}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
