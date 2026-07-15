"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PurchaseButton({
  resourceId,
  amount,
}: {
  resourceId: string;
  amount: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    setLoading(true);
    setError(null);

    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      setError("Log in to purchase this note.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resourceId,
        amount,
        email: authData.user.email,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data.authorization_url) {
      setError(data.error ?? "Could not start checkout. Try again.");
      return;
    }

    window.location.href = data.authorization_url;
  }

  return (
    <div>
      <button onClick={handlePurchase} disabled={loading} className="btn-primary w-full">
        {loading ? "Starting checkout…" : "Buy this note"}
      </button>
      {error && <p className="text-vault-seal text-sm mt-2">{error}</p>}
    </div>
  );
}
