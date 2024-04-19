/** @type {import('next').NextConfig} */
const nextConfig = {
   poweredByHeader: false,
   devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
   },
   logging: {
      fetches: {
         fullUrl: true,
      },
   },
   experimental: {
      typedRoutes: true,
   },
   webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
   },
};

module.exports = nextConfig;
