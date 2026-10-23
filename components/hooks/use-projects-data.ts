"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/lib/supabase-browser"

// ============================================================
//  HOOK: useProjectsData
//  Fetches projects data from Supabase
// ============================================================

export function useProjectsData() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createSupabaseBrowser()
        if (!supabase) {
          setLoading(false)
          return
        }
        const { data: fetchedData, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true })

        if (fetchError) throw fetchError
        setData(fetchedData || [])
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { data, loading, error }
}