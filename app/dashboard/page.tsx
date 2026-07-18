"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
};

// Placeholder rows — replace with real Supabase queries scoped to the
// logged-in user, e.g. supabase.from("resources").select("*").eq("seller_id", user.id)
const MOCK_UPLOADS = [
  { id: "1", title: "SSS2 Biology — Reproduction Note", price: 1500, sales: 34 },
  { id: "2", title: "JSS3 Basic Science — Term 2", price: 1000, sales: 21 },
];

const MOCK_PURCHASES = [
  { id: "1", title: "SSS3 Chemistry — Organic Revision Pack", purchased_at: "2026-06-02" },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("users")
        .select("id, name, email, role")
        .eq("id", authData.user.id)
        .single();

      setProfile(data as Profile);
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) {
    return <p className="mx-auto max-w-6xl px-6 py-20">Loading your dashboard…</p>;
  }

  if (!profile) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="font-display text-2xl mb-4">You're not logged in</h1>
        <Link href="/login" className="btn-primary">
          Log in
        </Link>
      </section>
    );
  }

  const totalEarnings = MOCK_UPLOADS.reduce(
    (sum, r) => sum + r.price * r.sales,
    0
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl mb-1">Welcome back, {profile.name}</h1>
      <p className="text-vault-ink/60 mb-10 capitalize">{profile.role} account</p>

      {profile.role === "teacher" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="ledger-card">
              <p className="text-xs uppercase tracking-wide text-vault-ink/50 mb-2">
                Total earnings
              </p>
              <p className="font-mono text-2xl text-vault-green">
                ₦{totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="ledger-card">
              <p className="text-xs uppercase tracking-wide text-vault-ink/50 mb-2">
                Notes uploaded
              </p>
              <p className="font-mono text-2xl text-vault-green">
                {MOCK_UPLOADS.length}
              </p>
            </div>
            <div className="ledger-card">
              <p className="text-xs uppercase tracking-wide text-vault-ink/50 mb-2">
                Total sales
              </p>
              <p className="font-mono text-2xl text-vault-green">
                {MOCK_UPLOADS.reduce((s, r) => s + r.sales, 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Your uploads</h2>
            <Link href="/upload" className="btn-primary text-sm px-4 py-2">
              Upload new note
            </Link>
          </div>
          <div className="border border-vault-ink/10 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-vault-sage/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-body font-semibold">Title</th>
                  <th className="px-4 py-3 font-body font-semibold">Price</th>
                  <th className="px-4 py-3 font-body font-semibold">Sales</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_UPLOADS.map((r) => (
                  <tr key={r.id} className="border-t border-vault-ink/10">
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3 font-mono">₦{r.price.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono">{r.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {profile.role === "student" && (
        <>
          <h2 className="font-display text-xl mb-4">Your purchases</h2>
          <div className="border border-vault-ink/10 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-vault-sage/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-body font-semibold">Title</th>
                  <th className="px-4 py-3 font-body font-semibold">Purchased</th>
                  <th className="px-4 py-3 font-body font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PURCHASES.map((p) => (
                  <tr key={p.id} className="border-t border-vault-ink/10">
                    <td className="px-4 py-3">{p.title}</td>
                    <td className="px-4 py-3 font-mono">{p.purchased_at}</td>
                    <td className="px-4 py-3">
                      <button className="text-vault-green underline underline-offset-4">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {profile.role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard" className="ledger-card">
            <h3 className="font-display text-lg mb-1">Approve uploads</h3>
            <p className="text-sm text-vault-ink/60">Review notes awaiting a verification stamp.</p>
          </Link>
          <Link href="/dashboard" className="ledger-card">
            <h3 className="font-display text-lg mb-1">Manage users</h3>
            <p className="text-sm text-vault-ink/60">Suspend, verify, or edit user roles.</p>
          </Link>
          <Link href="/dashboard" className="ledger-card">
            <h3 className="font-display text-lg mb-1">View sales</h3>
            <p className="text-sm text-vault-ink/60">Platform-wide revenue and transaction log.</p>
          </Link>
        </div>
      )}
    </section>
  );
}
