// Setup script for Supabase table and policies
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://fwpertcpatyimbujjfrm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGVydGNwYXR5aW1idWpqZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA1NDYsImV4cCI6MjA1MzI0NjU0Nn0.RRNGI86RsPJHlnpnJ9ryCl6EAMbR_OSi_T9jk9GLJic';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up Supabase database...');

  try {
    // Create the subscribers table
    const { data: createTableData, error: createTableError } = await supabase.rpc('create_subscribers_table');
    
    if (createTableError) {
      console.error('Error creating table:', createTableError);
      // If the table already exists, continue anyway
      if (!createTableError.message.includes('already exists')) {
        throw createTableError;
      }
    } else {
      console.log('✅ Subscribers table created successfully');
    }

    // Test adding a subscriber
    const testEmail = `test_${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('subscribers')
      .insert([{ email: testEmail, subscribed_at: new Date().toISOString() }]);
    
    if (insertError) {
      console.error('Error testing insert:', insertError);
    } else {
      console.log(`✅ Test subscriber added successfully: ${testEmail}`);
    }

    console.log('\n🎉 Setup completed successfully!');
    console.log('\nYou can now view your subscribers at:');
    console.log('https://app.supabase.com/project/_/editor/table/subscribers');
    console.log('\nMake sure to replace the "_" in the URL with your project ID.');

  } catch (error) {
    console.error('Setup failed:', error);
  }
}

// Execute SQL to create the function that will create our table
async function createSetupFunction() {
  // SQL to create a function that sets up the subscribers table and policies
  const sql = `
-- Create function to set up subscribers table and policies
CREATE OR REPLACE FUNCTION create_subscribers_table()
RETURNS void AS $$
BEGIN
  -- Create the subscribers table if it doesn't exist
  CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT
  );

  -- Enable Row Level Security
  ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

  -- Create policy for inserts (anyone can subscribe)
  DROP POLICY IF EXISTS "Allow inserts" ON subscribers;
  CREATE POLICY "Allow inserts" ON subscribers
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

  -- Create policy for selects (only via service role can view all subscribers)
  DROP POLICY IF EXISTS "Service role can select" ON subscribers;
  CREATE POLICY "Service role can select" ON subscribers
    FOR SELECT
    TO service_role
    USING (true);
END;
$$ LANGUAGE plpgsql;
  `;

  // Execute the SQL to create the setup function
  const { error } = await supabase.rpc('pgadmin_exec_sql', { sql });
  
  if (error) {
    if (error.message.includes('function pgadmin_exec_sql() does not exist')) {
      console.error('Error: This requires a custom function or admin access to execute SQL directly.');
      console.log('\nPlease set up the table manually in the Supabase dashboard:');
      console.log('1. Go to https://app.supabase.com/');
      console.log('2. Select your project');
      console.log('3. Go to "Table Editor" and create a new table named "subscribers" with these columns:');
      console.log('   - id (uuid, primary key, default: gen_random_uuid())');
      console.log('   - email (text, not null, unique)');
      console.log('   - subscribed_at (timestamptz, not null, default: now())');
      console.log('   - name (text, nullable)');
      console.log('4. Enable Row Level Security and set the appropriate policies');
      process.exit(1);
    }
    throw error;
  }
}

// Run the setup
(async () => {
  try {
    await createSetupFunction();
    await setupDatabase();
  } catch (error) {
    console.error('Setup failed:', error);
  }
})(); 