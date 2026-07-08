export const siteTitle = 'Alexander Rodchenko'
export const siteDescription = 'Explora la vida y obra de Alexander Rodchenko, pionero del constructivismo ruso, fotógrafo revolucionario y diseñador gráfico que transformó el lenguaje visual del siglo XX.'

export const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Logros', path: '/logros' },
  { label: 'Aportes', path: '/aportes' },
  { label: 'Portadas', path: '/portadas' },
  { label: 'Galería', path: '/galeria' },
]

type PageSlug = 'home' | 'logros' | 'aportes' | 'portadas' | 'galeria'

export const seo: Record<PageSlug, { title: string; description: string }> = {
  home: { title: 'Alexander Rodchenko — Constructivismo Ruso', description: siteDescription },
  logros: { title: 'Logros — Alexander Rodchenko', description: 'Los hitos que marcaron la carrera de uno de los artistas más influyentes del siglo XX.' },
  aportes: { title: 'Aportes — Alexander Rodchenko', description: 'Cómo Rodchenko transformó el arte, la sociedad y la forma en que vemos el mundo.' },
  portadas: { title: 'Portadas — Alexander Rodchenko', description: 'Selección de sus diseños editoriales más icónicos, donde la tipografía y la imagen se fusionan.' },
  galeria: { title: 'Galería — Alexander Rodchenko', description: 'Obras que muestran la versatilidad de Rodchenko a través de diferentes medios y técnicas.' },
}

export function getSeo(slug: string) {
  return seo[slug as PageSlug] || seo.home
}

// ---------- content types ----------
export type AchievementCategory = 'arte' | 'fotografia' | 'diseno'
export type ContributionCategory = 'social' | 'arte' | 'diseno'
export type CoverTag = string

// ---------- hero ----------
export const heroContent = {
  title: 'Alexander\nRodchenko',
  subtitle: '1891 – 1956',
  description: 'Pionero del constructivismo ruso, revolucionario del fotomontaje y diseñador gráfico que transformó el lenguaje visual del siglo XX.',
  cta: 'Explorar su legado',
}

// ---------- stats ----------
export const stats = [
  { number: 65, label: 'Años de legado' },
  { number: 200, label: 'Portadas diseñadas' },
  { number: 8, label: 'Disciplinas artísticas' },
  { number: 100, label: 'Fotomontajes' },
]

// ---------- achievements ----------
export interface Achievement {
  title: string
  year: string
  description: string
  image: string
  category: AchievementCategory
}

export const achievements: Achievement[] = [
  {
    title: 'Fundador del Constructivismo',
    year: '1915 – 1920',
    description: 'Junto con Vladimir Tatlin, Rodchenko fue uno de los fundadores del constructivismo ruso, un movimiento que rechazaba el arte autónomo y buscaba integrar el arte en la vida cotidiana y la producción industrial.',
    image: '', category: 'arte',
  },
  {
    title: 'Revolución Fotográfica',
    year: '1924 – 1930',
    description: 'Rodchenko revolucionó la fotografía con sus ángulos inusuales, perspectivas diagonales y encuadres audaces.',
    image: '', category: 'fotografia',
  },
  {
    title: 'Pionero del Fotomontaje',
    year: '1923 – 1930',
    description: 'Creó fotomontajes innovadores para carteles, revistas y libros. Su trabajo para la revista "LEF" y su colaboración con Mayakovsky definieron una era.',
    image: '', category: 'diseno',
  },
  {
    title: 'Diseñador Gráfico y Tipográfico',
    year: '1920 – 1940',
    description: 'Diseñó más de 200 portadas de libros. Su uso de tipografía, colores planos y composiciones dinámicas sentó las bases del diseño gráfico moderno.',
    image: '', category: 'diseno',
  },
  {
    title: 'Artista Polifacético',
    year: '1910 – 1956',
    description: 'Pintor, escultor, fotógrafo, diseñador gráfico y escenógrafo. Su versatilidad lo convierte en una figura única en la historia del arte.',
    image: '', category: 'arte',
  },
]

// ---------- contributions ----------
export interface Contribution {
  title: string
  description: string
  icon: string
  category: ContributionCategory
  year: string
}

export const contributions: Contribution[] = [
  { title: 'Arte para las Masas', description: 'Rodchenko creía que el arte debía servir a la sociedad. Rechazó el "arte por el arte" y trabajó en carteles y propaganda para el pueblo.', icon: '🎭', category: 'social', year: '1920' },
  { title: 'Nuevo Lenguaje Visual', description: 'Líneas diagonales, ángulos extremos, primerísimos planos — expandió el vocabulario visual de la fotografía y el diseño.', icon: '👁️', category: 'arte', year: '1924' },
  { title: 'Educador y Teórico', description: 'Profesor en los Talleres Superiores de Arte y Técnica (VKhUTEMAS), donde formó a una nueva generación de artistas constructivistas.', icon: '📚', category: 'social', year: '1922' },
  { title: 'Diseño Publicitario', description: 'Junto a Mayakovsky creó campañas que combinaban vanguardia artística con comunicación masiva. Lema: "La publicidad es el motor del comercio".', icon: '📢', category: 'diseno', year: '1923' },
  { title: 'Espacio y Escultura', description: 'Sus "construcciones espaciales" — esculturas abstractas colgantes — anticiparon el arte cinético y la instalación.', icon: '📐', category: 'arte', year: '1921' },
  { title: 'Legado Duradero', description: 'Su influencia llega hasta hoy. Diseñadores, fotógrafos y artistas contemporáneos lo citan como inspiración fundamental.', icon: '🌟', category: 'social', year: '1956' },
]

// ---------- covers ----------
export interface Cover {
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  year: number
}

export const covers: Cover[] = [
  { title: 'Sobre esto', subtitle: 'Vladimir Mayakovsky, 1923', description: 'Portada para el poema de Mayakovsky. Composición diagonal y tipografía constructivista en rojo y negro.', image: '', tags: ['Fotomontaje', 'Tipografía', 'Rojo y Negro'], year: 1923 },
  { title: 'LEF No. 1', subtitle: 'Revista LEF, 1923', description: 'Primera portada de la revista LEF. Fotomontaje con tipografía geométrica y colores planos.', image: '', tags: ['Revista', 'Fotomontaje', 'Vanguardia'], year: 1923 },
  { title: 'Novy LEF', subtitle: 'Revista Novy LEF, 1927', description: 'Rediseño de LEF. Composición fotográfica dinámica que muestra su evolución hacia la fotografía directa.', image: '', tags: ['Fotografía', 'Diseño Editorial', 'Constructivismo'], year: 1927 },
  { title: 'Pro eto', subtitle: 'Vladimir Mayakovsky, 1923', description: 'Fotomontaje que integra texto e imagen en una unidad visual impactante para el poema de Mayakovsky.', image: '', tags: ['Fotomontaje', 'Poesía', 'Diseño'], year: 1923 },
  { title: 'Kino-Fot', subtitle: 'Revista Kino-Fot, 1922', description: 'Portada para revista de cine. Composición geométrica con tipografía bold y círculo como elemento central.', image: '', tags: ['Cine', 'Geometría', 'Tipografía'], year: 1922 },
  { title: 'Cartel: Libros', subtitle: 'Cartel publicitario, 1925', description: 'Fotomontaje con tipografía dinámica en composición diagonal para la editorial estatal.', image: '', tags: ['Publicidad', 'Fotomontaje', 'Editorial'], year: 1925 },
  { title: 'Obras Escogidas', subtitle: 'Mikhail Bulgakov, 1927', description: 'Diseño minimalista con tipografía constructivista y elementos geométricos.', image: '', tags: ['Literatura', 'Minimalismo', 'Geométrico'], year: 1927 },
  { title: 'Cartel: Aviajim', subtitle: 'Cartel político, 1927', description: 'Propaganda para la sociedad de aviación. Composición dinámica con fotomontaje y texto en ángulo.', image: '', tags: ['Propaganda', 'Aviación', 'Fotomontaje'], year: 1927 },
]

// ---------- gallery ----------
export interface GalleryImage {
  title: string
  description: string
  image: string
  year: number
}

export const galleryImages: GalleryImage[] = [
  { title: 'Retrato de Mayakovsky', description: 'Fotografía, 1924', image: '', year: 1924 },
  { title: 'Escalera', description: 'Fotografía, 1930', image: '', year: 1930 },
  { title: 'Chica con Leica', description: 'Fotografía, 1934', image: '', year: 1934 },
  { title: 'Construcción Espacial', description: 'Escultura, 1921', image: '', year: 1921 },
  { title: 'Líneas en el Espacio', description: 'Dibujo, 1919', image: '', year: 1919 },
  { title: 'Composición Abstracta', description: 'Pintura, 1918', image: '', year: 1918 },
  { title: 'Pioneer', description: 'Fotografía, 1930', image: '', year: 1930 },
  { title: 'Vidrio y Luz', description: 'Fotografía, 1928', image: '', year: 1928 },
]

// ---------- extra data ----------
export const quotes = [
  { text: 'Trabajamos para la vida, no para los museos.', author: 'Alexander Rodchenko', year: '1921' },
  { text: 'El arte debe ser construido, no representado.', author: 'Alexander Rodchenko', year: '1920' },
  { text: 'La fotografía nos enseña un nuevo sistema visual.', author: 'Alexander Rodchenko', year: '1928' },
  { text: 'Hay que experimentar, buscar, no quedarse en lo ya encontrado.', author: 'Alexander Rodchenko', year: '1919' },
]

export const influences = [
  { title: 'Vladimir Tatlin', description: 'Cofundador del constructivismo, influyó en su visión del arte utilitario.' },
  { title: 'Kazimir Malevich', description: 'El suprematismo de Malevich lo llevó a la abstracción geométrica.' },
  { title: 'Vladimir Mayakovsky', description: 'Su colaboración en LEF y carteles definió el diseño gráfico soviético.' },
  { title: 'Varvara Stepanova', description: 'Su esposa y colega artista, con quien compartió ideas y proyectos.' },
]

export const exhibitions = [
  { title: 'Rodchenko: The Complete Work', museum: 'MoMA, Nueva York', year: '1998', url: 'https://www.moma.org' },
  { title: 'Rodchenko & Popova: Defining Constructivism', museum: 'Tate Modern, Londres', year: '2009', url: 'https://www.tate.org.uk' },
  { title: 'Alexander Rodchenko: Revolution in Photography', museum: 'Museo Pushkin, Moscú', year: '2015', url: '#' },
  { title: 'Rodchenko: Photography and Design', museum: 'Vitra Design Museum', year: '2020', url: '#' },
]

export const externalLinks = {
  wikipedia: 'https://en.wikipedia.org/wiki/Alexander_Rodchenko',
  moma: 'https://www.moma.org/artists/4962',
  tate: 'https://www.tate.org.uk/art/artists/alexander-rodchenko-19981',
  archive: 'https://rodchenko.org/',
}

// Metadata for RodchenkoArt variants — year, technique, Rodchenko quote
export interface ArtContext {
  year: string
  technique: string
  quote: string
}

export const artContexts: Record<number, ArtContext> = {
  1: { year: '1918', technique: 'Óleo sobre lienzo', quote: 'El arte debe ser construido, no representado.' },
  2: { year: '1923', technique: 'Fotomontaje / Litografía', quote: 'Hay que experimentar, buscar, no quedarse en lo ya encontrado.' },
  3: { year: '1921', technique: 'Construcción espacial', quote: 'Trabajamos para la vida, no para los museos.' },
  4: { year: '1924', technique: 'Fotografía en blanco y negro', quote: 'La fotografía nos enseña un nuevo sistema visual.' },
  5: { year: '1927', technique: 'Diseño editorial / Fotomontaje', quote: 'El arte proletario no es un arte decorativo.' },
  6: { year: '1925', technique: 'Cartel publicitario', quote: 'La publicidad es el motor del comercio.' },
  7: { year: '1930', technique: 'Fotografía de vanguardia', quote: 'Hay que mirar desde arriba y desde abajo.' },
}

// JSON-LD schemas
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alexander Rodchenko',
  birthDate: '1891',
  deathDate: '1956',
  nationality: { '@type': 'Country', name: 'Russia' },
  description: siteDescription,
  sameAs: [externalLinks.wikipedia, externalLinks.moma, externalLinks.tate],
}

export const artworkSchema = (title: string, description: string, year: number) => ({
  '@context': 'https://schema.org',
  '@type': 'VisualArtwork',
  name: title,
  description,
  dateCreated: String(year),
  artist: { '@type': 'Person', name: 'Alexander Rodchenko', sameAs: externalLinks.wikipedia },
})
