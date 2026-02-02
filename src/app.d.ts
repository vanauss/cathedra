import { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
    namespace App {
        interface Locals {
            // Definujeme supabase klienta pro locals
            supabase: SupabaseClient;
            // Definujeme funkci, která ti v layout.server.ts svítí červeně
            safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
        }
        // interface Error {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};