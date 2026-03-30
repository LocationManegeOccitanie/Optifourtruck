-- Table pour stocker les demandes de devis
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_category TEXT NOT NULL,
  event_date DATE,
  event_city TEXT,
  event_department TEXT,
  guest_count TEXT,
  event_time TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  project_description TEXT,
  budget TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  contact_preference TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form, no auth required)
CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);