import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {App, ConfigProvider} from "antd";
import {ReactNode} from "react";
import MainLayout from "@/theme/layouts/MainLayout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Spraby",
  description: "Spraby",
};

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <App>
      <ConfigProvider theme={{
        components: {
          Layout: {
            headerBg: '#00213f'
          },
          Menu: {
            darkItemSelectedBg: 'rgba(255,255,255,0.16)'
          }
        }
      }}>
        <MainLayout>
          {children}
        </MainLayout>
      </ConfigProvider>
    </App>
    </body>
    </html>
  );
}
