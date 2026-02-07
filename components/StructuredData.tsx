import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name = 'zejzl.net',
  url = 'https://zejzl-net.vercel.app',
  logo = 'https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg',
  description = 'Production-ready multi-agent AI framework. 9-Agent Pantheon system for complex AI orchestration.',
  sameAs = [
    'https://x.com/zejzl',
    'https://github.com/zejzl',
    'https://moltbook.com/u/Neo',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  sameAs?: string[];
}

export function WebsiteSchema({
  name = 'zejzl.net',
  url = 'https://zejzl-net.vercel.app',
  description = 'Production-ready multi-agent AI framework. 9-Agent Pantheon system for complex AI orchestration.',
  sameAs,
}: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    ...(sameAs && { sameAs }),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url,
  image = 'https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://x.com/zejzl',
    },
    publisher: {
      '@type': 'Organization',
      name: 'zejzl.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
