# Troubleshooting Guide

## Common Errors and Solutions

### "Failed to load resource: the server responded with a status of 404 ()"

This error indicates that a requested resource cannot be found.

**Possible Causes:**
1. The page/route you're accessing doesn't exist
2. A JavaScript file, CSS file, or other asset cannot be loaded
3. An API endpoint is missing

**Solutions:**
1. Check that you're navigating to a valid route in the application
2. Ensure the application has been built properly with `npm run build`
3. If you see this during development, try restarting the development server

### "Supabase error: Object"

This generic error indicates an issue with Supabase operations.

**Possible Causes:**
1. Missing or incorrect Supabase credentials
2. The 'reports' table doesn't exist in your Supabase database
3. The table schema doesn't match the expected structure
4. Row Level Security (RLS) policies are blocking operations

**Solutions:**
1. Verify your Supabase credentials in the `.env.local` file
2. Check the Supabase dashboard to ensure the 'reports' table exists
3. Run the SQL script in `src/lib/schema.sql` in the Supabase SQL Editor
4. Check the browser console for more detailed error messages

## Database Setup Verification

To verify your Supabase database is set up correctly:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run this query to check if the reports table exists with the correct structure:

```sql
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'reports';
```

4. Run this query to check if any records exist:

```sql
SELECT COUNT(*) FROM reports;
```

## Testing the Connection

You can test the connection to Supabase by:

1. Opening your browser's developer console (F12)
2. Looking for the log messages from our debug code
3. Checking for any error messages when submitting a form or viewing the admin page

## Still Having Issues?

If you continue to experience problems:

1. Try clearing your browser cache and cookies
2. Check if your Supabase project has reached any quotas or limits
3. Verify your network connection and that Supabase services are operational