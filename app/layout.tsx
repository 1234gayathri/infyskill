import type { Metadata } from "next";
import "./styles.css";
import Script from "next/script";
import ChatbotWidget from "../components/ChatbotWidget";

export const metadata: Metadata = {
  title: "InfySkill - Learn. Grow. Get Hired.",
  description: "Master in-demand skills with industry experts and kickstart your career",
  icons: {
    icon: '/images/logoone.png',
    shortcut: '/images/logoone.png',
    apple: '/images/logoone.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ChatbotWidget />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}