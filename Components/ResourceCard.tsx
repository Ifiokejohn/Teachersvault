import Image from "next/image";
import Link from "next/link";

export type Resource = {
  id: string;
  title: string;
  subject: string;
  class_level: string;
  price: number;
  cover_image_url?: string | null;
  rating?: number | null;
  verified?: boolean;
};

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const {
    id,
    title,
    subject,
    class_level,
    price,
    cover_image_url,
    rating,
    verified,
  } = resource;

  return (
    <Link href={`/resource/${id}`} className="block group">
      <article className="ledger-card relative overflow-hidden">
        {/* class-level tab, top-left, like a filed index card */}
        <span className="absolute -left-1 top-4 bg-vault-green text-vault-paper text-xs font-mono uppercase tracking-wide px-3 py-1 rounded-r-sm">
          {class_level}
        </span>

        <div className="relative h-36 w-full mb-4 mt-6 bg-vault-green/10 rounded-sm overflow-hidden">
          {cover_image_url ? (
            <Image
              src={cover_image_url}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-vault-green/40 font-display italic text-sm">
              No cover
            </div>
          )}

          {verified && (
            <div className="vault-stamp absolute right-2 bottom-2 bg-vault-paper/90">
              Verified
            </div>
          )}
        </div>

        <h3 className="font-display text-lg leading-snug text-vault-ink group-hover:text-vault-green transition-colors">
          {title}
        </h3>
        <p className="text-sm text-vault-ink/60 mt-1">{subject}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-vault-green font-semibold">
            {formatNaira(price)}
          </span>
          {typeof rating === "number" && (
            <span className="text-sm text-vault-gold font-mono">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
