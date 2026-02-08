<script lang="ts">
    import { supabase } from '$lib/supabaseClient';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let loading = false;
    let message = '';

    async function handleLogin() {
        loading = true;
        message = 'Ověřuji údaje...';
        
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            message = 'Chyba: ' + error.message;
            loading = false;
        } else {
            goto('/dashboard');
        }
    }
</script>

<main class="body-container">
    <div class="login-wrapper">
        <h1 style="text-align: center; margin-bottom: 0.5em;">PŘIHLÁŠENÍ</h1>
        <p style="text-align: center; margin-bottom: 3em; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
            Vstup do klientské sekce Cathedra
        </p>

        <div class="box-container white login-box">
            <form on:submit|preventDefault={handleLogin}>
                <div class="input-group">
                    <label for="email">E-MAIL</label>
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={email} 
                        placeholder="vas@email.cz" 
                        required 
                    />
                </div>

                <div class="input-group">
                    <label for="password">HESLO</label>
                    <input 
                        type="password" 
                        id="password" 
                        bind:value={password} 
                        placeholder="******" 
                        required 
                    />
                </div>

                <button type="submit" class="login-btn" disabled={loading}>
                    {loading ? 'PROSÍM ČEKEJTE...' : 'VSTOUPIT'}
                </button>

                {#if message}
                    <p class="status-message">{message}</p>
                {/if}
            </form>
        </div>
        
        <div style="text-align: center; margin-top: 2em;">
            <p style="font-size: 0.9rem; color: #666;">
                Nemáte přístupové údaje? <br>
                <a href="/kontakty" style="color: var(--main); font-weight: bold;">Kontaktujte svého projektového manažera.</a>
            </p>
        </div>
    </div>
</main>

<style>
    .login-wrapper {
        max-width: 450px;
        margin: 4em auto;
    }

    .login-box {
        padding: 3em;
        border: 2px solid var(--main);
        display: block; /* Aby box-container držel padding */
    }

    .input-group {
        margin-bottom: 2em;
        text-align: left;
    }

    .input-group label {
        display: block;
        font-weight: 900;
        font-size: 0.8rem;
        margin-bottom: 0.8em;
        color: var(--main);
    }

    input {
        width: 100%;
        padding: 1.2em;
        border: 2px solid var(--main);
        border-radius: 0;
        background: white;
        font-family: inherit;
        transition: border-color 0.2s;
    }

    input:focus {
        outline: none;
        border-color: var(--active);
    }

    .login-btn {
        background-color: var(--main);
        color: white !important;
        padding: 1.5em;
        border: none;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: background-color 0.3s;
    }

    .login-btn:hover {
        background-color: var(--active);
        color: var(--main) !important;
    }

    .login-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .status-message {
        margin-top: 1.5em;
        font-weight: bold;
        text-align: center;
        font-size: 0.9rem;
    }
</style>