-- Add chat_count column to profiles if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS chat_count INTEGER DEFAULT 0;

-- Update trigger function to protect both chatbot_paid and chat_count
CREATE OR REPLACE FUNCTION public.check_chatbot_paid_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- If chatbot_paid or chat_count is modified and the user role is not service_role, prevent the action.
  IF (OLD.chatbot_paid IS DISTINCT FROM NEW.chatbot_paid) OR 
     (OLD.chat_count IS DISTINCT FROM NEW.chat_count AND NEW.chat_count < OLD.chat_count) THEN
    -- Note: We allow service_role to update it, and we block authenticated clients from decrementing or tampering.
    IF auth.role() <> 'service_role' THEN
      RAISE EXCEPTION 'Unauthorized: Only service_role can modify payment status or reset chat limits';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
