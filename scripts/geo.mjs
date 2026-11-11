import { geoMercator, geoPath, geoInterpolate } from 'd3-geo'
import { feature } from 'topojson-client'
import fs from 'fs'
const load = f => JSON.parse(fs.readFileSync(`node_modules/world-atlas/${f}`))
const r = n => Math.round(n * 10) / 10
const fix = s => s.replace(/\d+\.\d+/g, m => r(+m))
const P = { MAD: [-3.57, 40.47], BKK: [100.75, 13.69], KBV: [98.99, 8.1] }
// world
const land = feature(load('land-110m.json'), load('land-110m.json').objects.land)
const w = geoMercator().fitExtent([[0, 0], [1000, 620]], { type: 'MultiPoint', coordinates: [[-14, 58], [112, -4]] })
w.clipExtent([[0, 0], [1000, 620]])
const gw = geoPath(w)
const gi = geoInterpolate(P.MAD, P.BKK)
const arc = Array.from({ length: 60 }, (_, i) => w(gi(i / 59)))
const out = {
  world: { land: fix(gw(land)), outbound: 'M' + arc.map(p => p.map(r).join(',')).join('L'),
    pts: Object.fromEntries(Object.entries(P).map(([k, v]) => [k, w(v).map(r)])) },
}
// thailand
const c50 = load('countries-50m.json'); const cs = feature(c50, c50.objects.countries).features
const t = geoMercator().fitExtent([[0, 0], [600, 900]], { type: 'MultiPoint', coordinates: [[96.5, 20.8], [106, 5.4]] })
t.clipExtent([[0, 0], [600, 900]])
const gt = geoPath(t)
out.th = { thai: fix(gt(cs.find(f => f.id === '764'))), others: fix(cs.filter(f => f.id !== '764').map(f => gt(f)).filter(Boolean).join('')),
  pts: Object.fromEntries(Object.entries(P).filter(([k]) => k !== 'MAD').map(([k, v]) => [k, t(v).map(r)])) }
fs.writeFileSync('src/geo.json', JSON.stringify(out))
console.log(out.world.pts, out.th.pts, fs.statSync('src/geo.json').size)
