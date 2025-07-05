import { createClient } from "@supabase/supabase-js";

// Supabase configuration - using hardcoded values for development
// In production, these should be set via environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://rnwgojmxlvgrtnozxmlc.supabase.co";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJud2dvam14bHZncnRub3p4bWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjU1MjksImV4cCI6MjA2NTg0MTUyOX0._gA3hl3QP1pDNUO-4s0ilGgkXot39-G4qt3IqeDlGHw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.x'
    }
  }
});

export interface RegistrationData {
  name: string;
  email: string;
  registration_type: "free" | "premium";
  phone?: string;
  experience_level?: string;
  motivation?: string;
  tracks_interested?: string[];
  created_at?: string;
}
