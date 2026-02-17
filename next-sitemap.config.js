/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://inb2blatam.com/',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: ['/api'] },  // Bloquea /api y subrutas
      ],
    },
    changefreq: 'weekly',
    priority: 0.7,
  };
  