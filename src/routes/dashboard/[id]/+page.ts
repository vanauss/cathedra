import { supabase } from '$lib/supabaseClient';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        throw redirect(303, '/prihlaseni');
    }

    const { data: project, error: dbError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .maybeSingle();

    if (dbError || !project) {
        throw error(404, 'Projekt nebyl nalezen');
    }

    return {
        project: project
    };
};