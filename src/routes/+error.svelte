<script lang="ts">
    import { page } from '$app/state';
    import { fade } from 'svelte/transition';
</script>

<div class="error-page-content" in:fade={{ duration: 800 }}>
    <div class="hero-sekce-error">
        <h1>{page.status}. Chyba v konstrukci.</h1>
    </div>
    
    <p class="error-subtext">
        Tato cesta nikam nevede. Zkuste se vrátit domů.
    </p>

    <div class="button-sekce-error">
        <a href="/" class="btn-outline">Zpět na začátek</a>
    </div>
</div>

<style>
    .error-page-content {
        /* Používáme tvůj výpočet výšky */
        height: calc(100vh - 150px);
        background: url('/pics/404.png') no-repeat center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white; /* Aby byl text na tom pozadí vidět */
    }

    .hero-sekce-error h1 {
        font-size: clamp(3rem, 8vw, 6rem);
        margin: 0;
        line-height: 1.1;
    }

    .error-subtext {
        font-size: 1.5rem;
        margin: 2rem 0;
        max-width: 65ch;
        padding: 0 1rem;
    }

    .button-sekce-error {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }
</style>