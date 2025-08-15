-- Create events table for NPO activities
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  attendees INTEGER DEFAULT 0,
  people_reached INTEGER DEFAULT 0,
  event_type TEXT NOT NULL,
  outcomes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (events are public information)
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

-- For now, allow anyone to insert events (you can restrict this later to admin users)
CREATE POLICY "Anyone can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get event statistics
CREATE OR REPLACE FUNCTION public.get_event_stats()
RETURNS TABLE(
  total_events bigint,
  total_people_reached bigint,
  total_attendees bigint,
  latest_event_date date
) 
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT 
    COUNT(*) as total_events,
    COALESCE(SUM(people_reached), 0) as total_people_reached,
    COALESCE(SUM(attendees), 0) as total_attendees,
    MAX(event_date) as latest_event_date
  FROM public.events;
$function$;