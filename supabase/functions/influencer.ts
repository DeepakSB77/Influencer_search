import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface SearchParams {
  page?: number;
  perPage?: number;
  sort?: string;
  locations?: string[];
  socialTypes?: string[];
  minFollowers?: number;
  maxFollowers?: number;
  minEngagementRate?: number;
  maxEngagementRate?: number;
  gender?: string[];
  ageRange?: string[];
  interests?: string[];
  languages?: string[];
}

serve(async (req: Request) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }
      })
    }

    // Get search parameters from request body
    const searchParams: SearchParams = await req.json()

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: (searchParams.page || 1).toString(),
      perPage: (searchParams.perPage || 10).toString(),
      sort: searchParams.sort || '-score',
      trackTotal: 'true'
    })

    if (searchParams.locations?.length) {
      queryParams.append('locations', searchParams.locations.join(','))
    }

    if (searchParams.socialTypes?.length) {
      queryParams.append('socialTypes', searchParams.socialTypes.join(','))
    }

    if (searchParams.minFollowers) {
      queryParams.append('minFollowers', searchParams.minFollowers.toString())
    }

    if (searchParams.maxFollowers) {
      queryParams.append('maxFollowers', searchParams.maxFollowers.toString())
    }

    if (searchParams.minEngagementRate) {
      queryParams.append('minEngagementRate', searchParams.minEngagementRate.toString())
    }

    if (searchParams.maxEngagementRate) {
      queryParams.append('maxEngagementRate', searchParams.maxEngagementRate.toString())
    }

    if (searchParams.gender?.length) {
      queryParams.append('gender', searchParams.gender.join(','))
    }

    if (searchParams.ageRange?.length) {
      queryParams.append('ageRange', searchParams.ageRange.join(','))
    }

    if (searchParams.interests?.length) {
      queryParams.append('interests', searchParams.interests.join(','))
    }

    if (searchParams.languages?.length) {
      queryParams.append('languages', searchParams.languages.join(','))
    }

    const url = `https://instagram-statistics-api.p.rapidapi.com/search?${queryParams.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': Deno.env.get('RAPIDAPI_KEY') || '',
        'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com'
      }
    })

    const data = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        data 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
  }
}) 