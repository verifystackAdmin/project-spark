import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { canonicalUrl, resolveSeo, SITE_OG_IMAGE } from "@/lib/seoConfig";

/**
 * Per-route title, meta description, canonical, Open Graph, and Twitter tags.
 * Pair with <HelmetProvider> at the app root.
 */
const SeoHead = () => {
  const { pathname } = useLocation();
  const seo = resolveSeo(pathname);
  const canonical = canonicalUrl(pathname);
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VerifyStack" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={SITE_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="VerifyStack — AI-powered trust and verification" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@VerifyStack" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={SITE_OG_IMAGE} />
    </Helmet>
  );
};

export default SeoHead;
