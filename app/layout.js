import "./globals.css";
import { VT323 } from "next/font/google";

const vt323 = VT323({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "x",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={vt323.className}>{children}</body>
    </html>
  );
}
