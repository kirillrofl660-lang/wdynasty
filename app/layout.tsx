// Root layout - must not render <html> for Payload admin compatibility
// Site uses (site)/layout.tsx, Admin uses (payload)/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Just pass through - actual layouts handle html/body
  return children
}
