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