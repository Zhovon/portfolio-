"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/lib/supabase-browser"

// ============================================================
//  HOOK: useAboutSection
//  Fetches about section data from Supabase
// ============================================================

export function useAboutSection() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAbout() {
      try {
        const supabase = createSupabaseBrowser()
        if (!supabase) {
          setLoading(false)
          return
        }
        const { data: fetchedData, error: fetchError } = await supabase
          .from('about_sections')
          .select('*')
          .single()

        if (fetchError) throw fetchError
        setData(fetchedData)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch about section:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  return { data, loading, error }
}