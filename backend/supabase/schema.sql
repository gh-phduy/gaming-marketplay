create table if not exists public.marketplace_products (
  id text primary key,
  seller_id text references public.marketplace_users(id) on delete cascade,
  product jsonb not null,
  listing_product jsonb not null,
  popular_game jsonb,
  is_popular boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketplace_users (
  id text primary key,
  email text,
  name text not null,
  picture text,
  provider text not null default 'local',
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seller_profiles (
  id text primary key,
  route_key text not null unique,
  name text not null,
  profile jsonb not null,
  listings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketplace_products_is_popular_idx
  on public.marketplace_products (is_popular);

create index if not exists marketplace_products_seller_id_idx
  on public.marketplace_products (seller_id);

create index if not exists marketplace_users_role_idx
  on public.marketplace_users (role);

create index if not exists seller_profiles_route_key_idx
  on public.seller_profiles (route_key);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists marketplace_products_set_updated_at on public.marketplace_products;
create trigger marketplace_products_set_updated_at
before update on public.marketplace_products
for each row execute function public.set_updated_at();

drop trigger if exists marketplace_users_set_updated_at on public.marketplace_users;
create trigger marketplace_users_set_updated_at
before update on public.marketplace_users
for each row execute function public.set_updated_at();

drop trigger if exists seller_profiles_set_updated_at on public.seller_profiles;
create trigger seller_profiles_set_updated_at
before update on public.seller_profiles
for each row execute function public.set_updated_at();
