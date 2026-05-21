import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta Kids",
  description:
    "Plataforma de inclusao digital infantil para aprender tecnologia com seguranca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
