import localFont from "next/font/local";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import './globals.css'
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  title: "SmartAsana",
  description: "Elevate Your Yoga Journey with Smart Technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-roboto min-h-screen`}
      >
        <Navbar />
        <ToastContainer position="top-center" className="custom-toast-container"/>
        {children}
        <Footer />
      </body>
    </html>
  );
}


