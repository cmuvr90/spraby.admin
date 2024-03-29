import type {Metadata} from "next";
import {ReactNode} from "react";
import AdminLayout from "@/theme/layouts/AdminLayout";

export const metadata: Metadata = {
  title: "Spraby Admin",
  description: "Spraby Admin",
};

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
  return <AdminLayout>
    {children}
  </AdminLayout>
}
