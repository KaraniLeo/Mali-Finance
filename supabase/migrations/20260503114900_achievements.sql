CREATE TABLE public.achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_id TEXT NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements."
    ON public.achievements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements."
    ON public.achievements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Update profiles to track total lessons completed and streak more easily if needed.
-- (Assuming profiles already exists from previous setup)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS total_lessons_completed INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_tasks_completed INTEGER DEFAULT 0;
