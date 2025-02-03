import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex-TCG",
  description: "포켓몬 카드게임 도감",
  icons: {
    icon: 'https://numi8462.github.io/pokemon-tcg/icons/pokemon.png'
  },
  openGraph: {
    title: "Pokedex-TCG",
    description: "포켓몬 카드게임 도감",
    images: [
        {
            url: "https://numi8462.github.io/pokemon-tcg/cover/preview.png",
            width: 1898,
            height: 910,
            alt: "Pokedex-TCG 미리보기 이미지",
        },
    ],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
