export const metadata = {
  title: "Simple Calculator",
  description: "Next.js + Node.js calculator demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
