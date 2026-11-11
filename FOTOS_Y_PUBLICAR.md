# Fotos (Nano Banana) y publicación

## 1. Generar las fotos
En Gemini (Nano Banana), sube **una foto de referencia donde salgáis los dos con la cara bien visible** y pega cada prompt.
Pide formato **vertical 4:5**. Guarda cada imagen como JPG (~1200 px de ancho) con **exactamente** este nombre:

| Archivo | Dónde sale |
|---|---|
| cartel.jpg | Sección "El reparto" |
| bangkok.jpg | Capítulo Bangkok |
| bichos.jpg | Reto de los bichos |
| kayak.jpg | Capítulo Krabi |
| monos.jpg | Reglamento de los macacos |
| atardecer.jpg | Contrato final |

Mientras falte una foto, la web muestra un marco con un mono y "Foto en camino…".

Prefijo para todos los prompts:
> Usa a las dos personas de la foto de referencia (el chico es Sergio, la chica es Nuria) manteniendo sus caras, pelo y rasgos reales. Fotografía cinematográfica realista, look de película de 35 mm, luz cálida, formato vertical 4:5, sin texto salvo que se pida.

**cartel.jpg** — Póster de película de aventuras. Sergio y Nuria en primer plano en una barca longtail tailandesa entre acantilados de roca caliza y agua turquesa, Nuria señalando entusiasmada a un macaco sentado en una roca al fondo, Sergio con gafas de sol y mapa en la mano. Título grande arriba "LOST IN THAILAND", subtítulo "Found in Paradise", abajo en pequeño "Sergio & Nuria · Marzo 2027".

**bangkok.jpg** — De noche en Chinatown (Yaowarat), Bangkok, letreros de neón rojos y dorados. Sergio y Nuria en la parte de atrás de un tuk-tuk en marcha, pelo al viento, Nuria riéndose agarrada a la barra, Sergio señalando las luces. Desenfoque de movimiento en las luces.

**bichos.jpg** — Puesto callejero de insectos fritos de noche en Bangkok, bandejas de grillos y gusanos. Sergio sostiene orgulloso una brocheta con un grillo frito cerca de la boca y guiña un ojo; Nuria se aparta tapándose la boca con cara de asco exagerada pero riéndose. Ambiente divertido, luz cálida de bombillas.

**kayak.jpg** — Kayak doble en los manglares de Ao Thalane, Krabi, entre paredes de roca caliza y agua verde esmeralda. Nuria delante remando con energía; Sergio detrás, relajado, con el remo sobre las rodillas y gafas de sol, como si fuera de vacaciones. Mañana luminosa.

**monos.jpg** — En una playa de Railay, Krabi, un macaco de cola larga sentado en una roca acaba de quitarle las gafas de sol a Sergio y las sujeta. Sergio con cara de sorpresa total; Nuria muerta de risa haciendo la foto con el móvil a una distancia prudente. Nadie da comida al mono. Acantilados y agua turquesa de fondo.

**atardecer.jpg** — Atardecer dorado en Railay West, Krabi. Sergio y Nuria sentados en la arena de espaldas a cámara, abrazados, mirando el mar con barcas longtail recortadas en el horizonte. A unos metros, un macaco sentado en una roca mira el atardecer también. Emotivo y cinematográfico.

## 2. Meter las fotos
Copia los 6 JPG en `dist/photos/` (para publicar ya) y en `public/photos/` (para futuros builds con `npm run build`).

## 3. Publicar en Netlify (gratis, ~2 min)
1. Entra en https://app.netlify.com/drop (crea cuenta si no tienes).
2. Arrastra la carpeta **`dist`** entera.
3. En *Site configuration → Change site name* ponle algo como `sergio-y-nuria-tailandia`.
4. Mándale el link `https://<nombre>.netlify.app`.
Para actualizar: *Deploys* → arrastra de nuevo la carpeta `dist`.

Nota: cualquiera con el link puede verla (no está indexada ni enlazada en ningún sitio, pero no es privada).
