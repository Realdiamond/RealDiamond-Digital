export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  areaServed?: string;
  sameAs: string[];
}

export interface Article {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  publisher: Organization;
}

export interface Service {
  name: string;
  description: string;
  provider: Organization;
  serviceType: string;
  areaServed: string;
}

export function generateOrganizationSchema(org: Organization) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    email: org.email,
    telephone: org.telephone,
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry,
      },
    }),
    ...(org.areaServed && { areaServed: org.areaServed }),
    sameAs: org.sameAs,
  };
}

export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: generateOrganizationSchema(article.publisher),
  };
}

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: generateOrganizationSchema(service.provider),
    serviceType: service.serviceType,
    areaServed: service.areaServed,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateLocalBusinessSchema(business: Organization & { priceRange?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': business.url,
    name: business.name,
    image: business.logo,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange || '$$',
    ...(business.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 0,
        longitude: 0,
      },
    }),
    ...(business.areaServed && { areaServed: business.areaServed }),
    sameAs: business.sameAs,
  };
}
