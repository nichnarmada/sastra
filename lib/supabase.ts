import "react-native-url-polyfill/auto"
import { createClient } from "@supabase/supabase-js"
import { supabaseUrl, supabaseAnonKey } from "@/constants/config"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
