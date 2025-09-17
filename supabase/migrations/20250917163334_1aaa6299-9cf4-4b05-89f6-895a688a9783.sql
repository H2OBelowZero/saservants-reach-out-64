-- Create user roles enum
CREATE TYPE user_role AS ENUM ('super_admin', 'content_admin', 'content_editor', 'viewer');

-- Create user profiles table (additional user information)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role user_role NOT NULL DEFAULT 'viewer',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    event_type VARCHAR(100) NOT NULL,
    event_category VARCHAR(100),
    organizer VARCHAR(255),
    attendees INTEGER DEFAULT 0,
    people_reached INTEGER DEFAULT 0,
    outcomes TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media table for event photos/videos
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text VARCHAR(255),
    uploaded_by UUID REFERENCES auth.users,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    event_id UUID REFERENCES public.events(id),
    author_id UUID REFERENCES auth.users NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    tags JSONB DEFAULT '[]'::jsonb,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create volunteers table
CREATE TABLE public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    age INTEGER,
    location VARCHAR(255),
    skills TEXT[],
    availability TEXT,
    experience TEXT,
    motivation TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partners table
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    partnership_type VARCHAR(100),
    partnership_details TEXT,
    services_offered TEXT,
    logo_url TEXT,
    website_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations table (enhanced from existing)
CREATE TABLE IF NOT EXISTS public.donations (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20),
    payment_method VARCHAR(50) NOT NULL,
    campaign_id UUID,
    anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fundraising campaigns table
CREATE TABLE public.fundraising_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
    image_url TEXT,
    created_by UUID REFERENCES auth.users,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'general',
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event volunteers junction table
CREATE TABLE public.event_volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    volunteer_id UUID REFERENCES public.volunteers(id) ON DELETE CASCADE,
    role VARCHAR(100),
    hours_volunteered INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, volunteer_id)
);

-- Add foreign key for donations to campaigns
ALTER TABLE public.donations ADD CONSTRAINT fk_donations_campaign 
    FOREIGN KEY (campaign_id) REFERENCES public.fundraising_campaigns(id);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fundraising_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_volunteers ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for events table
CREATE POLICY "Everyone can view published events" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON public.events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin', 'content_editor')
        )
    );

-- Create policies for media table
CREATE POLICY "Everyone can view media" ON public.media
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage media" ON public.media
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin', 'content_editor')
        )
    );

-- Create policies for blog posts
CREATE POLICY "Everyone can view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can view all blog posts" ON public.blog_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin', 'content_editor')
        )
    );

CREATE POLICY "Authors can manage their own posts" ON public.blog_posts
    FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Create policies for volunteers (admin only access)
CREATE POLICY "Admins can manage volunteers" ON public.volunteers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Create policies for partners (admin only access)
CREATE POLICY "Admins can manage partners" ON public.partners
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Create policies for donations (admin only access)
CREATE POLICY "Admins can view donations" ON public.donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Allow public to insert donations (for donation forms)
CREATE POLICY "Anyone can create donations" ON public.donations
    FOR INSERT WITH CHECK (true);

-- Create policies for fundraising campaigns
CREATE POLICY "Everyone can view active campaigns" ON public.fundraising_campaigns
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage campaigns" ON public.fundraising_campaigns
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Create policies for contact messages (admin only access)
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Allow public to create contact messages
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Create policies for event volunteers
CREATE POLICY "Admins can manage event volunteers" ON public.event_volunteers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON public.volunteers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fundraising_campaigns_updated_at BEFORE UPDATE ON public.fundraising_campaigns
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create functions for stats
CREATE OR REPLACE FUNCTION get_event_stats()
RETURNS TABLE (
    total_events BIGINT,
    total_people_reached BIGINT,
    total_attendees BIGINT,
    latest_event_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT,
        COALESCE(SUM(people_reached), 0)::BIGINT,
        COALESCE(SUM(attendees), 0)::BIGINT,
        MAX(event_date)
    FROM public.events;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_donation_stats()
RETURNS TABLE (
    total_donations NUMERIC,
    donation_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(amount), 0),
        COUNT(*)::BIGINT
    FROM public.donations;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_events_date ON public.events(event_date DESC);
CREATE INDEX idx_events_type ON public.events(event_type);
CREATE INDEX idx_media_event ON public.media(event_id);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at DESC);
CREATE INDEX idx_volunteers_status ON public.volunteers(status);
CREATE INDEX idx_partners_status ON public.partners(status);
CREATE INDEX idx_campaigns_status ON public.fundraising_campaigns(status);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'viewer');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();