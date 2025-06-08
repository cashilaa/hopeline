-- First, let's make sure Row Level Security is enabled
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Delete existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.reports;
DROP POLICY IF EXISTS "Allow authenticated to select all" ON public.reports;
DROP POLICY IF EXISTS "Allow authenticated to update" ON public.reports;

-- Create a policy that allows everyone to insert
CREATE POLICY "Allow anyone to insert" ON public.reports
  FOR INSERT
  TO public  -- This is important - using 'public' instead of 'anon'
  WITH CHECK (true);

-- Create a policy that allows everyone to select
CREATE POLICY "Allow anyone to select" ON public.reports
  FOR SELECT
  TO public
  USING (true);

-- Create a policy that allows everyone to update
CREATE POLICY "Allow anyone to update" ON public.reports
  FOR UPDATE
  TO public
  USING (true);