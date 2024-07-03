/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:true
    },
    images:{
        domains:["localhost","img.clerk.com"]
    }
};

export default nextConfig;
