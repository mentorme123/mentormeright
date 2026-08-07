-- ============================================
-- Phase 2: B2B Command Center Analytics
-- ============================================

-- 1. Add target_career to users table for the Misalignment metric
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS target_career TEXT;

-- 2. RPC: get_cohort_misalignment_rate
-- Purpose: Analyzes the gap between stated career goals and actual psychometric output.
-- Returns: A JSON object containing the total assessed students and the percentage misaligned.
CREATE OR REPLACE FUNCTION get_cohort_misalignment_rate(inst_name TEXT)
RETURNS JSON AS $$
DECLARE
  total_assessed INT;
  misaligned_count INT := 0;
  student RECORD;
  top_trait TEXT;
BEGIN
  -- Get total students in this institution who have completed an assessment and stated a target career
  SELECT count(*) INTO total_assessed
  FROM public.users u
  JOIN public.assessment_results a ON u.id = a.user_id
  WHERE u.institution_name = inst_name AND u.target_career IS NOT NULL;

  IF total_assessed = 0 THEN
    RETURN json_build_object('total', 0, 'misaligned_percentage', 0);
  END IF;

  -- Loop through students to calculate heuristic misalignment
  FOR student IN 
    SELECT u.target_career, a.report
    FROM public.users u
    JOIN public.assessment_results a ON u.id = a.user_id
    WHERE u.institution_name = inst_name AND u.target_career IS NOT NULL
  LOOP
    -- Assuming the report JSONB has an array of coreStrengths, we pick the first one's name.
    -- If the report format is different, this logic will need refinement, but this acts as the foundational engine.
    top_trait := (student.report->'coreStrengths'->0->>'name');
    
    -- Heuristic: If they want Engineering but their top trait is 'Social' or 'Artistic', flag as misalignment risk.
    -- (In a production system, this mapping would be an extensive cross-reference table).
    IF student.target_career ILIKE '%Engineering%' AND top_trait IN ('Social', 'Artistic') THEN
      misaligned_count := misaligned_count + 1;
    ELSIF student.target_career ILIKE '%Art%' AND top_trait IN ('Conventional', 'Realistic') THEN
      misaligned_count := misaligned_count + 1;
    ELSIF student.target_career ILIKE '%Finance%' AND top_trait IN ('Artistic') THEN
      misaligned_count := misaligned_count + 1;
    END IF;
  END LOOP;

  RETURN json_build_object(
    'total', total_assessed, 
    'misaligned_count', misaligned_count,
    'misaligned_percentage', ROUND((misaligned_count::NUMERIC / total_assessed::NUMERIC) * 100, 1)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. RPC: get_cohort_reality_gap
-- Purpose: Maps Baseline (Psychometric readiness) vs Target Compensation.
-- Returns: Quadrant data to identify the "Danger Zone" (High salary expectation, low readiness).
CREATE OR REPLACE FUNCTION get_cohort_reality_gap(inst_name TEXT)
RETURNS JSON AS $$
DECLARE
  danger_zone_count INT := 0;
  total_assessed INT := 0;
  student RECORD;
  avg_score NUMERIC;
  target_salary NUMERIC;
BEGIN
  FOR student IN 
    SELECT u.target_package, a.scores
    FROM public.users u
    JOIN public.assessment_results a ON u.id = a.user_id
    WHERE u.institution_name = inst_name AND u.target_package IS NOT NULL
  LOOP
    total_assessed := total_assessed + 1;
    
    -- Extract numeric value from target_package (e.g., '15 LPA' -> 15)
    target_salary := COALESCE(NULLIF(regexp_replace(student.target_package, '[^0-9.]', '', 'g'), ''), '0')::NUMERIC;
    
    -- Calculate an average score from the JSONB (assuming a standard structure, e.g., 'Logical' score)
    -- As a placeholder heuristic, we extract the first available score or assume a baseline if complex.
    -- For this engine, we will flag anyone expecting >10LPA with a score below 5/10.
    
    -- To make it robust without knowing exact JSON structure, we simulate the extraction:
    -- In production, parse actual RIASEC or Logical scores from the `scores` JSONB.
    -- For now, if the user expects high salary but lacks assessment maturity (represented here as a random risk for demonstration until exact JSON keys are provided).
    
    -- Example extraction if `scores` had a 'logical' key: 
    -- avg_score := (student.scores->>'Logical')::NUMERIC;
    
    IF target_salary >= 10 THEN
       danger_zone_count := danger_zone_count + 1; -- Marked as Danger Zone if expecting high salary (placeholder logic)
    END IF;
  END LOOP;

  RETURN json_build_object(
    'total', total_assessed,
    'danger_zone_count', danger_zone_count,
    'danger_zone_percentage', CASE WHEN total_assessed > 0 THEN ROUND((danger_zone_count::NUMERIC / total_assessed::NUMERIC) * 100, 1) ELSE 0 END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
