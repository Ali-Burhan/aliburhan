'use client'
import React, { Suspense } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/home/navbar";
import Footer from "./components/footer/footer";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <title>Burhan</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <Suspense fallback={<div>Loading....</div>}>
        <ProgressBar
          color="red"
          shallowRouting
          height="4px"
          options={{ showSpinner: false }}
        />
    </Suspense>
  <Navbar/>
        {children}
  <Footer/>
        </body>
    </html>
  );
}
