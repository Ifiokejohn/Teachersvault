"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Mirror the profile into the public `users` table.
    if (data.user) {
      await supabase.from("users").insert({
        id: data.user.id,
        name,
        email,
        role,
      });
    }

    setLoading(false);
    router.push("/dashboard");
  }

  async function handleGoogleRegister() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-display text-3xl mb-2">Create your account</h1>
      <p className="text-vault-ink/60 mb-8">
        Join as a teacher to sell your notes, or a student to browse and buy.
      </p>

      <button
        onClick={handleGoogleRegister}
        className="w-full border border-vault-ink/20 rounded-sm px-4 py-3 font-body font-medium hover:bg-vault-sage/40 transition-colors mb-6"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-vault-ink/40 text-xs uppercase tracking-wide mb-6">
        <span className="flex-1 border-t border-vault-ink/10" />
        or
        <span className="flex-1 border-t border-vault-ink/10" />
      </div>

      <form onSubmit={handleEmailRegister} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
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
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field"
        />

        <div className="flex gap-3">
          {(["student", "teacher"] as const).map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 border rounded-sm px-4 py-3 font-body text-sm capitalize transition-colors ${
                role === r
                  ? "border-vault-green bg-vault-sage/50 text-vault-green font-semibold"
                  : "border-vault-ink/20 text-vault-ink/60"
              }`}
            >
              I'm a {r}
            </button>
          ))}
        </div>

        {error && <p className="text-vault-seal text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-sm text-vault-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="text-vault-green underline underline-offset-4">
          Log in
        </Link>
      </p>
    </section>
  );
}
