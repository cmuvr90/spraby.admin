import type {Metadata} from "next";
import {ReactNode} from "react";
import ManagerLayout from "@/theme/layouts/ManagerLayout";

export const metadata: Metadata = {
  title: "Spraby Manager",
  description: "Spraby Manager",
};

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
  return <ManagerLayout>
    {children}
  </ManagerLayout>
}
