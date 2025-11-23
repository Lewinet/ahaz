-- Enable PostGIS for location features
create extension if not exists postgis;

-- 1. PROFILES
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text check (role in ('user', 'admin')) default 'user',
  kyc_status text check (kyc_status in ('pending', 'verified', 'rejected')) default 'pending',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. WALLETS
create table public.wallets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  balance numeric(12, 2) default 0.00 check (balance >= 0),
  currency text default 'USD',
  created_at timestamptz default now(),
  unique(user_id)
);

alter table public.wallets enable row level security;

create policy "Users can view own wallet."
  on wallets for select
  using ( auth.uid() = user_id );

-- No update policy for wallets - only via RPC

-- 3. TRANSACTIONS
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  sender_wallet_id uuid references public.wallets(id),
  receiver_wallet_id uuid references public.wallets(id),
  amount numeric(12, 2) not null check (amount > 0),
  type text check (type in ('deposit', 'transfer', 'payment', 'release', 'fee')),
  reference_id uuid, -- Can link to rides or orders
  created_at timestamptz default now()
);

alter table public.transactions enable row level security;

create policy "Users can view transactions involving their wallet."
  on transactions for select
  using (
    sender_wallet_id in (select id from wallets where user_id = auth.uid()) or
    receiver_wallet_id in (select id from wallets where user_id = auth.uid())
  );

-- 4. DRIVER PROFILES
create table public.driver_profiles (
  user_id uuid references public.profiles(id) primary key,
  is_online boolean default false,
  current_location geography(Point, 4326),
  vehicle_type text,
  updated_at timestamptz default now()
);

alter table public.driver_profiles enable row level security;

create policy "Public view of online drivers"
  on driver_profiles for select
  using ( is_online = true );

create policy "Drivers can update own profile"
  on driver_profiles for update
  using ( auth.uid() = user_id );

create policy "Drivers can insert own profile"
  on driver_profiles for insert
  with check ( auth.uid() = user_id );

-- 5. RIDES
create table public.rides (
  id uuid default gen_random_uuid() primary key,
  passenger_id uuid references public.profiles(id) not null,
  driver_id uuid references public.profiles(id),
  status text check (status in ('requested', 'matching', 'accepted', 'arrived', 'in_progress', 'completed', 'cancelled')) default 'requested',
  origin_lat float not null,
  origin_lng float not null,
  dest_lat float not null,
  dest_lng float not null,
  fare_total numeric(10, 2),
  created_at timestamptz default now()
);

alter table public.rides enable row level security;

create policy "Passengers can view own rides"
  on rides for select
  using ( auth.uid() = passenger_id );

create policy "Drivers can view requested rides or their own"
  on rides for select
  using (
    (status = 'requested') or
    (driver_id = auth.uid())
  );

create policy "Passengers can create rides"
  on rides for insert
  with check ( auth.uid() = passenger_id );

create policy "Drivers can update assigned rides"
  on rides for update
  using ( driver_id = auth.uid() );

-- 6. PRODUCTS & ORDERS (Basic Commerce)
create table public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) not null,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  stock integer default 0,
  image_url text,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Public view products"
  on products for select
  using ( true );

create policy "Sellers manage own products"
  on products for all
  using ( auth.uid() = seller_id );

create table public.orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  status text check (status in ('pending', 'ready', 'completed', 'cancelled')) default 'pending',
  pickup_pin text, -- Simple 4 digit pin
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Buyers view own orders"
  on orders for select
  using ( auth.uid() = buyer_id );

create policy "Sellers view orders for their products"
  on orders for select
  using (
    product_id in (select id from products where seller_id = auth.uid())
  );

-- FUNCTIONS & TRIGGERS

-- Trigger to create profile and wallet on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.wallets (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RPC: Transfer Funds
create or replace function transfer_funds(
  recipient_id uuid,
  amount numeric
) returns void as $$
declare
  sender_wallet uuid;
  recipient_wallet uuid;
begin
  -- Get sender wallet
  select id into sender_wallet from wallets where user_id = auth.uid();
  if not found then raise exception 'Sender wallet not found'; end if;

  -- Get recipient wallet
  select id into recipient_wallet from wallets where user_id = recipient_id;
  if not found then raise exception 'Recipient wallet not found'; end if;

  -- Check balance
  if (select balance from wallets where id = sender_wallet) < amount then
    raise exception 'Insufficient funds';
  end if;

  -- Update balances
  update wallets set balance = balance - amount where id = sender_wallet;
  update wallets set balance = balance + amount where id = recipient_wallet;

  -- Record transaction
  insert into transactions (sender_wallet_id, receiver_wallet_id, amount, type)
  values (sender_wallet, recipient_wallet, amount, 'transfer');
end;
$$ language plpgsql security definer;
