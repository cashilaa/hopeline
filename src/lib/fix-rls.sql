-- Add select policy for anon users on lost_children

CREATE POLICY "Allow anonymous to select all" ON public.lost_children
  FOR SELECT
  TO anon
  USING (true);
