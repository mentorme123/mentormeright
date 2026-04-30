-- ============================================
-- MentorMe Database Schema (Safe - drops old policies first)
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE (already exists, just ensure columns)
-- ============================================
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS education_level TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS current_package TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS target_package TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS audience_type TEXT DEFAULT 'ST';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS institution_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================
-- 2. COUNSELLORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.counsellors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  specialization TEXT NOT NULL DEFAULT 'Career Counselling',
  experience_years INTEGER DEFAULT 0,
  bio TEXT,
  photo_url TEXT,
  session_price INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.counsellors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view active counsellors" ON public.counsellors;
CREATE POLICY "Anyone can view active counsellors" ON public.counsellors FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Service role counsellors" ON public.counsellors;
CREATE POLICY "Service role counsellors" ON public.counsellors FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 3. SLOTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  counsellor_id UUID NOT NULL REFERENCES public.counsellors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view slots" ON public.slots;
CREATE POLICY "Anyone can view slots" ON public.slots FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role slots" ON public.slots;
CREATE POLICY "Service role slots" ON public.slots FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 4. BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  counsellor_id UUID NOT NULL REFERENCES public.counsellors(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES public.slots(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_id TEXT,
  jitsi_link TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users create bookings" ON public.bookings;
CREATE POLICY "Users create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Service role bookings" ON public.bookings;
CREATE POLICY "Service role bookings" ON public.bookings FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 5. ASSESSMENT RESULTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}',
  scores JSONB,
  report JSONB,
  audience_type TEXT DEFAULT 'ST',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own results" ON public.assessment_results;
CREATE POLICY "Users view own results" ON public.assessment_results FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users insert own results" ON public.assessment_results;
CREATE POLICY "Users insert own results" ON public.assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Service role results" ON public.assessment_results;
CREATE POLICY "Service role results" ON public.assessment_results FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 6. CAREERS TABLE (Career Library)
-- ============================================
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  stream TEXT NOT NULL DEFAULT 'Any',
  description TEXT NOT NULL,
  salary_range TEXT,
  education_path TEXT,
  skills_required TEXT[],
  growth_outlook TEXT,
  is_trending BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view careers" ON public.careers;
CREATE POLICY "Anyone can view careers" ON public.careers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role careers" ON public.careers;
CREATE POLICY "Service role careers" ON public.careers FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 7. BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'MentorMe Team',
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (is_published = true);
DROP POLICY IF EXISTS "Service role blogs" ON public.blogs;
CREATE POLICY "Service role blogs" ON public.blogs FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 8. PARENT PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.parent_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, -- Parent's Auth ID
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, -- Linked Student
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Parents view own profile" ON public.parent_profiles;
CREATE POLICY "Parents view own profile" ON public.parent_profiles FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 9. EXAM ALERTS TABLE (Indian Competitive Exams)
-- ============================================
CREATE TABLE IF NOT EXISTS public.exam_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'Engineering', 'Medical'
  application_deadline DATE,
  exam_date DATE,
  official_link TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.exam_alerts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view exams" ON public.exam_alerts;
CREATE POLICY "Anyone can view exams" ON public.exam_alerts FOR SELECT USING (true);

-- ============================================
-- 10. CERTIFICATES TABLE (NEP 2020 Compliance)
-- ============================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL DEFAULT 'Career Readiness',
  issue_date TIMESTAMPTZ DEFAULT NOW(),
  skills_verified TEXT[],
  metadata JSONB, -- Stores report scores for the PDF
  is_public BOOLEAN DEFAULT true
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own certificates" ON public.certificates;
CREATE POLICY "Users view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id OR is_public = true);

-- ============================================
-- 11. REVIEWS TABLE (Counsellor Marketplace)
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  counsellor_id UUID REFERENCES public.counsellors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users insert own reviews" ON public.reviews;
CREATE POLICY "Users insert own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- DONE!
-- ============================================
