import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RefreeG-Platform",
  description: "A Hybrid Crowdfunding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-6133323682562865" />

        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6133323682562865"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={`${montserrat.className} bg-white text-black`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
