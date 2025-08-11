-- Create donations table
CREATE TABLE public.donations (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access for donations (since this is for a charity)
CREATE POLICY "Allow public read access to donations" 
ON public.donations 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);