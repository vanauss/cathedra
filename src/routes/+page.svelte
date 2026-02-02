<script lang="ts">
    import { fade } from 'svelte/transition';
    import ButtonSection from '$lib/components/ButtonSection.svelte';
</script>

<div class="body-container" in:fade={{ duration: 800 }}>
    <div class="hero-home-content">
        <div class="hero-text">
            <h1>Řemeslo. <br /> V rovnováze s přírodou.</h1>
        </div>

        <div class="hero-buttons">
            <ButtonSection />
        </div>
    </div>
</div>

<style>
    .body-container {
        /* Výška i pozadí přesně podle tvé error stránky */
        height: calc(100vh - 150px);
        background: url('/pics/Desgn.png') no-repeat center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Vertikální centr */
        align-items: center;     /* Horizontální centr */
        text-align: center;
        padding: 0 1rem;
    }

    .hero-home-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem; /* Mezera mezi textem a tlačítky */
    }

    .hero-text h1 {
        /* Používáme tvůj fluidní clamp z globálního CSS */
        margin: 0;
        line-height: 1.1;
    }

    .hero-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>