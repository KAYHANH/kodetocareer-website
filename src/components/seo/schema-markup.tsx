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
  | 'BreadcrumbList';

interface SchemaMarkupProps {
  type: SchemaType;
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

