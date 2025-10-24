import "./styles.css";
export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <h1>Notes Simple</h1>
        {children}
      </body>
    </html>
  );
}
