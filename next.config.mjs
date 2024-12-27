// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['encrypted-tbn0.gstatic.com', 'res.cloudinary.com'],
//       },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;

