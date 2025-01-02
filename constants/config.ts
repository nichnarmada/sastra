const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key")
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anonymous Key")
}

export { clerkPublishableKey, supabaseUrl, supabaseAnonKey }
