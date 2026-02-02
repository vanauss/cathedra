<script lang="ts">
    import { fade } from 'svelte/transition';
    import ButtonSection from '$lib/components/ButtonSection.svelte';

    // Importy obrázků z assets/pics/reference [cite: 2026-02-01]
    import logoHilton from '$lib/assets/pics/reference/hotel_hilton.svg';
    import logoDimSum from '$lib/assets/pics/reference/restaurace_dimsumspot.svg';
    import logoMlynec from '$lib/assets/pics/reference/restaurace_mlynec.svg';
    import logoZatisi from '$lib/assets/pics/reference/restaurace_v_zatisi.svg';
    import logoMaltez from '$lib/assets/pics/reference/rad_maltezskych_rytiru.svg';
    import logoTroja from '$lib/assets/pics/reference/trojsky_zamek_praha.svg';
    import logoKladno from '$lib/assets/pics/reference/mesto_kladno.svg';
    import logoSlany from '$lib/assets/pics/reference/mesto_Slany.svg';

    // Galerie vybraných prací - optimalizované přes enhanced
    import img1 from '$lib/assets/pics/reference/images/cathedra_1.jpg?enhanced';
    import img2 from '$lib/assets/pics/reference/images/cathedra_2.jpg?enhanced';
    import img3 from '$lib/assets/pics/reference/images/cathedra_3.jpg?enhanced';
    import img4 from '$lib/assets/pics/reference/images/cathedra_4.JPG?enhanced';
    import img5 from '$lib/assets/pics/reference/images/cathedra_5.JPG?enhanced';
    import img6 from '$lib/assets/pics/reference/images/cathedra_6.JPG?enhanced';
    import img7 from '$lib/assets/pics/reference/images/cathedra_7.JPG?enhanced';

    // Svelte akce pro detekci viditelnosti na obrazovce
    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('visible');
                    observer.unobserve(node); 
                }
            });
        }, { threshold: 0.1 });

        observer.observe(node);
        return { destroy() { observer.unobserve(node); } };
    }

    // Definice tlačítek pro ButtonSection podle tvé komponenty
    const ctaButtons = [
        { href: '/kontakty', text: 'KONTAKTUJTE NÁS', type: 'standard' },
        { href: '/poptavky', text: 'POPTEJTE NÁS!', type: 'action' }
    ];
</script>

<div class="body-container" in:fade>
    <h1 class="reveal-text" use:reveal>Reference</h1>
    
    <div class="clients-wrapper reveal-section" use:reveal>
        <ul class="clients">
            <li class="reveal-item" use:reveal><img src={logoHilton} alt="Hotel Hilton"><small>Hotel Hilton</small></li>
            <li class="reveal-item" use:reveal><img src={logoDimSum} alt="Dim sum spot"><small>Restaurace Dim sum spot</small></li>
            <li class="reveal-item" use:reveal><img src={logoMlynec} alt="Restaurace Mlýnec"><small>Restaurace Mlýnec</small></li>
            <li class="reveal-item" use:reveal><img src={logoZatisi} alt="Restaurace Zátiší"><small>Restaurace Zátiší</small></li>
            <li class="reveal-item" use:reveal><img src={logoMaltez} alt="Maltézští rytíři"><small>Velkopřevorství maltézských rytířů Praha</small></li>
            <li class="reveal-item" use:reveal><img src={logoTroja} alt="Trójský zámek"><small>Trójský zámek Praha</small></li>
            <li class="reveal-item" use:reveal><img src={logoKladno} alt="Město Kladno"><small>Město Kladno</small></li>
            <li class="reveal-item" use:reveal><img src={logoSlany} alt="Město Slaný"><small>Město Slaný</small></li>
        </ul>
        <h2 class="reveal-item" use:reveal>A mnoho dalších...</h2>
    </div>

    <h1 class="reveal-text" use:reveal>Galerie vybraných prací</h1>

    <main class="gallery">
        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img1} alt="Kovová zástěna pro soukromý rezidenční projekt" loading="lazy" />
            <p>Kovová zástěna pro soukromý rezidenční projekt</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img2} alt="Repase kovového zábradlí" loading="lazy" />
            <p>Repase kovového 5 patrového zábradlí v soukromé rezidenci</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img3} alt="Interiérové prvky pro kavárnu" loading="lazy" />
            <p>Interiérové prvky pro kavárnu</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img4} alt="Kolekce Republica" loading="lazy" />
            <p>Náš nábytek z kolekce Republica, Stool a Police 100</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img5} alt="Moderní nábytek" loading="lazy" />
            <p>Kolekce Republica, stolek Stool a Regal 45 v kombinaci s moderním nábytkem</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img6} alt="Křeslo Chairman" loading="lazy" />
            <p>Naše křeslo Chairman z kolekce Republica</p>
        </div>

        <div class="gallery-item reveal-section" use:reveal>
            <enhanced:img src={img7} alt="Modifikovaný regál" loading="lazy" />
            <p>Ukázka univerzálnosti našeho regálu 100 modifikovaného do police se sezením</p>
        </div>
    </main>

    <div class="contact-cta reveal-section" use:reveal>
        <h1>Máte zájem o naší spolupráci?</h1>
        <ButtonSection items={ctaButtons} />
    </div>
</div>

<style>
    /* ANIMACE PŘI SROLOVÁNÍ */
    .reveal-section, .reveal-item, .reveal-text {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(.visible) {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* GALERIE - PLNÁ ŠÍŘKA */
    .gallery {
        display: flex;
        flex-direction: column;
        gap: 5rem;
        width: 100%;
    }

    .gallery-item {
        width: 100%;
    }

    .gallery-item :global(picture), 
    .gallery-item :global(img) {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }

    .gallery p {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 1.1rem;
        color: #444;
        padding: 0 1rem;
    }

    /* SEKCE KLIENTI */
    .clients-wrapper {
        background-color: #E2E8CE;
        padding: 4rem 2rem;
        margin: 4rem 0;
    }

    .clients {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 4rem;
        justify-content: center;
        margin: 0 auto;
        padding: 0;
    }

    .clients li {
        display: grid;
        grid-template-rows: 120px auto;
        width: 150px;
        text-align: center;
    }

    .clients li img {
        max-width: 100%;
        max-height: 100px;
        height: auto;
        margin: auto;
        filter: grayscale(100%);
        transition: 0.3s ease;
    }

    .clients li:hover img {
        filter: grayscale(0%);
    }

    small {
        margin-top: 1rem;
        font-size: 0.85rem;
        line-height: 1.3;
        color: #333;
    }

    h2 {
        text-align: center;
        margin-top: 3rem;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* CTA SEKCE - BEZ POZADÍ */
    .contact-cta {
        padding: 8rem 2rem;
        text-align: center;
        background: transparent;
        margin-top: 2rem;
    }

    .contact-cta h1 {
        margin-bottom: 2rem;
    }
</style>