-- Teachers Vault — core schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "uuid-ossp";

-- Users -----------------------------------------------------------------
-- Mirrors auth.users with app-specific profile fields (name, role).
create table if not exists users (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  created_at timestamptz not null default now()
);

-- Resources ---------------------------------------------------------------
create table if not exists resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  subject text not null,
  class_level text not null check (
    class_level in ('JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3')
  ),
  price integer not null check (price >= 0), -- stored in naira
  file_url text not null,
  cover_image_url text,
  seller_id uuid not null references users (id) on delete cascade,
  approved boolean not null default false, -- admin sets true to "stamp" it verified
  created_at timestamptz not null default now()
);

-- Purchases ---------------------------------------------------------------
create table if not exists purchases (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid references users (id) on delete set null,
  resource_id uuid not null references resources (id) on delete cascade,
  amount integer not null,
  payment_status text not null default 'pending' check (
    payment_status in ('pending', 'paid', 'failed')
  ),
  reference text unique, -- Paystack transaction reference
  created_at timestamptz not null default now()
);

-- Reviews -------------------------------------------------------------------
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  resource_id uuid not null references resources (id) on delete cascade,
  user_id uuid not null references users (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (resource_id, user_id) -- one review per buyer per resource
);

-- Row Level Security ---------------------------------------------------------
alter table users enable row level security;
alter table resources enable row level security;
alter table purchases enable row level security;
alter table reviews enable row level security;

-- Anyone can read approved resources; only the seller can read their own unapproved ones.
create policy "Public can read approved resources" on resources
  for select using (approved = true or auth.uid() = seller_id);

create policy "Teachers can insert their own resources" on resources
  for insert with check (auth.uid() = seller_id);

create policy "Sellers can update their own resources" on resources
  for update using (auth.uid() = seller_id);

-- Users can read and update only their own profile row.
create policy "Users can read own profile" on users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on users
  for update using (auth.uid() = id);

-- Buyers can read their own purchases.
create policy "Buyers can read own purchases" on purchases
  for select using (auth.uid() = buyer_id);

-- Anyone can read reviews; only the buyer who purchased can write one.
create policy "Public can read reviews" on reviews
  for select using (true);

create policy "Buyers can write their own review" on reviews
  for insert with check (auth.uid() = user_id);
