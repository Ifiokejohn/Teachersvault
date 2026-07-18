"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-display text-3xl mb-2">Welcome back</h1>
      <p className="text-vault-ink/60 mb-8">Log in to your Teachers Vault account.</p>

      <button
        onClick={handleGoogleLogin}
        className="w-full border border-vault-ink/20 rounded-sm px-4 py-3 font-body font-medium hover:bg-vault-sage/40 transition-colors mb-6"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-vault-ink/40 text-xs uppercase tracking-wide mb-6">
        <span className="flex-1 border-t border-vault-ink/10" />
        or
        <span className="flex-1 border-t border-vault-ink/10" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field"
        />

        {error && <p className="text-vault-seal text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-8 text-sm text-vault-ink/60">
        New here?{" "}
        <Link href="/register" className="text-vault-green underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </section>
  );
}
