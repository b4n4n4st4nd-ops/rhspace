import Link from "next/link";
import { Container } from "@/components/layout/SiteChrome";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-accent hover:underline"
      >
        Back to home
      </Link>
    </Container>
  );
}
