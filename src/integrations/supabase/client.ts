// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ncrwowuqelafxdsdhcmx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcndvd3VxZWxhZnhkc2RoY214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzA0NTcsImV4cCI6MjA1MTM0NjQ1N30.rXqZSZ8jixZHS9M8XGq637Cfw1RgtTaynH-Lvq0Izzs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);