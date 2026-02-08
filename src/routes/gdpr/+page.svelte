<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="legal-container" transition:fade>
    <section>
        <h1>Ochrana osobních údajů a cookies</h1>
        <p class="last-updated">Naposledy aktualizováno: 31. ledna 2026</p>

        <div class="content">
            <h2>1. Správce údajů</h2>
            <p>Správcem vašich osobních údajů je [Tvé Jméno/Název Firmy], se sídlem [Adresa], IČ: [IČO]. Kontaktovat nás můžete na e-mailu: [Váš Email].</p>

            <h2>2. Jaké údaje sbíráme?</h2>
            <p>Na našem webu zpracováváme údaje, které nám sami poskytnete prostřednictvím kontaktního formuláře (jméno, e-mail, telefon) za účelem vyřízení vaší poptávky.</p>

            <h2>3. Cookies a analytika</h2>
            <p>Používáme cookies k zajištění funkčnosti webu a s vaším souhlasem i pro analytické a marketingové účely (Google Analytics, Google Pixel).</p>
            <ul>
                <li><strong>Nezbytné cookies:</strong> Nutné pro technický chod webu. Nelze je vypnout.</li>
                <li><strong>Analytické cookies:</strong> Pomáhají nám anonymně sledovat návštěvnost a zlepšovat naše služby.</li>
                <li><strong>Marketingové cookies:</strong> Slouží k personalizaci reklam a měření jejich efektivity.</li>
            </ul>

            <h2>4. Vaše práva</h2>
            <p>Máte právo požadovat přístup k vašim údajům, jejich opravu, výmaz nebo vznést námitku proti zpracování. Souhlas s cookies můžete kdykoliv změnit promazáním historie prohlížeče nebo v nastavení naší cookie lišty.</p>
        </div>
    </section>
</div>

<style>
    .legal-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 4rem 2rem;
        line-height: 1.6;
        font-family: 'Lato', sans-serif;
        color: #333;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2.5rem;
        text-transform: uppercase;
        margin-bottom: 1rem;
        border-bottom: 3px solid #E2E8CE; /* Tvoje zelená */
        padding-bottom: 1rem;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        margin-top: 2.5rem;
        font-size: 1.3rem;
        color: #000;
    }

    .last-updated {
        font-style: italic;
        color: #666;
        margin-bottom: 3rem;
    }

    .content p {
        margin-bottom: 1.2rem;
    }

    ul {
        margin-bottom: 1.2rem;
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
    }
</style>