import { type ReactNode } from "react";
import "../styles.css";

export const metadata = {
  title: "Dr. Barkot Ali - Child Specialist Khulna",
  description: "Professor Dr. Md. Barkot Ali – Leading Child & Adolescent Health Specialist in Khulna, Bangladesh.",
  author: "Dr. Md. Barkot Ali",
  openGraph: {
    type: "website",
    title: "Dr. Barkot Ali - Child Specialist Khulna",
    description: "Professor Dr. Md. Barkot Ali – Leading Child & Adolescent Health Specialist in Khulna, Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Barkot Ali - Child Specialist Khulna",
    description: "Professor Dr. Md. Barkot Ali – Leading Child & Adolescent Health Specialist in Khulna, Bangladesh.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
