-- This is the SQL script for setting up the Supabase tables

-- Table for missing children (lost_children)
CREATE TABLE IF NOT EXISTS public.lost_children (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  description TEXT NOT NULL,
  last_seen_location TEXT NOT NULL,
  last_seen_date TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  contact_email TEXT,
  additional_info TEXT,
  image_url TEXT,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active'
);

-- Enable Row Level Security
ALTER TABLE public.lost_children ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (for submitting missing children)
CREATE POLICY "Allow anonymous insert" ON public.lost_children
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to select all records (for admins)
CREATE POLICY "Allow authenticated to select all" ON public.lost_children
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update all records (for admins)
CREATE POLICY "Allow authenticated to update" ON public.lost_children
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Existing reports table (for reference)
CREATE TABLE IF NOT EXISTS public.reports (
  id BIGSERIAL PRIMARY KEY,
  "childName" TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  "lastSeenLocation" TEXT NOT NULL,
  "dateMissing" TEXT NOT NULL,
  description TEXT NOT NULL,
  "reporterName" TEXT NOT NULL,
  "reporterContact" TEXT NOT NULL,
  "reporterEmail" TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  "dateReported" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to insert (for submitting reports)
CREATE POLICY "Allow anonymous insert" ON public.reports
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to select all records (for admins)
CREATE POLICY "Allow authenticated to select all" ON public.reports
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update all records (for admins)
CREATE POLICY "Allow authenticated to update" ON public.reports
  FOR UPDATE 
  TO authenticated
  USING (true);
