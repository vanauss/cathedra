<script lang="ts">
    import { fade } from 'svelte/transition';
    import ButtonSection from '$lib/components/ButtonSection.svelte';

    // Importy obrázků z assets
    import imgFacility from '$lib/assets/pics/Facility.png?enhanced';
    import imgVez from '$lib/assets/pics/O_nas-vez_v2.png?enhanced';
    import imgWhyUs from '$lib/assets/pics/Why_us_v3.png?enhanced';
    
    import imgJakub from '$lib/assets/pics/team/jakub_portrait.jpg?enhanced';
    import imgPremek from '$lib/assets/pics/team/premek_portrait.jpg?enhanced';
    import imgMartin from '$lib/assets/pics/team/martin_portrait.jpg?enhanced';

    // Svelte akce pro detekci viditelnosti na obrazovce
    function reveal(node: HTMLElement) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    node.classList.add('visible');
                    observer.unobserve(node); // Animujeme jen jednou
                }
            });
        }, { threshold: 0.1 });

        observer.observe(node);
        return { destroy() { observer.unobserve(node); } };
    }
</script>

<div class="body-container" in:fade>
    <h1 class="reveal-text" use:reveal>O nás</h1>

    <section class="box-container person-card-wrapper reveal-section" use:reveal>
        <div class="image-container centered-content">
            <enhanced:img src={imgFacility} alt="Cathedra workshop" />
        </div>
        <div class="text-container contact-person-box">
            <h2>Navrhujeme, vyrábíme, konzultujeme</h2>
            <div class="hero-text-style">
                <p>Jdeme na to jinak. Jsme řemeslníci s citem pro detail, estetiku a poctivou práci. Umíme se nad tradičními technikami zamyslet z jiného úhlu.</p>
                <p>Zabýváme se <b>návrhem</b> a <b>vlastní výrobou</b> architektonických detailů z přírodních materiálů.</p>
                <p>Vše, co si navrhneme, také dokážeme vyrobit.</p>
            </div>
        </div>
    </section>

    <section class="box-container reverse white-bg reveal-section" use:reveal>
        <div class="image-container centered-content">
            <enhanced:img src={imgVez} alt="Kostky věž" class="scaled-image" />
        </div>
        <div class="text-container">
            <h2>Mnohogenerační zkušenosti</h2>
            <p class="intro-text">Řemeslo máme v genech. Jsme tým odborníků s mezigeneračními a zahraničními zkušenostmi.</p>
            
            <div class="sjednoceny-grid">
                <div class="grid-item reveal-item" use:reveal style="transition-delay: 0.1s">
                    <h3>Jsme detailisti a maximalisti</h3>
                    <p>Žádný detail není malý a žádná výzva není velká. Zvládneme malé prvky v zahradě až po komplexní výrobu.</p>
                </div>
                <div class="grid-item reveal-item" use:reveal style="transition-delay: 0.2s">
                    <h3>Vše pod jednou střechou</h3>
                    <p>Vymýšlíme věci tak, aby sloužily Vašim potřebám. Máme vše ve vlastní režii.</p>
                </div>
            </div>
        </div>
    </section>

    <h1 class="reveal-text" use:reveal>8x proč my</h1>
    
    <section class="box-container reveal-section" use:reveal>
        <div class="text-container">
            <div class="sjednoceny-grid">
                {#each [
                    { h: 'Vlastní klientský systém', p: 'Vidíte transparentně průběh zakázky, aktualizace z dílny i své faktury.' },
                    { h: 'Vlastní design', p: 'Vše designuje majitel Jakub Müller. Žádné kopírování trendů, jen úcta k historii.' },
                    { h: 'Udržitelná výroba', p: 'Veškerá výroba probíhá v našich dílnách z drtivé většiny z lokálních materiálů.' },
                    { h: '3 generace', p: '20+ let praxe. Víme, že na každém spoji a detailu záleží nejvíce.' }
                ] as item, i}
                    <div class="grid-item reveal-item" use:reveal style="transition-delay: {i * 0.1}s">
                        <h3>{item.h}</h3>
                        <p>{item.p}</p>
                    </div>
                {/each}
            </div>
        </div>
        <div class="image-container centered-content decorative-image">
            <enhanced:img src={imgWhyUs} alt="Why us" />
        </div>
    </section>

    <section class="cta-sekce reveal-section" use:reveal>
        <h1>Zaujalo Vás jak to děláme?</h1>
        <ButtonSection items={[
            { href: '/reference', text: 'PROHLÉDNOUT REFERENCE', type: 'standard' },
            { href: '/kontakty', text: 'NAPIŠTE NÁM', type: 'action' }
        ]} />
    </section>

    <h1 class="reveal-text" use:reveal>Náš tým</h1>
    <ul class="team-clean">
        {#each [
            { img: imgJakub, name: 'Jakub', desc: 'Zakladatel a kovář. <br> Řemeslník ve druhé generaci.' },
            { img: imgPremek, name: 'Přemek', desc: 'Mistr tesař <br> se zkušenostmi z USA.' },
            { img: imgMartin, name: 'Martin', desc: 'Mistr železa a kovů. <br> Preciznost je vším.' }
        ] as person, i}
            <li class="reveal-item" use:reveal style="transition-delay: {i * 0.15}s">
                <div class="portrait-wrap">
                    <enhanced:img src={person.img} alt={person.name} />
                </div>
                <div class="team-info">
                    <b>{person.name}</b>
                    <small>{@html person.desc}</small>
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    /* ANIMACE PŘI SROLOVÁNÍ [cite: 2026-02-01] */
    .reveal-section, .reveal-item, .reveal-text {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(.visible) {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Ostatní styly */
    .sjednoceny-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        grid-template-rows: auto auto;
        gap: 4rem 2.5rem;
        margin-top: 2rem;
    }

    .grid-item {
        display: grid;
        grid-row: span 2;
        grid-template-rows: subgrid;
        row-gap: 1rem;
    }

    .grid-item h3 {
        margin: 0;
        align-self: end;
        text-transform: uppercase;
        font-size: clamp(1.6rem, 2.5vw, 2.2rem);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.5px;
        color: var(--main);
    }

    .grid-item p {
        margin: 0;
        align-self: start;
        line-height: 1.6;
        font-size: 1.1rem;
        color: #444;
    }

    /* MODERNNÍ TÝM S HOVER EFEKTEM [cite: 2026-02-01] */
    .team-clean {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 4rem 2rem;
        padding: 4rem 0;
        list-style: none;
        margin: 0;
        text-align: center;
    }

    .team-clean li {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none !important;
        padding: 0 !important;
        cursor: default;
    }

    .portrait-wrap {
        width: 260px;
        aspect-ratio: 3 / 4;
        margin-bottom: 1.5rem;
        overflow: hidden;
        border-radius: 4px; /* Jemné zaoblení pro modernější vzhled */
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        transition: box-shadow 0.4s ease;
    }

    .portrait-wrap :global(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%);
        transition: filter 0.6s ease, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .team-clean li:hover .portrait-wrap {
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .team-clean li:hover :global(img) {
        filter: grayscale(0%);
        transform: scale(1.08); /* Jemný zoom portrétu [cite: 2026-02-01] */
    }

    .team-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        transition: transform 0.4s ease;
    }

    .team-clean li:hover .team-info {
        transform: translateY(-5px); /* Jméno se lehce přizvedne [cite: 2026-02-01] */
    }

    .team-clean b {
        font-size: 1.6rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--main);
    }

    .team-clean small {
        font-size: 1rem;
        line-height: 1.4;
        color: #555;
        max-width: 240px;
    }

    /* Layout prvky */
    .scaled-image :global(img) {
        max-height: 550px;
        width: auto;
        object-fit: contain;
    }

    .white-bg { background-color: white; }

    .cta-sekce {
        padding: clamp(3rem, 8vw, 6rem) 1.5rem;
        text-align: center;
       /* background-color: #f4f4f4;*/
        margin: 4rem 0;
    }

    .hero-text-style p { 
        font-size: clamp(1.1rem, 1.3vw, 1.4rem); 
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
</style>