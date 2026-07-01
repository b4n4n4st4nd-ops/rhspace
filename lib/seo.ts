import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ryanhambleton.space";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title: `${title} | Ryan Hambleton`,
    description,
    openGraph: {
      title: `${title} | Ryan Hambleton`,
      description,
      url,
      siteName: "Ryan Hambleton",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ryan Hambleton`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
