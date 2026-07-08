import { Helmet } from 'react-helmet-async'
import { getSeo, personSchema, artworkSchema, galleryImages } from '../data/content'

interface Props {
  slug: string
}

export default function SEO({ slug }: Props) {
  const meta = getSeo(slug)
  const isGallery = slug === 'galeria'

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      {isGallery && galleryImages.map(img => (
        <script key={img.title} type="application/ld+json">
          {JSON.stringify(artworkSchema(img.title, img.description, img.year))}
        </script>
      ))}
    </Helmet>
  )
}
