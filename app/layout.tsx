import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {App} from "antd";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Spraby",
  description: "Spraby",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <App>
      {children}
    </App>
    </body>
    </html>
  );
}
