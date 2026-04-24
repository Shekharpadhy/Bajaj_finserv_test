import "./globals.css";

export const metadata = {
  title: "BFHL — Node Hierarchy Analyser",
  description: "SRM Full Stack Engineering Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
