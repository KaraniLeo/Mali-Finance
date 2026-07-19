-- Add chatbot_paid column to profiles if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS chatbot_paid BOOLEAN DEFAULT FALSE;

-- Ensure chatbot_paid is default false and cannot be updated by normal authenticated users
CREATE OR REPLACE FUNCTION public.check_chatbot_paid_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- If chatbot_paid is modified and the user role is not service_role, prevent the action.
  IF (OLD.chatbot_paid IS DISTINCT FROM NEW.chatbot_paid) THEN
    -- Check if the current user role is service_role
    -- In Supabase, the API client uses 'authenticated' or 'anon' role. The admin client uses the service_role.
    IF auth.role() <> 'service_role' THEN
      RAISE EXCEPTION 'Unauthorized: Only admin/service_role can change chatbot payment status';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS tr_check_chatbot_paid_update ON public.profiles;

-- Create the trigger on profiles for update
CREATE TRIGGER tr_check_chatbot_paid_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_chatbot_paid_update();
