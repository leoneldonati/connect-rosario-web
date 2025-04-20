import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@components/header";
import PreHeader from "@components/pre-header";
import ContactButton from "@components/shared/contact-button";
import PreFooter from "@components/pre-footer";
import { ToastContainer } from "react-toastify";
import { CANNONICAL_URL } from "@constants";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect Rosario - Tecnología y Accesorios",
  description:
    "Connect Rosario: Tu tienda de productos electrónicos en Rosario. Encuentra smartphones, laptops, accesorios y más con las mejores ofertas y calidad garantizada.",
  authors: [{ name: "Leonel Donati", url: "https://leodonati.site" }],
  openGraph: {
    title: "Connect Rosario - Tecnología y Accesorios",
    description:
      "Descubre en Connect Rosario los mejores productos electrónicos: smartphones, laptops, accesorios y más con ofertas exclusivas en Rosario.",
    url: CANNONICAL_URL,
    siteName: "Connect Rosario",
    images: [
      {
        url: `${CANNONICAL_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Productos electrónicos de Connect Rosario",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Rosario - Tecnología y Accesorios",
    description:
      "Descubre en Connect Rosario los mejores productos electrónicos: smartphones, laptops, accesorios y más con ofertas exclusivas en Rosario.",
    images: [`${CANNONICAL_URL}/images/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex flex-col min-h-screen max-w-6xl mx-auto`}
      >
        <Header />
        <PreHeader />
        <main className="overflow-hidden max-w-3xl w-full mx-auto flex flex-col flex-grow px-2">
          {children}
        </main>

        <ContactButton />

        <PreFooter />

        {/* NOTIFICATIONS */}
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
