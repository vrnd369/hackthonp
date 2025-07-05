-- Test RLS policies for hackathon_registrations table
-- Run this in your Supabase SQL Editor to verify the setup

-- 1. Check if RLS is enabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'hackathon_registrations';

-- 2. List all current policies
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

-- 3. Check anon role permissions
SELECT 
  has_table_privilege('anon', 'hackathon_registrations', 'INSERT') as anon_can_insert,
  has_table_privilege('anon', 'hackathon_registrations', 'SELECT') as anon_can_select,
  has_table_privilege('anon', 'hackathon_registrations', 'UPDATE') as anon_can_update,
  has_table_privilege('anon', 'hackathon_registrations', 'DELETE') as anon_can_delete;

-- 4. Test insert as anon role (this should work)
-- Note: This is a test insert that should succeed
INSERT INTO hackathon_registrations (
  name, 
  email, 
  phone, 
  experience_level, 
  motivation, 
  tracks_interested, 
  registration_type
) VALUES (
  'Test User',
  'test@example.com',
  '+1234567890',
  'beginner',
  'Testing RLS policies',
  ARRAY['storytelling', 'battle-royale'],
  'free'
);

-- 5. Verify the test insert worked
SELECT 
  id, 
  name, 
  email, 
  registration_type, 
  created_at 
FROM hackathon_registrations 
WHERE email = 'test@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- 6. Clean up test data
DELETE FROM hackathon_registrations WHERE email = 'test@example.com';

-- 7. Verify cleanup
SELECT COUNT(*) as remaining_test_records 
FROM hackathon_registrations 
WHERE email = 'test@example.com'; 