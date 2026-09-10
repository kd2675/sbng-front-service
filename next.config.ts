import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  agentRules: false,
  output: "standalone",
  poweredByHeader: false,
  outputFileTracingExcludes: {
    "*": ["./data/**/*", "./.env*", "./artifacts/**/*"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        source: "/archive/articles/:path*/source.html",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "attachment" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          {
            key: "Content-Security-Policy",
            value:
              "sandbox; default-src 'none'; base-uri 'none'; form-action 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
