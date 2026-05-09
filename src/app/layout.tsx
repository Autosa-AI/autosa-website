import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autosa | AI-Powered Solutions",
  description: "Autosa delivers next-generation AI solutions through Nova, Solvo, and Yard.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/blanka"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Open Sans', system-ui, -apple-system, sans-serif", background: "#000000" }}>
        {children}
      </body>
    </html>
  );
}
