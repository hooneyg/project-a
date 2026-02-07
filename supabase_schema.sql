-- 1. Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),

  primary key (id)
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create policies
-- Public profiles are viewable by everyone
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

-- Users can insert their own profile
create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

-- Users can update own profile
create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 4. Create a trigger to sync auth.users with public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
