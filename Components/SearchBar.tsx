"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];
const SUBJECTS = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [subject, setSubject] = useState(searchParams.get("subject") ?? "");
  const [classLevel, setClassLevel] = useState(searchParams.get("class") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (subject) params.set("subject", subject);
    if (classLevel) params.set("class", classLevel);
    router.push(`/resources?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 bg-vault-paper rounded-sm p-3 shadow-lg"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes, e.g. SSS2 Biology"
        className="field flex-1"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="field sm:w-44"
      >
        <option value="">All subjects</option>
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        className="field sm:w-36"
      >
        <option value="">All classes</option>
        {CLASS_LEVELS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button type="submit" className="btn-primary whitespace-nowrap">
        Search
      </button>
    </form>
  );
}
