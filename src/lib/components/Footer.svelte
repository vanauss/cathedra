<script lang="ts">
    let { year } = $props();
    import imgFooterBg from '$lib/assets/pics/O_nas-kostky.png?enhanced';
    import Obfuscate from '$lib/components/Obfuscate.svelte';
</script>

<footer>
    <div class="footer-bg-wrap">
        <enhanced:img src={imgFooterBg} alt="" />
    </div>

    <div class="footer-content">
        <div class="footer-body">
            <div class="business">
                <strong class="footer-title"></strong>
                <img src="/cathedra_logo.svg" alt="Cathedra zakázková výroba Praha a okolí  " width="120" fetchpriority="high" />
            </div>

            <div class="catalog">
                <strong class="footer-title">Business</strong>
                <ul>
                    <li><span class="no-link">Obchodní podmínky</span></li>
                    <li><span class="no-link">Vize</span></li>
                    <li><a href="/gdpr">Ochrana osobních údajů</a></li>
                    <li><a href="/gdpr">Cookies</a></li>
                </ul>
            </div>

            <div class="about">
                <strong class="footer-title">Odkazy</strong>
                <ul>
                    <li><a href="/o-nas">O nás</a></li>
                    <li><a href="/reference">Reference</a></li>
                    <li><a href="/poptavky">Poptávka</a></li>
                    <li><a href="/kontakty">Kontakt</a></li>
                </ul>
            </div>

            <div class="contact">
                <strong class="footer-title">Kontakt</strong>
                <ul>
                    <li>
                        <b>
                            <Obfuscate type="tel" value="147 984 406 024+" />
                        </b>
                    </li>
                    <li>
                        <b>
                            <Obfuscate type="email" value="zc.ardehtac@ofni" />
                        </b>
                    </li>
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
        align-items: start; /* Zarovnání obsahu sloupců nahoru [cite: 2026-02-01] */
    }

    /* CSS PRO VYSTŘEDĚNÍ LOGA [cite: 2026-02-01] */
    .business {
        display: flex;
        flex-direction: column;
        align-items: center; /* Horizontální střed v rámci sloupce [cite: 2026-02-01] */
        justify-content: center;
        height: 100%;
    }

    .footer-title { 
        display: block; 
        text-transform: uppercase; 
        margin-bottom: 1.5rem; 
        font-weight: 700; 
        font-size: 1rem;
        color: var(--main);
        min-height: 1.2rem; /* Rezerva pro prázdný nadpis u loga [cite: 2026-02-01] */
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

    b :global(.safe-link) {
        color: var(--main);
    }

    .contact ul{
        color: var(--main);
        background-color: var(--action);  }
</style>