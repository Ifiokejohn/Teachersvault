import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-vault-green-dark text-vault-paper/80 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <span className="font-display text-lg text-vault-paper">
            Teachers<span className="text-vault-gold">Vault</span>
          </span>
          <p className="mt-3 text-sm max-w-xs">
            A marketplace for verified curriculum notes, built by teachers,
            for teachers and students across Nigeria.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="font-body font-semibold text-vault-paper mb-3">
            Marketplace
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/resources" className="hover:text-vault-gold transition-colors">
                Browse notes
              </Link>
            </li>
            <li>
              <Link href="/upload" className="hover:text-vault-gold transition-colors">
                Become a seller
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-vault-gold transition-colors">
                Create an account
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="font-body font-semibold text-vault-paper mb-3">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:hello@teachersvault.ng" className="hover:text-vault-gold transition-colors">
                hello@teachersvault.ng
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-vault-paper/10 py-4 text-center text-xs text-vault-paper/50">
        © {new Date().getFullYear()} Teachers Vault. All rights reserved.
      </div>
    </footer>
  );
}

