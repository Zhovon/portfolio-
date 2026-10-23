"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/lib/supabase-browser"

// ============================================================
//  HOOK: useSkillsData
//  Fetches skills data from Supabase
// ============================================================

export function useSkillsData() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const supabase = createSupabaseBrowser()
        if (!supabase) {
          setLoading(false)
          return
        }
        const { data: fetchedData, error: fetchError } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true })

        if (fetchError) throw fetchError
        setData(fetchedData || [])
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch skills:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { data, loading, error }
}