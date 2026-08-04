import React from 'react';

export type SchemaType = 
  | 'Course' 
  | 'FAQPage' 
  | 'Organization' 
  | 'EducationalOrganization'
  | 'LocalBusiness'
  | 'WebSite' 
  | 'Article'
  | 'JobPosting'
  | 'BreadcrumbList'
  | 'Person';

interface SchemaMarkupProps {
  type: SchemaType;
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const { '@context': _ctx, '@type': _type, ...cleanData } = data || {};

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...cleanData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

