import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mármol y Metal S. de R.L.",
  description:
    "Especialistas en lápidas, placas conmemorativas y memoriales digitales con código QR.",
  icons: {
    icon: "/logo-mm.ico",
    shortcut: "/logo-mm.ico",
    apple: "/logo-mm.ico",
  },
  openGraph: {
    title: "Mármol y Metal S. de R.L.",
    description: "Especialistas en lápidas, placas conmemorativas y memoriales digitales con código QR.",
    url: "https://www.marmolymetal.com",
    siteName: "Mármol y Metal",
    images: [
      {
        url: "/logo-mm.ico",
        width: 800,
        height: 800,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}