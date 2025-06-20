import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { cx, getHtmlHeadElements } from "./utils";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Valentyn Domanskyi",
    template: "%s | Valentyn Domanskyi",
  },
  description: "software engineer, learner and adventurer.",
  openGraph: {
    title: "Valentyn Domanskyi",
    description: "software engineer, learner and adventurer",
    url: baseUrl,
    siteName: "Valentyn Domanskyi",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headElements = getHtmlHeadElements();

  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      {headElements.map((element, index) => (
        <element.tag key={index} {...element.attributes} />
      ))}
      <body className="w-full h-full">
        <main className="flex flex-col min-h-screen justify-between ">
          <div className="antialiased w-full max-w-xl mx-4 mt-8 lg:mx-auto">
            <div className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Navbar />
              {children}
            </div>
          </div>

          <Footer />

          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
