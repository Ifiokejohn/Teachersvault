import ResourceCard, { Resource } from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";

// Placeholder data — replace with a Supabase query built from
// searchParams (q, subject, class), e.g.:
// let query = supabase.from("resources").select("*");
// if (subject) query = query.eq("subject", subject);
const ALL_RESOURCES: Resource[] = [
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
  {
    id: "4",
    title: "SSS1 Mathematics — Indices & Logarithms",
    subject: "Mathematics",
    class_level: "SSS1",
    price: 1200,
    rating: 4.5,
    verified: true,
    cover_image_url: null,
  },
];

export default function ResourcesPage({
  searchParams,
}: {
  searchParams: { q?: string; subject?: string; class?: string };
}) {
  const { q, subject, class: classLevel } = searchParams;

  const filtered = ALL_RESOURCES.filter((r) => {
    if (subject && r.subject !== subject) return false;
    if (classLevel && r.class_level !== classLevel) return false;
    if (q && !r.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl mb-6">Browse notes</h1>

      <div className="mb-10">
        <SearchBar />
      </div>

      <p className="text-sm text-vault-ink/60 mb-6">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {filtered.length === 0 ? (
        <div className="ledger-card text-center py-12">
          <p className="font-display text-lg mb-1">No notes match yet</p>
          <p className="text-sm text-vault-ink/60">
            Try a different subject or class, or check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </section>
  );
}

