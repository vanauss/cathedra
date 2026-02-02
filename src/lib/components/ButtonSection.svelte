<script lang="ts">
    import { fade } from 'svelte/transition';

    // Definice parametrů v Svelte 5
    let { items = [
        { href: '/o-nas', text: 'O nás', type: 'standard' },
        { href: '/katalog', text: 'katalog', type: 'action' }
    ] } = $props();
</script>

<div class="button-sekce" in:fade={{ duration: 800, delay: 500 }}>
    <main>
        {#each items as item}
            <button class={item.type === 'action' ? 'action-btn' : ''}>
                <a href={item.href}>{item.text}</a>
            </button>
        {/each}
    </main>
</div>

<style>
    /* Přesunul jsem sem tvoje CSS, aby bylo centrálně u komponenty */
    .button-sekce {
        display: grid;
        place-items: center;
    }

    button {
        background-color: transparent;
        font-weight: bold;
        border: 2px solid var(--main);
        margin: 0 10px; /* Přidán drobný rozestup mezi tlačítka */
        transition: transform 0.2s ease;
    }

    button a {
        color: var(--main) !important;
        text-decoration: none;
        padding: 10px 20px;
        display: inline-block;
    }
    
    /* Druhé tlačítko (nebo typ action) */
    button.action-btn {
        background-color: var(--action);
        border: 2px solid var(--action);
    }

    button:hover {
        transform: scale(1.1);
    }
</style>