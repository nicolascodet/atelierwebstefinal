import { createClient } from '@supabase/supabase-js'

// These are public credentials for the client-side library
// For security, we use row-level security in Supabase to restrict access
const supabaseUrl = 'https://fwpertcpatyimbujjfrm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGVydGNwYXR5aW1idWpqZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA1NDYsImV4cCI6MjA1MzI0NjU0Nn0.RRNGI86RsPJHlnpnJ9ryCl6EAMbR_OSi_T9jk9GLJic'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to add a subscriber to the mailing list
export async function addSubscriber(email: string) {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }])
      .select()
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error adding subscriber:', error)
    return { success: false, error }
  }
}

// Helper function to get all subscribers (will be used in the admin area)
export async function getSubscribers() {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error getting subscribers:', error)
    return { success: false, error }
  }
} 