-- Add a second image column for lost_children
ALTER TABLE public.lost_children
ADD COLUMN IF NOT EXISTS image_url2 TEXT;
