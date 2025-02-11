import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Chart Movies App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        {children}
        <Toaster />
      </body>
    </html>
  );
}