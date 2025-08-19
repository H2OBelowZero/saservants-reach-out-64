# SSFATP Foundation Database Schema

## Overview
Comprehensive database schema for the Senzangakhona Seth Foundation Against Teen Pregnancy website functionality.

## Tables

### 1. Users (Authentication & General)
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  phone VARCHAR,
  role VARCHAR DEFAULT 'user' CHECK (role IN ('admin', 'volunteer', 'donor', 'partner', 'user')),
  profile_image_url VARCHAR,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR,
  province VARCHAR,
  postal_code VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);
```

### 2. Volunteers
```sql
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skills TEXT[],
  availability VARCHAR, -- 'weekdays', 'weekends', 'evenings', 'flexible'
  experience_level VARCHAR CHECK (experience_level IN ('beginner', 'intermediate', 'experienced')),
  areas_of_interest TEXT[],
  emergency_contact_name VARCHAR,
  emergency_contact_phone VARCHAR,
  background_check_completed BOOLEAN DEFAULT false,
  background_check_date DATE,
  training_completed BOOLEAN DEFAULT false,
  training_completion_date DATE,
  volunteer_hours INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 3. Partners
```sql
CREATE TABLE partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name VARCHAR NOT NULL,
  contact_person VARCHAR NOT NULL,
  contact_email VARCHAR NOT NULL,
  contact_phone VARCHAR,
  website VARCHAR,
  organization_type VARCHAR CHECK (organization_type IN ('ngo', 'government', 'corporate', 'school', 'healthcare', 'community')),
  partnership_type VARCHAR CHECK (partnership_type IN ('funding', 'resource', 'program', 'advocacy', 'research')),
  partnership_status VARCHAR DEFAULT 'prospective' CHECK (partnership_status IN ('prospective', 'active', 'inactive', 'ended')),
  partnership_start_date DATE,
  partnership_end_date DATE,
  description TEXT,
  logo_url VARCHAR,
  address TEXT,
  city VARCHAR,
  province VARCHAR,
  contribution_type TEXT[], -- ['funding', 'venue', 'materials', 'expertise', 'volunteers']
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 4. Donations (Already exists, enhanced)
```sql
-- Enhance existing donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS donation_type VARCHAR DEFAULT 'monetary' CHECK (donation_type IN ('monetary', 'in_kind', 'recurring'));
ALTER TABLE donations ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS donation_frequency VARCHAR CHECK (donation_frequency IN ('one_time', 'monthly', 'quarterly', 'annually'));
ALTER TABLE donations ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES fundraising_campaigns(id);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS tax_receipt_requested BOOLEAN DEFAULT false;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS tax_receipt_sent BOOLEAN DEFAULT false;
```

### 5. Events (Already exists, well structured)
-- Current events table is comprehensive and well-designed

### 6. Blog Posts
```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url VARCHAR,
  author_id UUID REFERENCES users(id),
  category VARCHAR CHECK (category IN ('event', 'impact', 'education', 'announcement', 'success_story')),
  tags TEXT[],
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  event_id UUID REFERENCES events(id), -- Links to related event if applicable
  views_count INTEGER DEFAULT 0,
  meta_title VARCHAR,
  meta_description VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 7. Fundraising Campaigns
```sql
CREATE TABLE fundraising_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  goal_amount NUMERIC(10,2) NOT NULL,
  current_amount NUMERIC(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  campaign_type VARCHAR CHECK (campaign_type IN ('general', 'event', 'program', 'emergency')),
  status VARCHAR DEFAULT 'active' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  image_url VARCHAR,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 8. Event Volunteers (Junction table)
```sql
CREATE TABLE event_volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE CASCADE,
  role VARCHAR, -- 'coordinator', 'facilitator', 'assistant', 'registration'
  hours_contributed INTEGER DEFAULT 0,
  feedback TEXT,
  status VARCHAR DEFAULT 'confirmed' CHECK (status IN ('invited', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT now()
);
```

### 9. Contact Messages
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  subject VARCHAR NOT NULL,
  message TEXT NOT NULL,
  message_type VARCHAR CHECK (message_type IN ('general', 'volunteer', 'partnership', 'media', 'complaint')),
  status VARCHAR DEFAULT 'new' CHECK (status IN ('new', 'in_process', 'resolved', 'closed')),
  assigned_to UUID REFERENCES users(id),
  response TEXT,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);
```

### 10. Program Participants
```sql
CREATE TABLE program_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  date_of_birth DATE,
  gender VARCHAR CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  school_name VARCHAR,
  grade_level VARCHAR,
  parent_guardian_name VARCHAR,
  parent_guardian_phone VARCHAR,
  parent_guardian_email VARCHAR,
  address TEXT,
  city VARCHAR,
  province VARCHAR,
  consent_form_signed BOOLEAN DEFAULT false,
  programs_enrolled TEXT[], -- Array of program types
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped_out', 'transferred')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 11. Resources
```sql
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  resource_type VARCHAR CHECK (resource_type IN ('pdf', 'video', 'audio', 'infographic', 'toolkit', 'guide')),
  category VARCHAR CHECK (category IN ('education', 'prevention', 'support', 'training', 'awareness')),
  file_url VARCHAR NOT NULL,
  thumbnail_url VARCHAR,
  download_count INTEGER DEFAULT 0,
  target_audience VARCHAR CHECK (target_audience IN ('teens', 'parents', 'educators', 'healthcare', 'community')),
  age_group VARCHAR,
  language VARCHAR DEFAULT 'english',
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

## Views for Statistics

### Event Statistics (Already exists)
-- get_event_stats function exists

### Donation Statistics (Already exists)
-- get_donation_stats function exists

### Additional Statistics Views
```sql
-- Volunteer Statistics
CREATE OR REPLACE FUNCTION get_volunteer_stats()
RETURNS TABLE (
  total_volunteers BIGINT,
  active_volunteers BIGINT,
  total_volunteer_hours BIGINT,
  pending_applications BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_volunteers,
    COUNT(*) FILTER (WHERE status = 'approved')::BIGINT as active_volunteers,
    COALESCE(SUM(volunteer_hours), 0)::BIGINT as total_volunteer_hours,
    COUNT(*) FILTER (WHERE status = 'pending')::BIGINT as pending_applications
  FROM volunteers;
END;
$$ LANGUAGE plpgsql;

-- Blog Post Statistics
CREATE OR REPLACE FUNCTION get_blog_stats()
RETURNS TABLE (
  total_posts BIGINT,
  published_posts BIGINT,
  total_views BIGINT,
  recent_posts BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_posts,
    COUNT(*) FILTER (WHERE status = 'published')::BIGINT as published_posts,
    COALESCE(SUM(views_count), 0)::BIGINT as total_views,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::BIGINT as recent_posts
  FROM blog_posts;
END;
$$ LANGUAGE plpgsql;
```

## Row Level Security (RLS) Policies

### Basic Security Setup
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Example policies (implement based on requirements)
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Public can read published blog posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');

-- Admins have full access
CREATE POLICY "Admins have full access" ON users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);
```

## Indexes for Performance
```sql
-- Essential indexes
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_blog_posts_status_published ON blog_posts(status, published_at);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
```

This schema provides a comprehensive foundation for all the NPO's functionality while maintaining data integrity and performance.