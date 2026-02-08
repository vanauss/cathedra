<script lang="ts">
    import { fade } from 'svelte/transition';

    // Definice parametrů v Svelte 5
    let { items = [
        { href: '/o-nas', text: 'O nás', type: 'standard' },
        { href: '/kontakty', text: 'Kontaktujte nás', type: 'action' }
    ] } = $props();
</script>

<div class="button-sekce" in:fade={{ duration: 800, delay: 500 }}>
    <div class="container">
        {#each items as item}
            <a href={item.href} class="custom-btn {item.type === 'action' ? 'action-btn' : 'standard-btn'}">
                {item.text}
            </a>
        {/each}
    </div>
</div>

<style>
    .button-sekce {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 2rem 0;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.2rem;
        width: 100%;
        max-width: 600px;
    }

    .custom-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 30px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;
        transition: transform 0.2s ease, background-color 0.2s ease;
        font-size: 0.9rem;
        letter-spacing: 1px;
        flex: 1 1 250px; 
        max-width: 100%;
    }

    .standard-btn {
        background-color: transparent;
        border: 2px solid var(--main);
        color: var(--main);
    }

    /* OPRAVA KONTRASTU PRO ACCESSIBILITY */
    .action-btn {
        background-color: var(--action);
        border: 2px solid var(--action);
        color: var(--main); 
    }

    .custom-btn:hover {
        transform: scale(1.1);
    }
</style>