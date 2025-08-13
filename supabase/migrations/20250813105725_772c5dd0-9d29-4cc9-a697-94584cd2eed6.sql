-- Remove the dangerous public read policy from donations table
DROP POLICY IF EXISTS "Allow public read access to donations" ON public.donations;

-- Create a secure view for donation statistics that doesn't expose individual donor data
CREATE OR REPLACE VIEW public.donation_stats AS
SELECT 
  COUNT(*) as donation_count,
  SUM(amount) as total_amount
FROM public.donations;

-- Enable RLS on the view
ALTER VIEW public.donation_stats OWNER TO postgres;

-- Create a policy to allow public access to aggregated statistics only
CREATE POLICY "Allow public read access to donation stats" 
ON public.donation_stats 
FOR SELECT 
USING (true);

-- Create a secure function to get donation statistics
CREATE OR REPLACE FUNCTION public.get_donation_stats()
RETURNS TABLE(total_donations numeric, donation_count bigint)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    COALESCE(SUM(amount), 0) as total_donations,
    COUNT(*) as donation_count
  FROM public.donations;
$$;