-- Fix RLS policies for hackathon_registrations table
-- Run this in your Supabase SQL Editor

-- First, let's check the current state of RLS
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'hackathon_registrations';

-- Check existing policies
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
WHERE tablename = 'hackathon_registrations';

-- Drop all existing policies to start fresh
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

-- Ensure RLS is enabled
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

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

-- Verify the policies were created
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
WHERE tablename = 'hackathon_registrations';

-- Test the insert policy by checking if anon role can insert
-- This is just a verification query
SELECT 
  has_table_privilege('anon', 'hackathon_registrations', 'INSERT') as anon_can_insert,
  has_table_privilege('anon', 'hackathon_registrations', 'SELECT') as anon_can_select; 