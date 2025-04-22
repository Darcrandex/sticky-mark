import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_APP_SUPABASE_KEY || ''

export const db = createClient(supabaseUrl, supabaseKey)
