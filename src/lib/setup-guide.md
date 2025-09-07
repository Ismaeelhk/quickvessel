# Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready (usually takes 2-3 minutes)

## Step 2: Get Your Credentials

1. Go to Project Settings > API
2. Copy the following values:
   - Project URL (for `NEXT_PUBLIC_SUPABASE_URL`)
   - Project API Key (anon public) (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Service Role Key (for `SUPABASE_SERVICE_ROLE_KEY`)

## Step 3: Set Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 4: Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire contents of `src/lib/database-schema.sql`
4. Click "Run" to execute the SQL

## Step 5: Verify Setup

1. Go to Table Editor in your Supabase dashboard
2. You should see these tables:
   - `users`
   - `shipments`
   - `tracking_events`
   - `admin_updates`

## Step 6: Test the Application

1. Run `npm run dev`
2. Go to `/auth` and create an account
3. Check the browser console for any errors
4. The database connection test will run automatically

## Common Issues

### Issue: "relation does not exist"
**Solution**: The database tables haven't been created yet. Run the SQL schema from Step 4.

### Issue: "Invalid API key"
**Solution**: Check that your environment variables are correct and the `.env.local` file is in the project root.

### Issue: "permission denied"
**Solution**: Make sure you've run the complete SQL schema which includes the RLS policies.

### Issue: Empty error object `{}`
**Solution**: This usually means the Supabase client isn't properly configured. Check your environment variables.

## Next Steps

Once the database is set up:
1. Create a test shipment in the admin panel
2. Test the tracking functionality
3. Verify that users can only see their own shipments
