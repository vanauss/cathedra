import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import type { Session, User } from '@supabase/supabase-js';

export const handle: Handle = async ({ event, resolve }) => {
  /**
   * Inicializace izolovaného serverového klienta pro každý request.
   * Typy pro 'options' bereme přímo z globálních typů SvelteKitu,
   * což eliminuje potřebu importovat 'cookie'.
   */
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => event.cookies.get(name),
        // SvelteKit používá pro cookies interně tento typ, 
        // připsáním 'path' zajistíme funkčnost napříč celou doménou.
        set: (name, value, options) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        },
        remove: (name, options) => {
          event.cookies.delete(name, { ...options, path: '/' });
        }
      }
    }
  );

  /**
   * Bezpečný helper pro získání validované session na serveru.
   * getUser() je klíčový pro ochranu před podvrženými cookies.
   */
  event.locals.safeGetSession = async (): Promise<{
    session: Session | null;
    user: User | null;
  }> => {
    // 1. Krok: Serverová validace JWT přes auth server Supabase
    const { data: { user }, error: userError } = await event.locals.supabase.auth.getUser();

    if (userError || !user) {
      return { session: null, user: null };
    }

    // 2. Krok: Pokud je user v pořádku, načteme session
    const { data: { session } } = await event.locals.supabase.auth.getSession();

    return { session, user };
  };

  /**
   * filterSerializedResponseHeaders zajišťuje, aby klíčové hlavičky 
   * prošly skrze SvelteKit proxy až k uživateli.
   */
  return resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      ['content-range', 'x-supabase-api-version', 'etag', 'accept-ranges'].includes(name),
  });
};