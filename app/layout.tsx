import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import PreHeader from "../components/pre-header";
import ContactButton from "../components/shared/contact-button";
import PreFooter from "../components/pre-footer";
import { ToastContainer } from "react-toastify";
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
  description: "",
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
