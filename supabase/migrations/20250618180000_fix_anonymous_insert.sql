/*
  # Fix anonymous insert policy for hackathon_registrations table

  The current RLS policy is still preventing anonymous users from inserting registrations.
  This migration ensures that anonymous users can insert registrations without authentication.
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Anyone can register" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can read own registration" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow anonymous read access" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow read for anon" ON "public"."hackathon_registrations";

-- Create a simple insert policy that allows anyone to insert
CREATE POLICY "Allow anonymous insert"
  ON hackathon_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a simple select policy that allows anyone to read
CREATE POLICY "Allow anonymous select"
  ON hackathon_registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create a policy for authenticated users to update their own registration
CREATE POLICY "Allow authenticated update"
  ON hackathon_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Create a policy for authenticated users to delete their own registration
CREATE POLICY "Allow authenticated delete"
  ON hackathon_registrations
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id::text); 