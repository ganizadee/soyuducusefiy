import type { NextConfig } from "next";

// STATIC_EXPORT=1 olduqda sayt statik fayllara (out/ qovluğu) çevrilir —
// Netlify Drop və ya istənilən statik hostinq üçün.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_STATIC_EXPORT: "1" },
    }
  : {
      async headers() {
        return [
          {
            // Kadrlar dəyişmir — brauzer uzun müddət keşdə saxlaya bilər.
            source: "/frames/:path*",
            headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
          },
        ];
      },
    };

export default nextConfig;
