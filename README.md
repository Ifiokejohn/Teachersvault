# Teachers Vault

Buy and sell educational resources across Nigeria. Teachers publish verified
lesson notes and past questions; students search by class and subject and
pay with Paystack.

## Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes (`app/api/**`)
- **Database & Auth:** Supabase (Postgres + Supabase Auth — Google & email)
- **Payments:** Paystack

## Project structure

```
teachers-vault/
├── app/
│   ├── page.tsx              # homepage
│   ├── login/                # email + Google login
│   ├── register/             # signup, role select (student/teacher)
│   ├── dashboard/             # role-aware: earnings, uploads, purchases, admin
│   ├── upload/                # teacher: publish a note (PDF + price)
│   ├── resources/             # browse + filter
│   ├── resource/[id]/         # detail page + purchase
│   └── api/paystack/          # initialize + webhook routes
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ResourceCard.tsx
│   ├── SearchBar.tsx
│   └── PurchaseButton.tsx
├── lib/
│   ├── supabase.ts            # browser client
│   └── supabaseAdmin.ts       # server-only client (service role)
├── database/
│   └── schema.sql             # tables + row level security policies
└── .env.example
```

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy the env template and fill in your real keys:
   ```
   cp .env.example .env.local
   ```
3. Run the dev server:
   ```
   npm run dev
   ```

## Supabase setup

1. Create a project at supabase.com.
2. Open **SQL Editor** and run `database/schema.sql` — this creates the
   `users`, `resources`, `purchases`, and `reviews` tables plus row level
   security policies.
3. Create a storage bucket named `resource-files` (used by the upload page)
   and set it to public, or add a signed-URL policy if you want downloads
   gated behind purchase confirmation.
4. Under **Authentication > Providers**, enable **Email** and **Google**.
   For Google, add your OAuth client ID/secret from the Google Cloud Console.
5. Copy your **Project URL**, **anon public key**, and **service role key**
   into `.env.local`.

## Paystack setup

1. Create a Paystack account and grab your **test** public/secret keys from
   **Settings > API Keys & Webhooks**.
2. Add a webhook pointing to `https://YOUR-DOMAIN/api/paystack/webhook` —
   this is what flips a purchase from `pending` to `paid`.
3. Swap in your **live** keys once you're ready to accept real payments.

## Deploying

1. Create a GitHub account (if you don't have one) and push this project to
   a new repository.
2. Create a Vercel account and click **Import Project**, pointing it at
   your GitHub repo.
3. In Vercel's project settings, add every variable from `.env.example`
   under **Environment Variables**.
4. Deploy. Vercel will give you a live URL — add that as
   `NEXT_PUBLIC_SITE_URL` and redeploy so Paystack callback URLs resolve
   correctly.
5. Update your Paystack webhook and Google OAuth redirect URIs to use the
   live Vercel URL.

## MVP feature map

| Role     | Can do |
|----------|--------|
| Teacher  | Register, upload PDFs, set prices, view earnings |
| Student  | Browse notes, search by subject/class, purchase, download purchased files |
| Admin    | Approve uploads (stamp verified), manage users, view sales |

## Notes on this scaffold

- Data on the homepage, resources list, and resource detail page is
  currently placeholder/mock data marked with comments — swap in real
  Supabase queries once your tables are seeded.
- `lib/supabaseAdmin.ts` uses the service role key and must only be
  imported from server code (`app/api/**`), never from a client component.
- The "Verified" seal only appears on resources where `approved = true` —
  wire that toggle into an admin approval screen when you build it out.
