# Александр Rodchenko

**Web interactiva — Constructivismo Ruso**

Proyecto de diseño gráfico. Recurso adicional para la creación de folletos y afiches sobre la vida y obra de Alexander Rodchenko, pionero del constructivismo ruso, revolucionario del fotomontaje y diseñador gráfico que transformó el lenguaje visual del siglo XX.

---

## ✦ Stack

| | |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build** | Vite 8 + Rolldown |
| **Animaciones** | GSAP 3.15 + ScrollTrigger + MotionPathPlugin |
| **Routing** | react-router-dom |
| **SEO** | react-helmet-async + JSON-LD |

---

## ✦ Sections

| Ruta | Página |
|---|---|
| `/` | Inicio — hero con animaciones extremas, contadores, quote |
| `/logros` | Línea temporal filtrable por categoría y década |
| `/aportes` | Grid de contribuciones con expansión por acento |
| `/portadas` | Galería de portadas con modo comparación |
| `/galeria` | Mosaico de obras con ScrollTrigger.batch |

---

## ✦ Animaciones

- **Título**: caracteres vuelan desde posiciones aleatorias con blur, rotación y stagger random
- **Descripción**: palabras con entrada 3D (rotationX + perspective) y back.out easing
- **Elementos decorativos**: orbitan en MotionPathPlugin con respiración scale yoyó
- **Mouse parallax**: layers siguen el cursor con interpelación GSAP
- **Contadores**: animación con snap + barras de progreso
- **Cita**: slash diagonal, quote mark con back.out, rotación 3D
- **Reduced motion**: todo respeta `prefers-reduced-motion`

---

## ✦ Tematización

- **Modo oscuro / claro** con detección del sistema
- **5 acentos**: rojo, amarillo, azul, naranja, blanco
- **Escala de fuente**: normal / grande
- Persistencia en `localStorage` sin flash gracias al script inline en `index.html`

---

## ✦ Dev

```bash
npm install
npm run dev       # servidor local
npm run build     # tsc + vite build
npm run lint      # oxlint
```

---

## ✦ Licencia

Proyecto educativo sin fines comerciales.
