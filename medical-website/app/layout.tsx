import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { clinic } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${clinic.fullName} — ${clinic.tagline}`,
  description:
    "Kardiologiya, nevrologiya, pediatriya, diaqnostika və laboratoriya xidmətləri bir ünvanda. Onlayn qeydiyyat, elektron tibbi kart və təcrübəli həkimlər.",
  openGraph: {
    title: clinic.fullName,
    description: clinic.tagline,
    locale: "az_AZ",
    type: "website",
    images: ["/frames/hero/0150.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
