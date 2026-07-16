import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-vault-green text-vault-paper border-b border-vault-gold/30">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-tight">
            Teachers<span className="text-vault-gold">Vault</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm">
          <Link href="/resources" className="hover:text-vault-gold transition-colors">
            Browse notes
          </Link>
          <Link href="/upload" className="hover:text-vault-gold transition-colors">
            Sell your notes
          </Link>
          <Link href="/dashboard" className="hover:text-vault-gold transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline text-sm hover:text-vault-gold transition-colors"
          >
            Log in
          </Link>
          <Link href="/register" className="btn-primary text-sm px-4 py-2">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
