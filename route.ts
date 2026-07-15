import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key is not configured." },
      { status: 500 }
    );
  }

  const { resourceId, amount, email } = await req.json();

  if (!resourceId || !amount || !email) {
    return NextResponse.json(
      { error: "resourceId, amount, and email are required." },
      { status: 400 }
    );
  }

  // Paystack expects the amount in kobo.
  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100,
      metadata: { resourceId },
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/resource/${resourceId}`,
    }),
  });

  const paystackData = await paystackRes.json();

  if (!paystackRes.ok || !paystackData.status) {
    return NextResponse.json(
      { error: paystackData.message ?? "Paystack initialization failed." },
      { status: 502 }
    );
  }

  // Record a pending purchase row keyed on the Paystack reference so the
  // webhook can flip it to "paid" once payment is confirmed.
  await supabaseAdmin.from("purchases").insert({
    resource_id: resourceId,
    amount,
    payment_status: "pending",
    reference: paystackData.data.reference,
  });

  return NextResponse.json({
    authorization_url: paystackData.data.authorization_url,
    reference: paystackData.data.reference,
  });
}
