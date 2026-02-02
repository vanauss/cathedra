import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

// Definice modelů pro TypeScript
export interface Project {
    id: string;
    title: string;
    status: string;
    progress_percentage: number;
    client_id: string;
    created_at: string;
}

export interface Poptavka {
    id?: number;
    created_at?: string;
    jmeno: string;
    email: string;
    zprava: string;
}

// Struktura tvé Supabase databáze
export interface Database {
    public: {
        Tables: {
            projects: {
                Row: Project;
            };
            poptavky: {
                Row: Poptavka;
                Insert: Poptavka;
            };
        };
    };
}

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)