-- Create challenges table
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 7,
    reward_amount INTEGER NOT NULL DEFAULT 0,
    progress INTEGER NOT NULL DEFAULT 0,
    target INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL CHECK (status IN ('active', 'pending_approval', 'completed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Parents can do everything with challenges they created
CREATE POLICY "Parents can manage their created challenges" ON public.challenges
    FOR ALL
    USING (auth.uid() = parent_id);

-- Children can view their assigned challenges
CREATE POLICY "Children can view their assigned challenges" ON public.challenges
    FOR SELECT
    USING (auth.uid() = child_id);

-- Children can update their assigned challenges (e.g. log progress)
CREATE POLICY "Children can update their assigned challenges" ON public.challenges
    FOR UPDATE
    USING (auth.uid() = child_id);
