import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ujbpproefsmsfxrqszgq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnBwcm9lZnNtc2Z4cnFzemdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMTUzMjMsImV4cCI6MjA1MjY5MTMyM30.puaDCksD9dSz8PomBdlZlxA1DSED7ZHZWr6sZUKz-30";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
