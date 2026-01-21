import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Passaporte do Leitor - Transformar a Leitura numa Aventura",
  description: "O Passaporte do Leitor motiva crianças dos 6 aos 12 anos a desenvolver o hábito da leitura através de streaks, metas diárias e acompanhamento familiar. 100% gratuito!",
  keywords: "leitura, crianças, hábito de leitura, gamificação, educação, livros, portugal, streaks, metas de leitura, leitura infantil",
  authors: [{ name: "Passaporte do Leitor" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://vamosler.pt/",
    title: "Passaporte do Leitor - Transformar a Leitura numa Aventura",
    description: "O Passaporte do Leitor motiva crianças dos 6 aos 12 anos a desenvolver o hábito da leitura através de streaks, metas diárias e acompanhamento familiar.",
    images: [{ url: "https://vamosler.pt/og-image.png" }],
    siteName: "Passaporte do Leitor",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passaporte do Leitor - Transformar a Leitura numa Aventura",
    description: "Motiva crianças dos 6 aos 12 anos a desenvolver o hábito da leitura através de streaks e metas diárias.",
    images: ["https://vamosler.pt/og-image.png"],
  },
  alternates: {
    canonical: "https://vamosler.pt/",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <head>
        <meta name="theme-color" content="#E67E22" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
