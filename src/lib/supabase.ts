import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qxbuiwoshvbuqcugqhjh.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YnVpd29zaHZidXFjdWdxaGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjc4ODgsImV4cCI6MjA2NDk0Mzg4OH0.O3--A78uLgsUEX6Ty6n1grSKm3Jboy4UKwz9IEnB_kY';

// Debug info
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

// Initialize the Supabase client with more options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});