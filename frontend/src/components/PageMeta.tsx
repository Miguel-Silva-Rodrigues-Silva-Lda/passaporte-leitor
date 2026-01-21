import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  keywords?: string;
}

export function PageMeta({
  title,
  description,
  ogImage = '/og-image.png',
  ogUrl,
  keywords,
}: PageMetaProps) {
  const fullTitle = title === 'Passaporte do Leitor'
    ? 'Passaporte do Leitor - Transformar a Leitura numa Aventura'
    : `${title} | Passaporte do Leitor`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph tags for social media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Passaporte do Leitor" />
      <meta property="og:locale" content="pt_PT" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
