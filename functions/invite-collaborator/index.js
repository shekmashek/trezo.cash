import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.js'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { p_invitee_email, p_role, p_permission_scope, p_project_ids } = await req.json()

    // Create a Supabase client with the user's auth token to get the inviter's ID
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY'),
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user: inviter } } = await supabaseClient.auth.getUser();
    if (!inviter) {
      throw new Error("Inviter not found.");
    }

    // Use the admin client to perform privileged operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    // 1. Find the user to invite by email in the auth schema
    const { data: inviteeData, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(p_invitee_email);
    
    if (userError || !inviteeData || !inviteeData.user) {
      return new Response(JSON.stringify({ message: "User does not exist, invitation not created." }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const inviteeId = inviteeData.user.id;

    // Prevent inviting self
    if (inviteeId === inviter.id) {
        return new Response(JSON.stringify({ error: `Vous ne pouvez pas vous inviter vous-même.` }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    // 2. Check if already a collaborator for this project
    const { data: existingCollaboration, error: checkError } = await supabaseAdmin
        .from('collaborators')
        .select('id')
        .eq('user_id', inviteeId)
        .contains('project_ids', p_project_ids)
        .limit(1)

    if (checkError) throw checkError;

    if (existingCollaboration && existingCollaboration.length > 0) {
        return new Response(JSON.stringify({ error: `Cet utilisateur est déjà un collaborateur sur ce projet.` }), {
            status: 409, // Conflict
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    // 3. Create the collaboration record
    const { data: newCollaborator, error: insertError } = await supabaseAdmin
      .from('collaborators')
      .insert({
        owner_id: inviter.id,
        user_id: inviteeId,
        email: p_invitee_email,
        role: p_role,
        permission_scope: p_permission_scope,
        project_ids: p_project_ids,
        status: 'accepted' // Grant access immediately
      })
      .select()
      .single()

    if (insertError) throw insertError;

    return new Response(JSON.stringify(newCollaborator), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in invite-collaborator function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
