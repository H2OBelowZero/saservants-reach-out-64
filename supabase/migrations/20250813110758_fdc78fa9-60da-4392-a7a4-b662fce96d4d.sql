-- Fix the function search path mutable warning by setting search_path
CREATE OR REPLACE FUNCTION public.get_donation_stats()
RETURNS TABLE(total_donations numeric, donation_count bigint)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    COALESCE(SUM(amount), 0) as total_donations,
    COUNT(*) as donation_count
  FROM public.donations;
$$;