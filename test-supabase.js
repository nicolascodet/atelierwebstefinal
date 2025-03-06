// Test script for Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://fwpertcpatyimbujjfrm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGVydGNwYXR5aW1idWpqZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA1NDYsImV4cCI6MjA1MzI0NjU0Nn0.RRNGI86RsPJHlnpnJ9ryCl6EAMbR_OSi_T9jk9GLJic';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');

  try {
    // Generate a test email with timestamp to avoid uniqueness issues
    const testEmail = `test_${Date.now()}@example.com`;
    
    // Test direct table access (requires the table to exist)
    console.log(`Trying to add test email: ${testEmail}`);
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: testEmail }])
      .select();
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log('✅ Successfully added test email to subscribers table!');
    console.log('Data:', data);
    
    // Optionally, you can try to retrieve the data as well
    const { data: retrievedData, error: retrieveError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', testEmail);
    
    if (retrieveError) {
      console.warn('Warning: Could not retrieve the test email. This is expected if Row Level Security is enabled and working correctly.');
    } else {
      console.log('Retrieved data:', retrievedData);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    
    if (error.message && (
      error.message.includes('relation "subscribers" does not exist') || 
      error.message.includes('does not exist')
    )) {
      console.log('\n🔧 The subscribers table does not exist yet.');
      console.log('Please create it by running the SQL from setup-subscribers-table.sql in the Supabase SQL Editor:');
      console.log('1. Go to https://app.supabase.com/project/_/sql');
      console.log('2. Copy the contents of setup-subscribers-table.sql');
      console.log('3. Paste it into the SQL Editor and run it');
      console.log('4. Then run this test script again');
    }
  }
}

// Run the test
testConnection(); 