import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hgarommhvwvvrhwvsebz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYXJvbW1odnd2dnJod3ZzZWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU5MTQ5NzUsImV4cCI6MTk4MTQ5MDk3NX0.-cGO4Y7FBa8ryrLo98QLcH4p-8SkzYLt0kmMYyQLh2o"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})