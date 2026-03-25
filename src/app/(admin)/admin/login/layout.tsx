export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page renders without the admin sidebar/topbar shell
  return <>{children}</>;
}
