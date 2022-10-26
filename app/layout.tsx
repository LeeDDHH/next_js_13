import NavBar from '../components/navBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
