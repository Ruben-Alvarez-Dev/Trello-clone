import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Rubén Álvarez - Desarrollador Full Stack",
  description = "Desarrollador Full Stack con 10+ años de experiencia. Especializado en React, Node.js, PHP y Microsoft Power Platform.",
  image = "https://www.rubenalvarez.dev/og-image.jpg",
  url = "https://www.rubenalvarez.dev",
  type = "website"
}) => {
  const fullTitle = title.includes("Rubén Álvarez") 
    ? title 
    : `${title} | Rubén Álvarez - Portfolio`;

  return (
    <Helmet>
      {/* Título dinámico */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph actualizado */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card actualizado */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Idioma alternativo */}
      <link rel="alternate" hreflang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hreflang="es" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />
    </Helmet>
  );
};

export default SEOHead;