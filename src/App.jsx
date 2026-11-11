import Nav from './components/Nav'
import Hero from './components/Hero'
import Overview from './components/Overview'
import JourneyMap from './components/JourneyMap'
import Chapter from './components/Chapter'
import Bugs from './components/Bugs'
import MonkeyRules from './components/MonkeyRules'
import Experiences from './components/Experiences'
import Hotels from './components/Hotels'
import Itinerary from './components/Itinerary'
import Budget from './components/Budget'
import Contract from './components/Contract'
import Finale from './components/Finale'
import { HuntProvider } from './components/fun'
import { IMG, PHOTO } from './data'

export default function App() {
  return (
    <HuntProvider>
      <main id="top">
        <Nav />
        <Hero />
        <Overview />
        <JourneyMap />
        <Chapter id="bangkok" n="I" city="Bangkok" dates="17 – 20 de marzo" tagline="Pan de oro al amanecer. Woks a medianoche. Neón hasta que el cuerpo aguante."
          cover={IMG.arunNight} hotelArea="Sukhumvit, junto a BTS Asok: skytrain, metro y noche a pie."
          photo={{ src: PHOTO.bangkok, c: 'Chinatown en tuk-tuk. Sergio de guía.', r: 3 }}
          lines={['Aterrizamos a las 13:40. El único plan: ducha y skyline.', 'Wat Pho a primera hora, ferry a Wat Arun, y el calor afloja justo para Chinatown.', 'Después, el río de noche.', 'Y Sukhumvit cuando oscurece, porque a Bangkok solo se llega una vez por primera vez.']}
          gallery={[{ f: IMG.pho, c: 'Wat Pho — el Buda reclinado' }, { f: IMG.china, c: 'Yaowarat Road, Chinatown' }, { f: IMG.tuktuk, c: 'La hora del tuk-tuk' }, { f: IMG.skyline, c: 'Skyline al atardecer' }]} />
        <Bugs />
        <Chapter id="krabi" n="II" city="Krabi" dates="20 – 27 de marzo" tagline="Roca caliza, manglares y agua en todos los azules posibles. Y monos." light
          cover={IMG.karst} hotelArea="Klong Muang / Tubkaek: costa tranquila de resorts, ~20–30 min de Ao Nang."
          photo={{ src: PHOTO.kayak, c: 'Nuria rema. Sergio dirige.', r: -3 }}
          lines={['Siete noches. Un resort. Cero maletas.', 'Kayak bajo los acantilados de Ao Thalane, longtail a Railay, snorkel en la laguna de Hong.', 'Macacos en las rocas. Mirados, nunca alimentados.', 'Y tardes largas que acaban en masaje y piscina.']}
          gallery={[{ f: IMG.hong, c: 'Islas Hong' }, { f: IMG.thalane, c: 'Ao Thalane' }, { f: IMG.monkey, c: 'Macaco de cola larga, Ao Nang' }, { f: IMG.phranang, c: 'Playa de Phra Nang' }]} />
        <MonkeyRules />
        <Experiences />
        <Hotels />
        <Itinerary />
        <Budget />
        <Contract />
        <Finale />
      </main>
    </HuntProvider>
  )
}
