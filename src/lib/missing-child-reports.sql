-- Table for public missing child reports (from the modal form)
CREATE TABLE IF NOT EXISTS public.missing_child_reports (
  id BIGSERIAL PRIMARY KEY,
  childrens_home TEXT,
  child_received_by TEXT,
  header_telephone TEXT,
  official_chaplin TEXT,
  header_date TEXT,
  header_sign TEXT,
  child_name TEXT NOT NULL,
  school TEXT,
  last_cloth TEXT,
  finder_name_tel TEXT,
  age TEXT,
  sex TEXT,
  child_lives TEXT,
  area_lost TEXT,
  description TEXT,
  time_reported TEXT,
  reported_by TEXT,
  father_relationship TEXT,
  mother_id TEXT,
  aunt_telephone TEXT,
  ob_number TEXT,
  time_reunited TEXT,
  receiver_name TEXT,
  receiver_telephone TEXT,
  complainant_name TEXT,
  complainant_sign TEXT,
  witness_name TEXT,
  witness_sign TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.missing_child_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a report
CREATE POLICY "anon can insert" ON public.missing_child_reports
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated (admin) can read and update
CREATE POLICY "auth can select" ON public.missing_child_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "auth can update" ON public.missing_child_reports
  FOR UPDATE TO authenticated USING (true);
