/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'www.etap-fe.vercel.app',
                port: '',
                pathname:"/**"
            },
            {
                protocol: 'https',
                hostname: 'www.etap-fe.vercel.app',
                port: '',
                pathname:"/**"
            },
            {
                protocol: 'https',
                hostname: 'www.etap-fe.vercel.app',
                port: '',
                pathname: '/wp-content/uploads/**'
            }
        ]
    }
};

export default nextConfig;
