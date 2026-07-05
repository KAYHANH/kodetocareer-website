import React from 'react';

interface SchemaMarkupProps {
  type: 'Course' | 'FAQPage' | 'Organization' | 'WebSite' | 'Article';
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
