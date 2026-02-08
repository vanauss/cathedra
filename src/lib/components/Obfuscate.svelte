<script lang="ts">
    let { value = "", type = "email" } = $props();

    // Použijeme $derived, aby Svelte věděl, že tyto hodnoty závisí na props [cite: 2026-02-01]
    let decoded = $derived(value.split("").reverse().join(""));
    let prefix = $derived(type === "tel" ? "tel:" : "mailto:");
</script>

<a href="{prefix}{decoded}" class="safe-link">
    <span class="reverse">{value}</span>
</a>

<style>
    .safe-link {
        display: inline-flex;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s ease;
    }
    
    .safe-link:hover {
        transform: scale(1.1);
    }

    .reverse {
        unicode-bidi: bidi-override;
        direction: rtl;
        display: inline-block;
    }
</style>