-- MentorMe Supabase Database Schema

-- 1. Create custom ENUMs
CREATE TYPE user_role AS ENUM ('individual', 'institutional', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- 2. Tables

-- users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'individual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_email TEXT,
  admin_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress', -- in_progress, completed
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

-- questions table
CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  section INTEGER CHECK (section IN (1, 2, 3)),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) -- 'A', 'B', 'C', 'D' (optional)
);

-- answers table
CREATE TABLE public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option CHAR(1),
  section INTEGER CHECK (section IN (1, 2, 3)),
  UNIQUE(assessment_id, question_id)
);

-- reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  report_content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- counselors table
CREATE TABLE public.counselors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,
  specialization TEXT,
  years_experience INTEGER
);

-- slots table
CREATE TABLE public.slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counselor_id UUID REFERENCES public.counselors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE
);

-- bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  counselor_id UUID REFERENCES public.counselors(id),
  slot_id UUID REFERENCES public.slots(id),
  payment_id TEXT, -- Razorpay payment ID
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Policies

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Assessments: Users can only see their own
CREATE POLICY "Users can view own assessments" ON public.assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assessments" ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own assessments" ON public.assessments FOR UPDATE USING (auth.uid() = user_id);

-- Answers: Users can only see/insert/update answers for their assessments
CREATE POLICY "Users can view own answers" ON public.answers FOR SELECT USING (
  assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own answers" ON public.answers FOR INSERT WITH CHECK (
  assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own answers" ON public.answers FOR UPDATE USING (
  assessment_id IN (SELECT id FROM public.assessments WHERE user_id = auth.uid())
);

-- Questions: Everyone can read questions
CREATE POLICY "Anyone can view questions" ON public.questions FOR SELECT USING (true);

-- Reports: Users can see their own reports
CREATE POLICY "Users can view own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id);

-- Counselors & Slots: Everyone can view
CREATE POLICY "Anyone can view counselors" ON public.counselors FOR SELECT USING (true);
CREATE POLICY "Anyone can view slots" ON public.slots FOR SELECT USING (true);

-- Bookings: Users can see their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
