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
  title: "Pretty Charts",
  description: "By Darion McCoy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${openSans.variable} antialiased w-full`}
      >
        {children}
      </body>
    </html>
  );
}
