/*
  # Fix RLS policy for hackathon_registrations table

  The current RLS policy is preventing anonymous users from inserting registrations.
  This migration drops the existing policies and creates new, more permissive ones.
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can register" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can read own registration" ON hackathon_registrations;

-- Create a more permissive insert policy for anonymous users
CREATE POLICY "Enable insert for anonymous users"
  ON hackathon_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy to allow reading registrations (for admin purposes)
CREATE POLICY "Enable read access for all users"
  ON hackathon_registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create a policy for authenticated users to update their own registration
CREATE POLICY "Enable update for authenticated users"
  ON hackathon_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Create a policy for authenticated users to delete their own registration
CREATE POLICY "Enable delete for authenticated users"
  ON hackathon_registrations
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id::text); 