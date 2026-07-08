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
  { number: 30, label: 'Museos fundados' },
  { number: 1926, label: 'Obras adquiridas' },
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
    title: 'Serie Negro sobre Negro',
    year: '1918 – 1919',
    description: 'En respuesta al Blanco sobre Blanco de Malevich, Rodchenko creó una serie de pinturas geométricas negras que afirmaban la materialidad de la pintura frente al espiritualismo suprematista.',
    image: '', category: 'arte',
  },
  {
    title: 'Director del Museo Bureau y Fondo de Compra',
    year: '1920 – 1925',
    description: 'Designado por el gobierno bolchevique para reorganizar el sistema de museos. Adquirió 1.926 obras de 415 artistas y fundó 30 museos públicos en las provincias rusas.',
    image: '', category: 'arte',
  },
  {
    title: 'Tricromía: Rojo, Amarillo, Azul',
    year: '1921',
    description: 'Presentó tres lienzos monocromáticos —rojo, amarillo y azul— en la exposición 5×5=25, declarando el fin de la pintura de caballete y el comienzo del arte utilitario.',
    image: '', category: 'arte',
  },
  {
    title: 'Profesor en VKhUTEMAS',
    year: '1920 – 1930',
    description: 'Cofundador y profesor de los Talleres Superiores de Arte y Técnica, donde formó a una nueva generación de artistas constructivistas y desarrolló una pedagogía integradora de arte e industria.',
    image: '', category: 'arte',
  },
  {
    title: 'Director del INKhUK',
    year: '1920 – 1921',
    description: 'Reemplazó a Wassily Kandinsky como director del Instituto de Cultura Artística, orientando la institución hacia el productivismo y el arte aplicado a la industria.',
    image: '', category: 'arte',
  },
  {
    title: 'Pionero del Fotomontaje',
    year: '1923 – 1930',
    description: 'Creó fotomontajes innovadores para carteles, revistas y libros. Su trabajo para la revista "LEF" y su colaboración con Mayakovsky definieron una era del diseño gráfico.',
    image: '', category: 'diseno',
  },
  {
    title: 'Identidad Corporativa de Dobrolyot',
    year: '1923',
    description: 'Diseñó la identidad visual completa de la aerolínea estatal Dobrolyot (luego Aeroflot), incluyendo su icónico logotipo del "Martillo y Hoz Alados", uno de los primeros ejemplos de branding corporativo moderno.',
    image: '', category: 'diseno',
  },
  {
    title: 'Revolución Fotográfica',
    year: '1924 – 1930',
    description: 'Rodchenko revolucionó la fotografía con sus ángulos inusuales, perspectivas diagonales y encuadres audaces. Su serie "Edificio en Miasnitskaya" (1925) fue pionera en fotografía desde puntos de vista extremos.',
    image: '', category: 'fotografia',
  },
  {
    title: 'Director de Arte de LEF y Novy LEF',
    year: '1923 – 1928',
    description: 'Diseñó todas las portadas y el diseño editorial de las revistas LEF (7 números) y Novy LEF (22 números), publicaciones centrales del constructivismo ruso que definieron la vanguardia soviética.',
    image: '', category: 'diseno',
  },
  {
    title: 'Club Obrero en la Exposición de París',
    year: '1925',
    description: 'En la Exposition Internationale des Arts Décoratifs de París, presentó el prototipo de un Club Obrero: un espacio funcional con mobiliario modular que encarnaba los ideales productivistas de eficiencia y colectivismo.',
    image: '', category: 'diseno',
  },
  {
    title: 'Fundador de la Fotografía Técnica',
    year: '1928',
    description: 'En la exposición Diez Años de Fotografía Soviética, creó el género de "fotografía técnica", fusionando fotografía documental y artística. Recibió un premio por inventar esta nueva categoría visual.',
    image: '', category: 'fotografia',
  },
  {
    title: 'Director del Grupo de Fotografía Octubre',
    year: '1928 – 1932',
    description: 'Lideró la división de fotografía del grupo Octubre, promoviendo la experimentación y elevando la calidad del fotoperiodismo soviético. El grupo fue disuelto por el régimen stalinista en 1932.',
    image: '', category: 'fotografia',
  },
  {
    title: 'Diseñador de USSR en Construcción',
    year: '1933 – 1941',
    description: 'Fue uno de los diseñadores principales de la revista "USSR en Construcción", publicada en cuatro idiomas. Sus fotomontajes y diseño editorial llevaron la imagen del desarrollo soviético a todo el mundo.',
    image: '', category: 'diseno',
  },
  {
    title: 'Regreso a la Pintura Abstracta',
    year: '1943 – 1946',
    description: 'Durante la Segunda Guerra Mundial y la posguerra, Rodchenko retornó a la pintura abstracta, creando obras expresionistas abstractas que anticiparon el movimiento internacional de posguerra.',
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
  { title: 'Arte para las Masas', description: 'Rodchenko creía que el arte debía servir a la sociedad. Rechazó el "arte por el arte" y trabajó en carteles y propaganda para el pueblo, haciendo del arte una herramienta de transformación social.', icon: '🎭', category: 'social', year: '1920' },
  { title: 'Nuevo Lenguaje Visual', description: 'Líneas diagonales, ángulos extremos, primerísimos planos y perspectivas desde arriba y desde abajo. Expandió el vocabulario visual de la fotografía y el diseño para enseñar a ver el mundo de nuevas maneras.', icon: '👁️', category: 'arte', year: '1924' },
  { title: 'Educador y Teórico', description: 'Profesor en VKhUTEMAS, donde formó a una nueva generación de artistas constructivistas. También dirigió el INKhUK, reemplazando a Kandinsky, y orientó la enseñanza hacia el diseño industrial.', icon: '📚', category: 'social', year: '1922' },
  { title: 'Diseño Publicitario', description: 'Junto a Mayakovsky creó campañas icónicas para Mosselprom, Rezinotrest, GUM y Dobrolyot. Su lema "La publicidad es el motor del comercio" combinó vanguardia artística con comunicación masiva.', icon: '📢', category: 'diseno', year: '1923' },
  { title: 'Construcciones Espaciales', description: 'Sus esculturas abstractas colgantes de madera, metal y cartón —las "construcciones espaciales"— anticiparon el arte cinético, la instalación y el mobiliario moderno.', icon: '📐', category: 'arte', year: '1921' },
  { title: 'Publicidad Estatal', description: 'Diseñó la identidad visual completa de la aerolínea Dobrolyot (luego Aeroflot), uno de los primeros ejemplos de branding corporativo. También creó envases, letreros y uniformes para la industria estatal.', icon: '🛩️', category: 'diseno', year: '1923' },
  { title: 'Teoría de la Perspectiva', description: 'Su manifiesto "La dirección de la fotografía contemporánea" (1928) teorizó que fotografiar desde ángulos inesperados revela nuevas verdades sobre los objetos y transforma la percepción humana.', icon: '📷', category: 'arte', year: '1928' },
  { title: 'Diseño Textil y de Moda', description: 'Junto a Varvara Stepanova, creó patrones geométricos para telas y diseñó ropa funcional inspirada en el constructivismo, buscando unificar estética y utilidad en la vida cotidiana.', icon: '🧵', category: 'diseno', year: '1921' },
  { title: 'Diseño de Interiores Funcional', description: 'Su Club Obrero para la Exposición de París de 1925 —con mobiliario modular, iluminación integrada y espacios polivalentes— sentó las bases del diseño de interiores moderno y el coworking.', icon: '🏗️', category: 'diseno', year: '1925' },
  { title: 'Diseño Editorial de Vanguardia', description: 'Como director de arte de LEF y Novy LEF, revolucionó el diseño de revistas integrando fotomontaje, tipografía experimental y composiciones dinámicas en la página impresa.', icon: '📰', category: 'diseno', year: '1923' },
  { title: 'Escenografía Teatral', description: 'Diseñó sets y vestuarios para obras de vanguardia, integrando construcciones geométricas tridimensionales y proyecciones que transformaban la relación entre actores y espacio escénico.', icon: '🎭', category: 'arte', year: '1929' },
  { title: 'Fotografía de Serie Analítica', description: 'Desarrolló el concepto de "serie fotográfica analítico-documental": múltiples tomas del mismo sujeto desde distintos ángulos para construir una comprensión completa, anticipando la fotografía conceptual.', icon: '🔄', category: 'arte', year: '1928' },
  { title: 'Cartel Cinematográfico Moderno', description: 'Creó carteles revolucionarios para el cine de Eisenstein (Acorazado Potemkin), Vertov (Cine-Ojo, Una Sexta Parte del Mundo) y otros, definiendo el lenguaje visual del cartel de cine moderno.', icon: '🎬', category: 'diseno', year: '1924' },
  { title: 'Legado e Influencia Global', description: 'Su obra influyó a Andy Warhol, Barbara Kruger, Shepard Fairey y Franz Ferdinand. El MoMA lo reconoce como pionero cuyas innovaciones en fotografía, diseño y publicidad siguen vigentes.', icon: '🌟', category: 'social', year: '1956' },
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
  { title: 'Sobre esto', subtitle: 'Vladimir Mayakovsky, 1923', description: 'Portada para el poema de Mayakovsky con fotomontaje de vanguardia. Composición diagonal y tipografía constructivista en rojo y negro que integra texto e imagen en una unidad visual impactante.', image: '', tags: ['Fotomontaje', 'Tipografía', 'Rojo y Negro'], year: 1923 },
  { title: 'LEF No. 1', subtitle: 'Revista LEF, 1923', description: 'Primera portada de la revista LEF (Frente Izquierdo del Arte). Fotomontaje con tipografía geométrica, colores planos y composición dinámica que definió la estética constructivista.', image: '', tags: ['Revista', 'Fotomontaje', 'Vanguardia'], year: 1923 },
  { title: 'LEF No. 2', subtitle: 'Revista LEF, 1923', description: 'Segundo número de LEF con diseño renovado. Rodchenko experimentó con tipografía expandida y fotomontaje a dos tintas para el prospecto promocional.', image: '', tags: ['Revista', 'Tipografía', 'Prospecto'], year: 1923 },
  { title: 'Pro eto (Fotomontajes)', subtitle: 'Vladimir Mayakovsky, 1923', description: 'Ocho fotomontajes interiores para el poema de Mayakovsky "Sobre Esto". Rodchenko integró imágenes de archivo con retratos del poeta en composiciones surrealistas y políticamente cargadas.', image: '', tags: ['Fotomontaje', 'Poesía', 'Surrealismo'], year: 1923 },
  { title: 'Kino-Fot No. 1', subtitle: 'Revista Kino-Fot, 1922', description: 'Portada para la revista de cine dirigida por Aleksei Gan. Composición geométrica con tipografía bold, círculo central y fotomontaje que marcó el inicio del diseño editorial soviético.', image: '', tags: ['Cine', 'Geometría', 'Tipografía'], year: 1922 },
  { title: 'Cartel: Libros (Lengiz)', subtitle: 'Editorial Lengiz, 1924', description: 'Su cartel más famoso: una joven con la mano en la boca grita "Libros en todas las ramas del saber". Fotografía, tipografía moderna y composición diagonal en rojo, negro y blanco.', image: '', tags: ['Publicidad', 'Fotomontaje', 'Editorial'], year: 1924 },
  { title: 'Molodaya Gvardiya', subtitle: 'Editorial Joven Guardia, 1924', description: 'Cartel publicitario para la editorial Molodaya Gvardiya. Composición fotográfica con tipografía constructivista y ángulos audaces que promovían la lectura entre los jóvenes.', image: '', tags: ['Publicidad', 'Juventud', 'Editorial'], year: 1924 },
  { title: 'Kino-Glaz (Cine-Ojo)', subtitle: 'Dziga Vertov, 1924', description: 'Cartel para la serie documental de Dziga Vertov. Fotomontaje dinámico con un ojo como elemento central, tipografía diagonal y composición radial que anticipa el cine-verdad.', image: '', tags: ['Cine', 'Documental', 'Fotomontaje'], year: 1924 },
  { title: 'Cartel: Acorazado Potemkin', subtitle: 'Sergei Eisenstein, 1925', description: 'Cartel para la obra maestra de Eisenstein. Composición diagonal con el acorazado en perspectiva forzada, tipografía roja y blanco sobre fondo negro. Icono del cartel cinematográfico.', image: '', tags: ['Cine', 'Revolución', 'Tipografía'], year: 1925 },
  { title: 'Mosselprom: Cigarrillos Cine', subtitle: 'Mosselprom, 1924', description: 'Publicidad para cigarrillos de la marca "Cine" del trust estatal Mosselprom. Texto de Mayakovsky, composición fotográfica y geometría constructivista en rojo y negro.', image: '', tags: ['Publicidad', 'Cigarrillos', 'Mayakovsky'], year: 1924 },
  { title: 'Galoshes Rezinotrest', subtitle: 'Trust del Caucho, 1923', description: 'Campaña publicitaria para las galochas del Trust del Caucho con textos de Mayakovsky: "Protección contra la lluvia y el barro. Sin galochas, Europa solo puede sentarse y llorar".', image: '', tags: ['Publicidad', 'Mayakovsky', 'Humor'], year: 1923 },
  { title: 'Dobrolyot: Todos... Todos... Todos...', subtitle: 'Aerolínea Dobrolyot, 1923', description: 'Cartel para la aerolínea estatal con el lema "El que no sea accionista de Dobrolyot no es ciudadano de la URSS". Tipografía constructivista y composición geométrica en verde y negro.', image: '', tags: ['Aviación', 'Propaganda', 'Tipografía'], year: 1923 },
  { title: 'Novy LEF No. 1', subtitle: 'Revista Novy LEF, 1927', description: 'Primer número de la segunda etapa de LEF. Rediseño completo con fotografía directa en portada, tipografía sans-serif y composición asimétrica que marcó la evolución hacia el fotoperiodismo.', image: '', tags: ['Fotografía', 'Diseño Editorial', 'Constructivismo'], year: 1927 },
  { title: 'Novy LEF No. 6', subtitle: 'Revista Novy LEF, 1928', description: 'Portada con retrato fotográfico de Mayakovsky. Rodchenko consolidó el uso de la fotografía directa como elemento principal del diseño editorial, eliminando la ilustración tradicional.', image: '', tags: ['Fotografía', 'Retrato', 'Mayakovsky'], year: 1928 },
  { title: 'Conversación con un Recaudador de Impuestos', subtitle: 'Vladimir Mayakovsky, 1924', description: 'Fotomontaje para la contraportada del libro de Mayakovsky. La cabeza del poeta se transforma en la Tierra con aviones volando a su alrededor. Collage onírico con carga política.', image: '', tags: ['Fotomontaje', 'Collage', 'Poesía'], year: 1924 },
  { title: 'Una Sexta Parte del Mundo', subtitle: 'Dziga Vertov, 1926', description: 'Cartel para el documental de Vertov sobre la URSS. Composición con mapas, fotografía aérea y tipografía dinámica. Inspiró décadas después la portada del álbum "Take Me Out" de Franz Ferdinand.', image: '', tags: ['Cine', 'Documental', 'Mapas'], year: 1926 },
  { title: 'Lírka (Poesía Lírica)', subtitle: 'Vladimir Mayakovsky, 1924', description: 'Portada para la colección de poesía lírica de Mayakovsky. Tipografía bold en composición diagonal, uso audaz del espacio negativo y paleta cromática reducida al rojo y negro.', image: '', tags: ['Poesía', 'Tipografía', 'Minimalismo'], year: 1924 },
  { title: 'Galletas Cebra: Octubre Rojo', subtitle: 'Fábrica Octubre Rojo, 1924', description: 'Diseño de empaque para las galletas "Cebra" de la fábrica Octubre Rojo. Texto de Mayakovsky, patrón geométrico zebrado y tipografía constructivista aplicada al diseño de producto.', image: '', tags: ['Empaque', 'Diseño de Producto', 'Mayakovsky'], year: 1924 },
  { title: 'GUM: Tienda Departamental', subtitle: 'GUM / Mosselprom, 1924', description: 'Publicidad para los grandes almacenes GUM. Texto de Mayakovsky con el lema "En todas partes, excepto en GUM, no encontrarás nada". Composición fotográfica con tipografía angular.', image: '', tags: ['Publicidad', 'Comercio', 'Mayakovsky'], year: 1924 },
  { title: 'Obras Escogidas', subtitle: 'Mikhail Bulgakov, 1927', description: 'Diseño minimalista con tipografía constructivista y elementos geométricos para la colección de obras del escritor Mikhail Bulgakov. Composición equilibrada con acentos rojos.', image: '', tags: ['Literatura', 'Minimalismo', 'Geométrico'], year: 1927 },
  { title: 'Cartel: Aviajim', subtitle: 'Sociedad de Aviación, 1927', description: 'Propaganda para la sociedad de aviación Aviajim. Composición dinámica con fotomontaje de aviones, texto en ángulo y paleta constructivista de rojo, negro y blanco.', image: '', tags: ['Propaganda', 'Aviación', 'Fotomontaje'], year: 1927 },
  { title: 'Cartel: MGSPS', subtitle: 'Sindicatos de Moscú, 1925', description: 'Cartel para el Consejo de Sindicatos de Moscú. Composición abstracta con figuras geométricas, tipografía bold y colores planos representando la unidad de los trabajadores.', image: '', tags: ['Sindical', 'Geometría', 'Propaganda'], year: 1925 },
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
  { title: 'Escalera', description: 'Fotografía desde ángulo bajo, 1930', image: '', year: 1930 },
  { title: 'Chica con Leica', description: 'Fotografía de vanguardia, 1934', image: '', year: 1934 },
  { title: 'Construcción Espacial No. 127', description: 'Escultura colgante de madera y metal, 1921', image: '', year: 1921 },
  { title: 'Líneas en el Espacio', description: 'Dibujo abstracto geométrico, 1919', image: '', year: 1919 },
  { title: 'Composición Abstracta', description: 'Pintura constructivista, 1918', image: '', year: 1918 },
  { title: 'Pioneer', description: 'Fotografía documental, 1930', image: '', year: 1930 },
  { title: 'Vidrio y Luz', description: 'Fotografía experimental, 1928', image: '', year: 1928 },
  { title: 'Retrato de Osip Brik', description: 'Fotografía, 1924', image: '', year: 1924 },
  { title: 'Madre', description: 'Fotografía documental, 1928', image: '', year: 1928 },
  { title: 'Patio de VKhUTEMAS', description: 'Fotografía desde arriba, 1928', image: '', year: 1928 },
  { title: 'Cigarrera en Plaza Pushkinskaya', description: 'Fotografía callejera, 1928', image: '', year: 1928 },
  { title: 'La Chica del Correo', description: 'Fotografía de repartidora, 1930', image: '', year: 1930 },
  { title: 'Columnas del Museo de la Revolución', description: 'Fotografía arquitectónica, 1928', image: '', year: 1928 },
  { title: 'Edificio en Miasnitskaya', description: 'Fotografía desde abajo, 1925', image: '', year: 1925 },
  { title: 'Pararrayos', description: 'Fotografía en contrapicado, 1925', image: '', year: 1925 },
  { title: 'Balcones', description: 'Fotografía de perspectiva forzada, 1928', image: '', year: 1928 },
  { title: 'Pinos en Pushkino', description: 'Fotografía de paisaje, 1928', image: '', year: 1928 },
  { title: 'Estación de Tren Briansk', description: 'Fotografía arquitectónica, 1927', image: '', year: 1927 },
  { title: 'Barcos en el Río Moscú', description: 'Fotografía desde arriba, 1929', image: '', year: 1929 },
  { title: 'Orquesta', description: 'Fotografía de composición dinámica, 1928', image: '', year: 1928 },
  { title: 'Pioneer con Trompeta', description: 'Fotografía de propaganda, 1930', image: '', year: 1930 },
]

// ---------- extra data ----------
export const quotes = [
  { text: 'Trabajamos para la vida, no para los museos.', author: 'Alexander Rodchenko', year: '1921' },
  { text: 'El arte debe ser construido, no representado.', author: 'Alexander Rodchenko', year: '1920' },
  { text: 'La fotografía nos enseña un nuevo sistema visual.', author: 'Alexander Rodchenko', year: '1928' },
  { text: 'Hay que experimentar, buscar, no quedarse en lo ya encontrado.', author: 'Alexander Rodchenko', year: '1919' },
  { text: 'Hay que tomar varias tomas diferentes de un sujeto, desde diferentes puntos de vista y en diferentes situaciones, como si se examinara en redondo en lugar de mirar siempre por el mismo agujero de la cerradura.', author: 'Alexander Rodchenko', year: '1928' },
  { text: 'El arte proletario no es un arte decorativo. Es un arte constructivo que organiza la vida.', author: 'Alexander Rodchenko', year: '1922' },
  { text: 'Reduje la pintura a su conclusión lógica y exhibí tres lienzos: rojo, azul y amarillo. Afirmé: todo ha terminado.', author: 'Alexander Rodchenko', year: '1921' },
  { text: 'El arte del futuro no será la decoración acogedora de los hogares familiares. Será tan indispensable como los rascacielos de 48 pisos, los puentes poderosos, los ferrocarriles subterráneos y los astronautas.', author: 'Alexander Rodchenko', year: '1920' },
  { text: 'No hay que hacer arte por compulsión interna, sino por un sentimiento de responsabilidad hacia los conciudadanos.', author: 'Alexander Rodchenko', year: '1921' },
  { text: 'Hay que mirar desde arriba y desde abajo, y trabajar.', author: 'Alexander Rodchenko', year: '1930' },
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
