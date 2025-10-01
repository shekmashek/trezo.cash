// This function is deprecated and no longer used in the new collaboration flow.
// Emails are not sent anymore. Access is granted directly if the user exists,
// or held in a 'pending' state until the user signs up.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.js'

serve(async (req) => {
  return new Response(JSON.stringify({ message: 'This function is deprecated and not in use.' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
