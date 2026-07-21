import { Suspense } from "react";
import Link from "next/link";
import ResourceCard, { Resource } from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";

const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];
const SUBJECTS = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];

// Placeholder data — replace with a Supabase query once the resources
// table is seeded, e.g. supabase.from("resources").select("*").limit(6)
const FEATURED_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "SSS2 Biology — Reproduction in Plants & Animals",
    subject: "Biology",
    class_level: "SSS2",
    price: 1500,
    rating: 4.8,
    verified: true,
    cover_image_url: null,
  },
  {
    id: "2",
    title: "JSS3 Basic Science — Full Term Note",
    subject: "Basic Science",
    class_level: "JSS3",
    price: 1000,
    rating: 4.6,
    verified: true,
    cover_image_url: null,
  },
  {
    id: "3",
    title: "SSS3 Chemistry — Organic Chemistry Revision Pack",
    subject: "Chemistry",
    class_level: "SSS3",
    price: 2000,
    rating: 4.9,
    verified: false,
    cover_image_url: null,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-vault-green text-vault-paper overflow-hidden">
        <div
          className="absolute inset-0 bg-paper-grain bg-grain opacity-[0.08] pointer-events-none"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-mono text-vault-gold text-xs uppercase tracking-[0.2em] mb-4">
            Verified curriculum notes · Nigeria
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl">
            Buy and sell educational resources across Nigeria
          </h1>
          <p className="mt-6 max-w-xl text-vault-paper/80 text-lg">
            Teachers publish verified lesson notes and past questions.
            Students find exactly what they need by class and subject —
            no more sifting through group-chat PDFs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/resources" className="btn-primary">
              Browse notes
            </Link>
            <Link href="/upload" className="btn-secondary">
              Become a seller
            </Link>
          </div>

          <div className="mt-12 max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl mb-6">Browse by class</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CLASS_LEVELS.map((level) => (
            <Link
              key={level}
              href={`/resources?class=${level}`}
              className="ledger-card text-center font-mono text-vault-green font-semibold hover:bg-vault-sage/70"
            >
              {level}
            </Link>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-6xl px-6 py-4 pb-16">
        <h2 className="font-display text-2xl mb-6">Popular subjects</h2>
        <div className="flex flex-wrap gap-3">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject}
              href={`/resources?subject=${subject}`}
              className="border border-vault-green/20 rounded-full px-5 py-2 text-sm font-body text-vault-green hover:bg-vault-green hover:text-vault-paper transition-colors"
            >
              {subject}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured resources */}
      <section className="mx-auto max-w-6xl px-6 py-4 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Featured resources</h2>
          <Link
            href="/resources"
            className="text-sm text-vault-green hover:text-vault-gold font-body underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_RESOURCES.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </>
  );
}

