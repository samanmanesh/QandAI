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
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-full `}
      >
        {children}
      </body>
    </html>
  );
}

// project-root/
// ├── app/
// │   ├── api/
// │   │   └── qa/
// │   │       ├── text/
// │   │       │   └── route.ts
// │   │       ├── pdf/
// │   │       │   └── route.ts
// │   │       └── image/
// │   │           └── route.ts
// │   ├── qa/
// │   │   ├── page.tsx
// │   │   ├── layout.tsx
// │   │   └── components/
// │   │       ├── TextInput.tsx
// │   │       ├── FileUpload.tsx
// │   │       └── QuestionForm.tsx
// │   └── layout.tsx
// ├── components/
// │   ├── ui/
// │   │   ├── Button.tsx
// │   │   ├── Input.tsx
// │   │   ├── Select.tsx
// │   │   ├── Card.tsx
// │   │   ├── Modal.tsx
// │   │   └── ...
// │   ├── layout/
// │   │   ├── Header.tsx
// │   │   ├── Footer.tsx
// │   │   ├── Sidebar.tsx
// │   │   └── ...
// │   └── common/
// │       ├── ErrorBoundary.tsx
// │       ├── LoadingSpinner.tsx
// │       ├── Tooltip.tsx
// │       └── ...
// ├── lib/
// │   ├── anthropic.ts
// │   ├── pdfParser.ts
// │   └── imageProcessor.ts
// ├── utils/
// │   ├── apiHelpers.ts
// │   └── validators.ts
// ├── hooks/
// │   ├── useQA.ts
// │   └── useMediaQuery.ts
// ├── config/
// │   └── constants.ts
// ├── types/
// │   ├── qa.ts
// │   ├── api.ts
// │   └── components.ts
// ├── styles/
// │   ├── globals.css
// │   └── variables.css
// └── tsconfig.json
