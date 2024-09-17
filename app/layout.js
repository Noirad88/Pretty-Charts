import localFont from "next/font/local";
import "./globals.css";

const sora = localFont({
  src: "./fonts/Sora-VariableFont_wght.ttf",
  variable: "--font-primary",
  weight: "100 200 300 400 500 600 700 800",
});
const openSans = localFont({
  src: "./fonts/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-secondary",
  weight: "300 400 500 600 700 800",
});

export const metadata = {
  title: "Playground",
  description: "Just a page for tinkering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
