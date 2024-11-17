import localFont from "next/font/local";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import './globals.css'

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-roboto`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
