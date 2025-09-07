-- Migrate existing users from auth.users to public.users
-- This script will add any existing auth users who don't have a corresponding public.users record

INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', ''),
    'user',
    au.created_at,
    NOW()
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
  AND au.email_confirmed_at IS NOT NULL;  -- Only confirmed users

-- Check the results
SELECT 
    'auth.users' as source,
    COUNT(*) as count
FROM auth.users 
WHERE email_confirmed_at IS NOT NULL

UNION ALL

SELECT 
    'public.users' as source,
    COUNT(*) as count
FROM public.users;
