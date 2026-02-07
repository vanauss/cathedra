<script lang="ts">
    let { year } = $props();
    
    // Import obrázku pro patičku z tvé nové složky assets [cite: 2026-02-01]
    import imgFooterBg from '$lib/assets/pics/O_nas-kostky.png?enhanced';
</script>

<footer>
    <div class="footer-bg-wrap">
        <enhanced:img src={imgFooterBg} alt="" />
    </div>

    <div class="footer-content">
        <div class="footer-body">
            <div class="business">
                <strong class="footer-title">Obchod</strong>
                <ul>
                    <li><a href="/katalog">Jak fungujeme?</a></li>
                    <li><span class="no-link">Obchodní podmínky</span></li>
                    <li><span class="no-link">Ochrana osobních údajů</span></li>
                </ul>
            </div>
            <div class="catalog">
                <strong class="footer-title">Katalog</strong>
                <ul>
                    <li><a href="/industrialni-okna">Industriální okna</a></li>
                    <li><a href="/schody">Terasové schody</a></li>
                    <li><a href="/drevene-skleniky">Dřevěné skleníky</a></li>
                </ul>
            </div>
            <div class="about">
                <strong class="footer-title">O nás</strong>
                <ul>
                    <li><a href="/o-nas">O nás</a></li>
                    <li><a href="/reference">Reference</a></li>
                    <li><a href="/poptavka">Poptávka</a></li>
                    <li><a href="/kontakty">Kontakt</a></li>
                </ul>
            </div>
            <div class="contact">
                <strong class="footer-title">Kontakt</strong>
                <ul>
                    <li><b><a href="tel:+420604489741">+420 604 489 741</a></b></li>
                    <li><b><a href="mailto:posta@cathedra.cz">posta@cathedra.cz</a></b></li>
                </ul>
            </div>
        </div>
        <small>Proudly made & design self by cathedra © {year}</small>
    </div>
</footer>

<style>
    footer {
        position: relative;
        background-color: var(--secondary);
        padding: 4em 2em;
        text-align: center;
        overflow: hidden;
    }

    /* Optimalizované pozadí */
    .footer-bg-wrap {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50%;
        z-index: 1;
        pointer-events: none;
    }

    .footer-bg-wrap :global(img) {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        object-position: bottom left;
    }

    .footer-content {
        position: relative;
        z-index: 2;
    }

    .footer-body {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
        grid-gap: 2rem;
        text-align: left;
        padding-bottom: 1em;
    }

    /* PŘEDĚLANÝ NADPIS Z H4 NA STRONG PRO PAGESPEED [cite: 2026-02-01] */
    .footer-title { 
        display: block; /* Nutné pro správné okraje */
        text-transform: uppercase; 
        margin-bottom: 1.5rem; 
        font-weight: 700; /* Využívá tvůj nahrátý font Montserrat-700 */
        font-size: 1rem;
        color: var(--main);
    }

    small { 
        display: block; 
        text-align: center; 
        margin-top: 3rem; 
    }
    
    ul {
        list-style: none;
        padding: 0 0 0 1rem;
        margin: 0;
        border-left: 0.15em solid var(--main);
    }

    li {
        margin-bottom: 0.8rem;
    }

    /* HOVER EFEKT PRO ODKAZY - STEJNÝ JAKO U BUTTONŮ [cite: 2026-02-01] */
    a {
        text-decoration: none;
        color: inherit;
        display: inline-block;
        transition: transform 0.2s ease;
    }

    a:hover {
        transform: scale(1.1);
    }

    .no-link {
        display: inline-block;
        opacity: 0.8;
    }

    b a {
        color: var(--main);
    }
</style>