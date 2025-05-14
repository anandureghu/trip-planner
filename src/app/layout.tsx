import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Trip Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${openSans.className} ${montserrat.variable} ${montserrat.className} ${poppins.variable} ${poppins.className} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
