-- Migration: Add products and orders tables
-- This migration adds the missing products and orders tables to the database

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) not null,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  stock integer default 0,
  image_url text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- Policies
create policy "Public view products"
  on products for select
  using ( true );

create policy "Sellers manage own products"
  on products for all
  using ( auth.uid() = seller_id );

-- 2. ORDERS TABLE
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  status text check (status in ('pending', 'ready', 'completed', 'cancelled')) default 'pending',
  pickup_pin text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies
create policy "Buyers view own orders"
  on orders for select
  using ( auth.uid() = buyer_id );

create policy "Sellers view orders for their products"
  on orders for select
  using (
    product_id in (select id from products where seller_id = auth.uid())
  );

create policy "Buyers can create orders"
  on orders for insert
  with check ( auth.uid() = buyer_id );
