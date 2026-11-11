// Precios: EUR para los dos. "est" = estimación (sin verificar ni reservar). "given" = dato vuestro.
const FP = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
// Unsplash ids start with 'photo-'; everything else is a Wikimedia Commons file name
export const img = (file, w = 1600) => file.startsWith('photo-')
  ? `https://images.unsplash.com/${file}?w=${w}&q=80&auto=format&fit=crop`
  : `${FP}${encodeURIComponent(file)}?width=${w}`
export const filePage = file => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

// Vuestras fotos (generadas con Nano Banana). Guardadas en public/photos/
export const PHOTO = {
  cartel: './photos/cartel.jpg',
  bangkok: './photos/bangkok.jpg',
  bichos: './photos/bichos.jpg',
  kayak: './photos/kayak.jpg',
  monos: './photos/monos.jpg',
  atardecer: './photos/atardecer.jpg',
}

export const IMG = {
  hero: 'photo-1552465011-b4e21bf6e79a',
  arun: 'photo-1762950297550-1d8d7cce12ae',
  arunNight: 'photo-1701958596353-11ea6c8500f3',
  pho: 'Wat Pho, Bangkok, Tailandia, 2013-08-22, DD 05.jpg',
  china: 'photo-1508009603885-50cf7c579365',
  skyline: 'photo-1523731407965-2430cd12f5e4',
  rooftop: 'photo-1584293938526-76d5ceac45f1',
  tuktuk: 'photo-1615619825440-f18cea64b00e',
  railay: 'photo-1650259874515-2cd3af8b8980',
  phranang: 'photo-1761465063742-aac680af138e',
  hong: 'photo-1538475711279-0373b6bc754e',
  thalane: 'photo-1642124587211-998635ef31d5',
  monkey: 'photo-1613376285651-140dcffdb430',
  aonang: 'photo-1688625548814-d7bb114d344e',
  karst: 'photo-1587242882574-2005e53dcc33',
  jungle: 'photo-1575515602219-a177b8cc5e99',
  pool: 'photo-1520250497591-112f2f40a3f4',
  luxury: 'photo-1605537964076-3cb0ea2ff329',
  poolBkk: 'photo-1536625737227-92a1fc042e7e',
  massage: 'photo-1775133262667-316bd4d9e5b5',
}

export const TRIP = {
  out: { from: 'Madrid MAD', date: 'Mar 16 mar 2027', time: '15:25', to: 'Bangkok BKK', arr: 'Mié 17 mar · 13:40' },
  back: { date: 'Sáb 27 mar 2027', arr: 'Dom 28 mar · por la mañana (objetivo)' },
}

export const EXPERIENCES = [
  { id: 'pho', city: 'Bangkok', cat: 'Cultura', title: 'Wat Pho', where: 'Rattanakosin, Bangkok', dur: '1,5 h', cost: '€15–20', img: IMG.pho, text: 'El Buda reclinado de 46 metros y la escuela histórica del masaje tailandés. A primera hora, antes de que apriete el calor.' },
  { id: 'arun', city: 'Bangkok', cat: 'Cultura', title: 'Wat Arun', where: 'Orilla de Thonburi', dur: '1 h', cost: '€10–15', img: IMG.arun, text: 'El Templo del Amanecer, cubierto de mosaico de porcelana. Se cruza en el ferry pequeño desde el muelle Tha Tien, al lado de Wat Pho.' },
  { id: 'china', city: 'Bangkok', cat: 'Comida', title: 'Street food en Chinatown', where: 'Yaowarat Rd, Bangkok', dur: '3 h', cost: '€25–40', img: IMG.china, text: 'Neón, woks y colas de noche. Puesto a puesto: fideos, marisco a la brasa y mango sticky rice para Nuria.' },
  { id: 'roof', city: 'Bangkok', cat: 'Noche', title: 'Rooftop al atardecer', where: 'Silom / Sukhumvit', dur: '2 h', cost: '€40–70', img: IMG.skyline, text: 'Cócteles con el skyline a los pies. Hay código de vestimenta (nada de chanclas, Sergio) y los precios varían mucho.' },
  { id: 'cruise', city: 'Bangkok', cat: 'Experiencia', title: 'Noche en el Chao Phraya', where: 'Río Chao Phraya', dur: '2–3 h', cost: '€5–90', img: IMG.arunNight, text: 'Versión mochilera: barco exprés de bandera naranja al anochecer. Versión lujo: crucero con cena frente a los templos iluminados.' },
  { id: 'markets', city: 'Bangkok', cat: 'Compras', title: 'Mercados y compras', where: 'Chatuchak (finde) · Talat Noi · Siam', dur: '3–4 h', cost: '€20 + compras', img: IMG.tuktuk, text: 'Chatuchak solo abre en fin de semana: el sábado 20 por la mañana encaja si el vuelo a Krabi es por la tarde.' },
  { id: 'night', city: 'Bangkok', cat: 'Noche', title: 'Soi Cowboy y Nana', where: 'Sukhumvit (Asok / Nana)', dur: '2 h', cost: '€30–60', img: IMG.rooftop, text: 'Las famosas calles de neón de la noche adulta de Bangkok. Para ver el espectáculo y tomar algo; precios claros antes de pedir.' },
  { id: 'thalane', city: 'Krabi', cat: 'Aventura', title: 'Kayak en Ao Thalane', where: 'Ao Thalane, ~30 min al norte de Ao Nang', dur: '2–3 h', cost: '€40–70', img: IMG.thalane, text: 'Remar entre manglares y paredes de roca caliza. Turno de mañana y ojo a la marea, que decide qué canales están abiertos.' },
  { id: 'railay', city: 'Krabi', cat: 'Playas', title: 'Railay y Phra Nang', where: 'Península de Railay (solo en barco)', dur: 'Día completo', cost: '€15–25', img: IMG.phranang, text: 'No hay carretera: 10–15 min en longtail desde Ao Nang. Phra Nang y su cueva están a un paseo desde Railay East.' },
  { id: 'hong', city: 'Krabi', cat: 'Islas', title: 'Islas Hong', where: 'Parque Nacional Than Bok Khorani', dur: 'Día completo', cost: '€60–110', img: IMG.hong, text: 'Una laguna escondida dentro de un anillo de roca, snorkel y arena blanca. La entrada al parque puede ir aparte: confirmar con el operador.' },
  { id: 'wild', city: 'Krabi', cat: 'Monos', title: 'Macacos en libertad', where: 'Railay · colinas de Ao Nang', dur: '1–2 h', cost: '€0', img: IMG.monkey, text: 'La misión personal de Nuria. Macacos de cola larga viviendo libres entre los acantilados. Se miran de lejos y nunca se les da de comer.' },
  { id: 'tiger', city: 'Krabi', cat: 'Selva', title: 'Mirador del Tiger Cave', where: 'Wat Tham Suea, Krabi Town', dur: '3 h', cost: '€15 (taxi)', img: IMG.jungle, text: '1.260 escalones empinados hasta una vista 360° de selva y roca. Al amanecer, con agua, hombros y rodillas cubiertos. Puede haber monos.' },
  { id: 'spa', city: 'Krabi', cat: 'Relax', title: 'Tardes de masaje', where: 'Ao Nang / spa del resort', dur: '1–2 h', cost: '€20–40 /sesión', img: IMG.massage, text: 'Los locales a pie de calle son baratos; el spa del resort cuesta varias veces más. Hay presupuesto para unas 4 sesiones.' },
  { id: 'lux', city: 'Krabi', cat: 'Lujo', title: 'El día de lujo', where: 'Klong Muang / Tubkaek', dur: 'Día completo', cost: '€80–200', img: IMG.luxury, text: 'Un día de verdad: piscina infinita, spa y cena al atardecer. O una noche mejorada, o un day pass en un resort top.' },
]

export const HOTELS = [
  { city: 'Bangkok', area: 'Sukhumvit · cerca de BTS Asok / MRT Sukhumvit', nights: 3, perNight: '€45–70', total: '€135–210', img: IMG.skyline, pros: ['Skytrain y metro en la puerta', 'Soi Cowboy y Nana andando', 'Taxi fácil al río'], cons: 'Calles con ruido y jaleo' },
  { city: 'Bangkok', area: 'Junto al río · cerca de BTS Saphan Taksin', nights: 3, perNight: '€50–90', total: '€150–270', img: IMG.poolBkk, pros: ['Barcos a Wat Pho y Wat Arun', 'Más tranquilo, vistas al río', 'Conexión con skytrain'], cons: 'Más lejos de la noche de Sukhumvit', alt: true },
  { city: 'Krabi', area: 'Playa de Klong Muang / Tubkaek', nights: 7, perNight: '€60–90', total: '€420–630', img: IMG.pool, pros: ['Costa tranquila de resorts', 'Piscinas mirando a las islas', '~20–30 min en taxi a Ao Nang'], cons: 'Taxi para salir por la noche' },
  { city: 'Krabi', area: 'Colina de Ao Nang (a las afueras)', nights: 7, perNight: '€45–75', total: '€315–525', img: IMG.aonang, pros: ['Andando a los barcos de Railay e islas', 'Restaurantes cerca', 'Más barato'], cons: 'Más cerca del gentío', alt: true },
]

// mode: plane, car, train, boat, walk, kayak · joke = guiño del día
export const DAYS = [
  { d: 16, wd: 'Mar', place: 'Madrid', title: 'Despegamos', mode: 'plane', leg: 'MAD → BKK · vuelo nocturno', items: [['15:25', 'Salida de Madrid (dato vuestro)']], joke: 'Nuria elige ventanilla. Sergio, como siempre, acepta.' },
  { d: 17, wd: 'Mié', place: 'Bangkok', title: 'Aterrizaje en la ciudad de los ángeles', mode: 'train', leg: 'Airport Rail Link / taxi · ~45–60 min', items: [['13:40', 'Llegada a Suvarnabhumi (dato vuestro)'], ['16:00', 'Check-in, siesta, piscina'], ['18:30', 'Primer cóctel en un rooftop']], joke: 'Prohibido dormir antes de las 21:00. Jet lag se combate con pad thai.' },
  { d: 18, wd: 'Jue', place: 'Bangkok', title: 'Templos y Chinatown', mode: 'boat', leg: 'Ferry Tha Tien ↔ Wat Arun', items: [['08:00', 'Wat Pho a primera hora'], ['10:30', 'Ferry a Wat Arun'], ['14:00', 'Hotel / masaje'], ['19:00', 'Street food en Chinatown']], joke: 'Noche del reto de los bichos. Nuria, respira.' },
  { d: 19, wd: 'Vie', place: 'Bangkok', title: 'Mercados, río y neón', mode: 'walk', leg: 'Skytrain + andando', items: [['10:00', 'Talat Noi y compras'], ['18:00', 'Crucero nocturno por el Chao Phraya'], ['22:00', 'Soi Cowboy / Nana']], joke: 'Límite de compras: lo que quepa en la maleta de Sergio.' },
  { d: 20, wd: 'Sáb', place: 'Krabi', title: 'Rumbo al mar de Andamán', mode: 'plane', leg: 'BKK/DMK → KBV · ~1 h 20 (por reservar)', items: [['09:00', 'Chatuchak (opcional)'], ['Tarde', 'Vuelo a Krabi'], ['', 'Taxi al resort · ~30–40 min'], ['18:30', 'Atardecer en el resort']], joke: 'Primer avistamiento de monos posible. Nuria, cámara preparada.' },
  { d: 21, wd: 'Dom', place: 'Krabi', title: 'Bajamos revoluciones', mode: 'car', leg: 'Día de resort', items: [['Mañana', 'Piscina y desayuno'], ['16:00', 'Primer masaje tailandés'], ['19:30', 'Cena en Ao Nang']], joke: 'Única tarea del día: no hacer nada. Sergio suspenderá.' },
  { d: 22, wd: 'Lun', place: 'Ao Thalane', title: 'Manglares en kayak', mode: 'kayak', leg: 'Recogida · ~30 min · kayak', items: [['08:00', 'Kayak en Ao Thalane'], ['Tarde', 'Piscina']], joke: 'Quien rema delante decide. Quien rema detrás, rema.' },
  { d: 23, wd: 'Mar', place: 'Railay', title: 'Railay y Phra Nang', mode: 'boat', leg: 'Longtail desde Ao Nang · 10–15 min', items: [['09:00', 'Longtail a Railay'], ['11:00', 'Playa y cueva de Phra Nang'], ['', 'Macacos en los acantilados'], ['17:30', 'Atardecer en Railay West']], joke: 'DÍA MONO. Regla nº1 en vigor. Gafas de sol bien sujetas.' },
  { d: 24, wd: 'Mié', place: 'Islas Hong', title: 'Laguna y snorkel', mode: 'boat', leg: 'Tour en lancha / longtail', items: [['08:30', 'Tour Islas Hong'], ['Tarde', 'Vuelta y masaje']], joke: 'Crema solar cada 2 horas. Sergio, eso va por ti, gamba.' },
  { d: 25, wd: 'Jue', place: 'Tiger Cave', title: 'Selva y miradores', mode: 'car', leg: 'Taxi a Krabi Town · ~30 min', items: [['06:00', 'Subida al Tiger Cave al amanecer'], ['Tarde', 'Playa escondida + siesta'], ['19:00', 'Mercado nocturno']], joke: '1.260 escalones. Quien llegue segundo paga los batidos de mango.' },
  { d: 26, wd: 'Vie', place: 'Krabi', title: 'El día de lujo', mode: 'car', leg: 'Noche mejorada o day pass', items: [['10:00', 'Piscina infinita'], ['15:00', 'Spa'], ['19:00', 'Cena al atardecer']], joke: 'Hoy Nuria es la reina. Sergio, el mayordomo.' },
  { d: 27, wd: 'Sáb', place: 'Krabi → Bangkok', title: 'Último baño y vuelta larga', mode: 'plane', leg: 'KBV → BKK → MAD (por reservar)', items: [['Mañana', 'Último baño'], ['Tarde', 'Vuelo a Bangkok'], ['Noche', 'Vuelo nocturno a Madrid']], joke: 'Control de aduanas: ningún mono viaja en la maleta.' },
  { d: 28, wd: 'Dom', place: 'Madrid', title: 'Casa', mode: 'plane', leg: '', items: [['Mañana', 'Llegada a Madrid (objetivo)']], joke: 'Fin. ¿Cuándo volvemos?' },
]

export const BUDGET = [
  { k: 'Hoteles', v: 700, c: '#e8c27a', note: '10 noches · ~€70/noche de media' },
  { k: 'Excursiones', v: 400, c: '#3fb8c9', note: 'Kayak, islas Hong, crucero, templos' },
  { k: 'Comida y bebida', v: 400, c: '#f07a5a', note: '~€36/día para los dos (bichos incluidos)' },
  { k: 'Imprevistos', v: 300, c: '#8e8e93', note: 'Subidas de precio, caprichos' },
  { k: 'Traslados', v: 180, c: '#a78bfa', note: 'Taxis, longtails, tren al aeropuerto' },
  { k: 'Vuelos internos', v: 150, c: '#5fae7c', note: 'BKK→KBV, KBV→BKK' },
  { k: 'Masajes y extras', v: 120, c: '#f472b6', note: '~4 sesiones de masaje + caprichos' },
]

// Reto de los bichos. fear = miedo de Nuria (0–10, la cucaracha rompe la escala)
export const BUGS = [
  { k: 'Grillo frito', th: 'jing reed', fear: 2, taste: 'Crujiente, sabe a pipa salada', nuria: 'Vale, uno. Con los ojos cerrados.' },
  { k: 'Gusano de seda', th: 'dak dae', fear: 5, taste: 'Blandito por dentro. Mejor no pensarlo', nuria: 'Sergio primero. Luego ya veremos.' },
  { k: 'Saltamontes', th: 'takkataen', fear: 4, taste: 'Como el grillo pero con más patas', nuria: 'Las patas no. Las patas NO.' },
  { k: 'Escorpión', th: 'maeng pong', fear: 8, taste: 'Más foto que comida', nuria: 'Solo para la foto, y desde lejos.' },
  { k: 'Chinche de agua gigante', th: 'maeng da', fear: 9, taste: 'Dicen que tiene aroma afrutado. Dicen…', nuria: 'Eso es una cucaracha con otro nombre.' },
  { k: 'Cucaracha', th: 'el jefe final', fear: 11, taste: 'Si la encontramos en algún puesto…', nuria: 'Me vuelvo a Madrid andando.', boss: true },
]

export const MONKEY_RULES = [
  ['Regla nº1', 'Los macacos no son tus amigos. Son ladrones profesionales con mucho carisma.'],
  ['Regla nº2', 'No se les da de comer. Nunca. Ni aunque pongan ojitos.'],
  ['Regla nº3', 'Gafas de sol, móviles y bolsas de patatas: bien agarrados.'],
  ['Regla nº4', 'Sergio no puede adoptar un mono. Nuria tampoco (aunque insista).'],
  ['Regla nº5', 'Las fotos con monos se hacen a distancia, sin tocar y sin atraerlos con comida.'],
  ['Regla nº6', 'Si un mono enseña los dientes no está sonriendo. Nos vamos.'],
]

export const CLAUSES = [
  'Nuria tiene derecho de veto sobre la cucaracha, pero no sobre el grillo.',
  'Sergio no adoptará ningún mono, ni lo meterá en la maleta.',
  'Los masajes se reparten a partes iguales. Siempre.',
  'Quien pierda el reto de los bichos paga la cena del día de lujo.',
  'La foto con monos (a distancia) es obligatoria.',
  'Ventanilla para Nuria en todos los vuelos.',
]
