import type { Metadata } from "next";
import "./globals.css";



export const metadata = {
  title: "ምዕናም",
  description: "A private space for your reflections.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className=""
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
