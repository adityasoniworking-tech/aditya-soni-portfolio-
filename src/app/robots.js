export default function robots() {
  const baseUrl = "https://aditya-soni-portfolio-xi.vercel.app";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard-ctrl/', '/portal-access/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
