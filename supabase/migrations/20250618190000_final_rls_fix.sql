/*
  # Final RLS policy fix for hackathon_registrations table

  This migration completely resets and recreates all RLS policies to ensure
  anonymous users can insert registrations without any authentication issues.
*/

-- First, let's check the current state
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'hackathon_registrations';

-- Drop ALL existing policies to start completely fresh
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Anyone can register" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can read own registration" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow anonymous read access" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow anonymous insert" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow anonymous select" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow authenticated update" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow authenticated delete" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow read for anon" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow insert for anon" ON hackathon_registrations;
DROP POLICY IF EXISTS "Allow select for anon" ON hackathon_registrations;

-- Ensure RLS is enabled
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Create the most permissive insert policy possible for anonymous users
CREATE POLICY "anon_insert_policy"
  ON hackathon_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a permissive select policy for anonymous users
CREATE POLICY "anon_select_policy"
  ON hackathon_registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create a policy for authenticated users to update their own registration
CREATE POLICY "auth_update_policy"
  ON hackathon_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Create a policy for authenticated users to delete their own registration
CREATE POLICY "auth_delete_policy"
  ON hackathon_registrations
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Verify the policies were created successfully
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check 
FROM pg_policies 
WHERE tablename = 'hackathon_registrations'
ORDER BY policyname;

-- Test the insert policy by checking if anon role has proper permissions
SELECT 
  has_table_privilege('anon', 'hackathon_registrations', 'INSERT') as anon_can_insert,
  has_table_privilege('anon', 'hackathon_registrations', 'SELECT') as anon_can_select,
  has_table_privilege('anon', 'hackathon_registrations', 'UPDATE') as anon_can_update,
  has_table_privilege('anon', 'hackathon_registrations', 'DELETE') as anon_can_delete; 