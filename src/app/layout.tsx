import type { Metadata } from "next";
import "@/config/globals.css";
import { ThemeProvider } from "@/layouts/provider";
import { ThemeHeader } from "@/components/common/header";

export const metadata: Metadata = {
  metadataBase: new URL("https://tansanlog.vercel.app"),
  title: "Min Jiyeon | Frontend Developer",
  description:
    "사용자 경험과 구현 품질을 함께 고민하는 프론트엔드 개발자 Min Jiyeon의 포트폴리오입니다.",
  openGraph: {
    title: "Min Jiyeon | Frontend Developer",
    description:
      "사용자 경험과 구현 품질을 함께 고민하는 프론트엔드 개발자 포트폴리오입니다.",
    type: "website",
    url: "https://tansanlog.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full scroll-my-20 scroll-smooth'
      suppressHydrationWarning
    >
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta property='og:title' content='Min Jiyeon | Frontend Developer' />
        <meta
          property='og:description'
          content='사용자 경험과 구현 품질을 함께 고민하는 프론트엔드 개발자 포트폴리오입니다.'
        />
        {/* <meta property="og:image" content="" /> */}
        {/* <meta property="og:url" content="/" /> */}
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className='font-pretendard flex min-h-screen flex-col'>
        <ThemeProvider>
          <ThemeHeader />
          <main className='flex flex-1 flex-col py-14'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
