<script lang="ts">
    import { fly } from 'svelte/transition';

    // Svelte 5 Runes
    let isVisible = $state(false);

    $effect(() => {
        const handleScroll = () => {
            // Tlačítko se ukáže po 300px scrollu
            isVisible = window.scrollY > 300;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
</script>

{#if isVisible}
    <button 
        class="scroll-btn" 
        onclick={scrollToTop}
        transition:fly={{ y: 30, duration: 400 }}
        aria-label="Nahoru"
    >
        <img src="/pics/ico/arrow-up.svg" alt="Nahoru" class="icon" />
    </button>
{/if}

<style>
    .scroll-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--action);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        /* Sjednocení s efektem buttonů [cite: 2026-02-01] */
        transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .scroll-btn:hover {
        transform: scale(1.1);
        background-color: var(--main);
    }

    .icon {
        width: 30px;
        height: 30px;
        /* Magický filtr: udělá z tvojí zelené ikonky bílou */
        filter: brightness(0) invert(1);
        display: block;
        pointer-events: none;
    }

    /* Jemná animace šipky při kliknutí */
    .scroll-btn:active .icon {
        transform: translateY(-5px);
        transition: transform 0.1s ease;
    }
</style>