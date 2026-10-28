const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const hasSupabase = Boolean(url && key)

// Client chargé à la demande (uniquement à l'envoi du formulaire) pour alléger la page
let client
export async function getSupabase() {
  if (!hasSupabase) return null
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js')
    client = createClient(url, key, { auth: { persistSession: false } })
  }
  return client
}
