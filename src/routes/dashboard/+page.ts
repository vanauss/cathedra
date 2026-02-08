import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        throw redirect(303, '/prihlaseni');
    }

    // Načteme projekty a profil uživatele zároveň
    const [projectsReq, profileReq] = await Promise.all([
        supabase.from('projects').select('*').eq('client_id', session.user.id),
        supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle()
    ]);

    return {
        projects: projectsReq.data || [],
        // Pokud profil neexistuje, pošleme prázdné hodnoty
        profile: profileReq.data || { full_name: '', phone: '', address: '' },
        user: session.user
    };
};