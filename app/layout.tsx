import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QandAI",
  description: "Generate questions and answers from text using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}

// The project structure is as follows:
// project-root/
// ├── app/
// │   ├── api/
// │   │   └── qa/
// │   │       ├── text/
// │   │       │   └── route.js
// │   │       ├── pdf/
// │   │       │   └── route.js
// │   │       └── image/
// │   │           └── route.js
// │   ├── qa/
// │   │   ├── page.js
// │   │   ├── layout.js
// │   │   └── components/
// │   │       ├── TextInput.js
// │   │       ├── FileUpload.js
// │   │       └── QuestionForm.js
// │   └── layout.js
// ├── lib/
// │   ├── anthropic.js
// │   ├── pdfParser.js
// │   └── imageProcessor.js
// ├── utils/
// │   ├── apiHelpers.js
// │   └── validators.js
// ├── hooks/
// │   └── useQA.js
// └── config/
//     └── constants.js
