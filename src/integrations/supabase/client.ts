// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fuaspvtcgcnwtmxoqxzu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1YXNwdnRjZ2Nud3RteG9xeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2ODczMjgsImV4cCI6MjA1NzI2MzMyOH0.fEBBJPP58W2VOPJuzkT5CCSjdZThNZKWO4XlAE7K1UE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);