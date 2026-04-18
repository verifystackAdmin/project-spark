import { FAVICON_VERSION, SITE_ORIGIN, SITE_OG_IMAGE } from "@/lib/seoConfig";

const OG_IMAGE = SITE_OG_IMAGE;

/** One FAQ Q&A for JSON-LD — `acceptedAnswer.text` must match visible copy on the page (Google FAQ guidelines). */
export type BlogFaqSchemaItem = {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
};

/**
 * FAQPage JSON-LD for blog articles: unique @id per URL, linked to the WebPage to avoid duplicate-entity ambiguity.
 */
export function buildBlogFaqPageJsonLd(slug: string, mainEntity: BlogFaqSchemaItem[]): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: `${pageUrl}#faq`,
    isPartOf: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity,
  };
}

export type BlogPostingSchemaInput = {
  slug: string;
  headline: string;
  description: string;
  /** ISO 8601 date (YYYY-MM-DD) */
  datePublished: string;
  dateModified?: string;
};

/**
 * Google-friendly BlogPosting JSON-LD for article pages.
 */
export function buildBlogPostingJsonLd(input: BlogPostingSchemaInput): Record<string, unknown> {
  const url = `${SITE_ORIGIN}/blog/${input.slug}`;
  const mod = input.dateModified ?? input.datePublished;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: [OG_IMAGE],
    datePublished: input.datePublished,
    dateModified: mod,
    author: {
      "@type": "Organization",
      name: "VerifyStack",
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      name: "VerifyStack",
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/logo-192.png?v=${FAVICON_VERSION}`,
      },
    },
  };
}
