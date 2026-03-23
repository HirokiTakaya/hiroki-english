import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiroki Takaya | English Private Lessons in Vancouver",
  description:
    "バンクーバー在住・現地就職経験を持つバイリンガル講師による、実践的な英語プライベートレッスン。対面＆オンライン対応。",
  openGraph: {
    title: "Hiroki Takaya | English Private Lessons",
    description:
      "カナダで通じる英語を、一緒に。バンクーバー在住バイリンガル講師のプライベートレッスン。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Instrument+Serif&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}