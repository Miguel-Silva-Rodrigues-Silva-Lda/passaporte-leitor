import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vamos Ler - Leitura Gamificada para Crianças dos 6 aos 12 Anos",
  description: "Cria o hábito de leitura sem stress! O Vamos Ler motiva crianças com streaks, metas diárias e o Passaporte do Leitor. Gratuito para famílias e escolas.",
  keywords: "leitura, crianças, hábito de leitura, gamificação, educação, livros, portugal, streaks, metas de leitura, leitura infantil, vamos ler",
  authors: [{ name: "Vamos Ler" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://vamosler.pt/",
    title: "Vamos Ler - Leitura Gamificada para Crianças dos 6 aos 12 Anos",
    description: "Cria o hábito de leitura sem stress! O Vamos Ler motiva crianças com streaks, metas diárias e o Passaporte do Leitor. Gratuito para famílias e escolas.",
    images: [{ url: "https://vamosler.pt/og-image.png" }],
    siteName: "Vamos Ler",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vamos Ler - Leitura Gamificada para Crianças dos 6 aos 12 Anos",
    description: "Cria o hábito de leitura sem stress! O Vamos Ler motiva crianças com streaks, metas diárias e o Passaporte do Leitor.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F1D76F2SL2"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F1D76F2SL2');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
