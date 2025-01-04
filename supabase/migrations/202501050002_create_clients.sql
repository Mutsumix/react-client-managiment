-- Enable the moddatetime extension
create extension if not exists moddatetime schema extensions;

-- Create the clients table
create table clients (
  id bigint generated by default as identity primary key,
  company_name text not null,
  importance smallint not null check (importance between 1 and 3),
  contact_person text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the trigger for updated_at
create trigger handle_updated_at before update on clients
  for each row execute procedure moddatetime (updated_at);