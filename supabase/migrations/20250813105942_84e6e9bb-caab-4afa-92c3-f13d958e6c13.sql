-- Remove the dangerous public read policy from donations table
DROP POLICY IF EXISTS "Allow public read access to donations" ON public.donations;

-- Create a secure function to get donation statistics without exposing individual donor data
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