import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    // V SvelteKit 5 (2026) používáme bezpečnou metodu z locals
    // Tato metoda interně volá getUser() a validuje session
    const { session, user } = await locals.safeGetSession(); 

    return {
        session,
        user
    };
};