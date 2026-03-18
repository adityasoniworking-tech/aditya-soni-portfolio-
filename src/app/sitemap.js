export default function sitemap() {
  const baseUrl = "https://aditya-soni-portfolio-xi.vercel.app";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add other routes if they become non-dynamic
  ];
}
