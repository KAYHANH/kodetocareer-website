export default function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://kodetocareer.com/#organization",
        "name": "KodeToCareer",
        "url": "https://kodetocareer.com",
        "logo": "https://kodetocareer.com/main-logo.png",
        "description": "AI-Powered Software Engineering & Placement Institute offering 100% live cohorts, guaranteed internships, and dedicated career placement support.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-48, Basement, Sector 2",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "telephone": "+919667975616",
        "hasMap": "https://maps.app.goo.gl/bfGjKfn5kQwnZUCt8?g_st=ac",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.585943,
          "longitude": 77.312582
        },
        "sameAs": [
          "https://www.linkedin.com/company/kode2career/",
          "https://www.instagram.com/kodetocareer",
          "https://www.youtube.com/@KodeToCareer"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://kodetocareer.com/#website",
        "url": "https://kodetocareer.com",
        "name": "KodeToCareer",
        "publisher": {
          "@id": "https://kodetocareer.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
