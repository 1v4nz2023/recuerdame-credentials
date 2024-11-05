import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Recuerdame",
  description: "Recuerdame, tu app de recetas médicas",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
            <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Navbar/>
                {children}
        <Footer/>

      </body>
    </html>
  );
}
