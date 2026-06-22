import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trajano e Ferro Advogados | Advocacia Estratégica e Consultiva",
  description: "Atuação jurídica de excelência nas áreas trabalhista, civil e processo ético disciplinar. Atendimento personalizado, ética e compromisso com os seus direitos.",
  keywords: [
    "Trajano e Ferro",
    "Trajano e Ferro Advogados",
    "Advogado Trabalhista",
    "Direito do Trabalho",
    "Direito Civil",
    "Processo Ético Disciplinar",
    "Defesa do Empregado",
    "Advocacia Estratégica",
    "São Paulo",
    "Escritório de Advocacia Premium"
  ],
  authors: [{ name: "Trajano e Ferro Advogados" }],
  openGraph: {
    title: "Trajano e Ferro Advogados | Advocacia Estratégica",
    description: "Atuação de excelência nas áreas trabalhista, civil e processo ético disciplinar com atendimento personalizado e foco em soluções eficientes.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060b13] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}

