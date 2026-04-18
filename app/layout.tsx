import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "QualiFlow",
  description: "CAPA and NCMR SaaS starter",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
