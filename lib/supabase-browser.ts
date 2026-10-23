"use client"

import { createClient } from "@supabase/supabase-js"

// Create Supabase client for browser use
// This is used in components that need to fetch data on the client side
export const createSupabaseClient = (url?: string, anonKey?: string) => {
  const supabaseUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: typeof window !== "undefined" ? localStorage : undefined,
    },
  })
}

export const createSupabaseBrowser = () => {
  return createSupabaseClient()
}

// Type-safe wrapper for common queries
export type ProfileData = {
  id: string
  full_name: string
  github_handle: string | null
  twitter_handle: string | null
  bio: string | null
  avatar_url: string | null
  theme_preference: string
  reduced_motion: boolean
  custom_css: string | null
  created_at: string
  updated_at: string
}

export type ProjectData = {
  id: string
  title: string
  slug: string
  description: string
  long_description: string | null
  tech_stack: Array<{ name: string; level?: string }>
  image_url: string | null
  live_url: string | null
  github_url: string | null
  category: string | null
  metrics: Array<{ value: string; label: string }>
  challenges: Array<string>
  results: Array<string>
  sort_order: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export type SkillData = {
  id: string
  name: string
  level: string
  color_primary: string
  color_secondary: string
  description: string
  tech_stack: string[]
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export type AboutData = {
  id: string
  tagline: string
  title: string
  subtitle: string | null
  narrative: string
  avatar_url: string | null
  problem_solving: Array<{ id: string; title: string; description: string }>
  created_at: string
  updated_at: string
}

// Export configured client instance safely
let _cachedClient: ReturnType<typeof createSupabaseClient> = null
export const getSupabase = () => {
  if (!_cachedClient) {
    _cachedClient = createSupabaseClient()
  }
  return _cachedClient
}

export const supabase = typeof window !== 'undefined' ? createSupabaseClient() : null