import PurchaseButton from "@/components/PurchaseButton";

// Placeholder — replace with:
// const { data: resource } = await supabase.from("resources").select("*, reviews(*)").eq("id", params.id).single();
const MOCK_RESOURCE = {
  id: "1",
  title: "SSS2 Biology — Reproduction in Plants & Animals",
  description:
    "A complete term note covering asexual and sexual reproduction in plants and animals, aligned with the NERDC curriculum. Includes diagrams, past-question style review at the end of each topic, and a printable summary sheet.",
  subject: "Biology",
  class_level: "SSS2",
  price: 1500,
  rating: 4.8,
  verified: true,
  seller_name: "Ifiok E. John",
};

const MOCK_REVIEWS = [
  { id: "1", user: "Chidinma A.", rating: 5, comment: "Very clear and well organised, exactly what my class needed." },
  { id: "2", user: "Tunde O.", rating: 4, comment: "Good note, would love more diagrams next time." },
];

export default function ResourceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const resource = MOCK_RESOURCE; // keyed by params.id once wired to Supabase

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-wide bg-vault-green text-vault-paper px-3 py-1 rounded-sm">
          {resource.class_level}
        </span>
        <span className="text-sm text-vault-ink/60">{resource.subject}</span>
        {resource.verified && (
          <span className="vault-stamp text-[9px] w-14 h-14">Verified</span>
        )}
      </div>

      <h1 className="font-display text-3xl sm:text-4xl mb-2">{resource.title}</h1>
      <p className="text-sm text-vault-ink/60 mb-8">By {resource.seller_name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl mb-3">About this note</h2>
          <p className="text-vault-ink/80 leading-relaxed">{resource.description}</p>

          <h2 className="font-display text-xl mt-10 mb-4">Reviews</h2>
          <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="ledger-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body font-semibold">{review.user}</span>
                  <span className="font-mono text-vault-gold text-sm">
                    ★ {review.rating}
                  </span>
                </div>
                <p className="text-sm text-vault-ink/70">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="ledger-card h-fit sticky top-24">
          <p className="font-mono text-2xl text-vault-green font-semibold mb-1">
            ₦{resource.price.toLocaleString()}
          </p>
          <p className="text-sm text-vault-ink/60 mb-6">
            ★ {resource.rating.toFixed(1)} rating
          </p>
          <PurchaseButton resourceId={resource.id} amount={resource.price} />
          <p className="text-xs text-vault-ink/50 mt-4">
            Instant download after payment. Secured by Paystack.
          </p>
        </aside>
      </div>
    </section>
  );
}
