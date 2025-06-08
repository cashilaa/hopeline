-- This is the SQL script for setting up the Supabase table

-- Drop the table if it exists (use this carefully in production)
-- DROP TABLE IF EXISTS public.reports;

-- Create the reports table
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