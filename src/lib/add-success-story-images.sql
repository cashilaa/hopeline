-- Migration: Add two image fields to success_stories for child and reunited images
ALTER TABLE success_stories
ADD COLUMN image_child_url TEXT;

ALTER TABLE success_stories
ADD COLUMN image_reunited_url TEXT;
