<script lang="ts">
    import { fade } from 'svelte/transition';
    import ButtonSection from '$lib/components/ButtonSection.svelte';
</script>

<svelte:head>
    <link rel="preload" as="image" href="/pics/Desgn.png" fetchpriority="high" />
</svelte:head>

<main class="body-container" in:fade={{ duration: 800 }}>
    <div class="hero-home-content">
        <div class="hero-text">
            <h1>prvky <br> architektonické</h1>
        </div>

        <div class="hero-buttons">
            <ButtonSection />
        </div>
    </div>
</main>

<style>
    /* Styl zůstává stejný, jen jsme změnili tag v HTML */
    .body-container {
        height: calc(100vh - 150px);
        background: url('/pics/Desgn.png') no-repeat center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 1rem;
    }

    .hero-home-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .hero-text h1 {
        margin: 0;
        line-height: 1.1;
    }

    .hero-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>