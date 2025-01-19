/// <reference lib="deno.ns" />

// File: instagramStats.ts
import { createClient } from '@supabase/supabase-js'
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  try {
    if (!RAPIDAPI_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables')
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const apiUrl =
      'https://instagram-statistics-api.p.rapidapi.com/search?page=1&perPage=1000&sort=-score&locations=united-kingdom&socialTypes=INST%2CFB&trackTotal=true&isContactEmail=true'

    const response = await fetch(apiUrl, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()

    const { error } = await supabase
      .from('influencers_raw')
      .insert({ data, created_at: new Date().toISOString() })

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Data inserted successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
