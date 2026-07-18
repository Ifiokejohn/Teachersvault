"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, TABLES } from "@/lib/supabase";

const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState(CLASS_LEVELS[0]);
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Attach a PDF before publishing.");
      return;
    }

    setStatus("uploading");
    setError(null);

    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      setError("You need to be logged in to upload a note.");
      setStatus("error");
      return;
    }

    // 1. Upload the PDF to Supabase Storage (bucket: "resource-files").
    const filePath = `${authData.user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("resource-files")
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setStatus("error");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("resource-files").getPublicUrl(filePath);

    // 2. Insert the resource row — starts as unapproved until an admin
    // stamps it verified.
    const { error: insertError } = await supabase.from(TABLES.resources).insert({
      title,
      description,
      subject,
      class_level: classLevel,
      price: Number(price),
      file_url: publicUrl,
      seller_id: authData.user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setStatus("error");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-3xl mb-2">Publish a note</h1>
      <p className="text-vault-ink/60 mb-8">
        Your note is reviewed before it gets a verified stamp and appears in
        search results.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Title, e.g. SSS2 Biology — Reproduction in Plants"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="field"
        />

        <textarea
          required
          placeholder="Short description of what's covered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="field"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Subject, e.g. Biology"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="field"
          />
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="field"
          >
            {CLASS_LEVELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <input
          type="number"
          required
          min={0}
          placeholder="Price (₦)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="field"
        />

        <label className="block border border-dashed border-vault-ink/30 rounded-sm px-4 py-6 text-center cursor-pointer hover:bg-vault-sage/20 transition-colors">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {file ? (
            <span className="font-mono text-sm text-vault-green">{file.name}</span>
          ) : (
            <span className="text-sm text-vault-ink/60">Click to attach a PDF</span>
          )}
        </label>

        {error && <p className="text-vault-seal text-sm">{error}</p>}

        <button
          type="submit"
          disabled={status === "uploading"}
          className="btn-primary w-full"
        >
          {status === "uploading" ? "Publishing…" : "Publish note"}
        </button>
      </form>
    </section>
  );
}
