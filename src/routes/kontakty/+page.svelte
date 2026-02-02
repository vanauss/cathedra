<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import type { ActionData } from './$types';

    // Importy obrázků z assets [cite: 2026-02-01]
    import imgFacility from '$lib/assets/pics/Facility.png?enhanced';

    let { form }: { form: ActionData } = $props();

    const siteKey = "6LfpdVwsAAAAAO9j8GzLnE0hadHXQElD_JMN-Sls";
    
    let submitting = $state(false);
    let selectedFiles = $state<File[]>([]);
    let fileError = $state("");
    let formData = $state({ name: '', email: '', message: '', gdpr: false, typ_projektu: '' });

    // Svelte akce pro detekci viditelnosti na obrazovce [cite: 2026-02-01]
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

    // --- REAKTIVITA ---
    let isValidEmail = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
    let totalFilesSize = $derived(selectedFiles.reduce((acc, f) => acc + f.size, 0));
    let isSizeOk = $derived(totalFilesSize <= 25 * 1024 * 1024);

    let isInvalid = $derived(
        !formData.name.trim() || !isValidEmail || !formData.message.trim() || 
        !formData.typ_projektu || !formData.gdpr || submitting || !isSizeOk
    );

    let statusDisplay = $derived.by(() => {
        if (fileError) return { text: fileError, type: 'error' };
        if (!isSizeOk) return { text: "Celková velikost přesahuje 25 MB!", type: 'error' };
        if (selectedFiles.length === 0) return { text: "Nebyla vybrána žádná příloha", type: 'neutral' };
        return { text: `Přílohy OK: ${(totalFilesSize / (1024 * 1024)).toFixed(2)} MB / 25 MB`, type: 'success' };
    });

    onMount(() => {
        formData.gdpr = false;
        formData.typ_projektu = "";
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        document.head.appendChild(script);
    });

    async function getRecaptchaToken() {
        return new Promise<string>((resolve) => {
            // @ts-ignore
            window.grecaptcha.ready(() => {
                // @ts-ignore
                window.grecaptcha.execute(siteKey, { action: 'contact' }).then(resolve);
            });
        });
    }

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newFiles = target.files ? Array.from(target.files) : [];
        fileError = "";
        if (selectedFiles.length + newFiles.length > 4) {
            fileError = "Maximálně lze nahrát 4 soubory.";
            return;
        }
        selectedFiles = [...selectedFiles, ...newFiles];
        target.value = ""; 
    };

    const removeFile = (index: number) => {
        selectedFiles = selectedFiles.filter((_, i) => i !== index);
        fileError = "";
    };
</script>

<div class="body-container" in:fade>
    <h1 class="reveal-text" use:reveal>Kontakty</h1>

    <main class="box-container person-card-wrapper reveal-section" use:reveal>
        <div class="image-container centered-content">
            <enhanced:img src={imgFacility} alt="Facility design" />
        </div>

        <div class="text-container contact-person-box">
            <h2>Kontaktní osoba</h2>
            
            <div class="person-profile">
                <div class="profile-img-wrapper reveal-item" use:reveal>
                    <img src="https://i.pinimg.com/236x/e0/72/f9/e072f9c6a11e7bd80727ee306e4211ac.jpg" alt="Jakub Müller" class="profile-img" />
                </div>
                
                <div class="profile-info">
                    <ul class="contact-list">
                        <li class="name-row reveal-item" use:reveal style="transition-delay: 0.1s">
                            <img src="/pics/ico/user.svg" alt="" class="ico" />
                            <span>Jakub Müller</span>
                        </li>
                        <li class="reveal-item" use:reveal style="transition-delay: 0.2s">
                            <a href="tel:+420604489741" class="contact-link">
                                <img src="/pics/ico/phone.svg" alt="" class="ico" />
                                <b>+420 604 489 741</b>
                            </a>
                        </li>
                        <li class="reveal-item" use:reveal style="transition-delay: 0.3s">
                            <a href="mailto:info@cathedra.cz" class="contact-link">
                                <img src="/pics/ico/mail.svg" alt="" class="ico" />
                                <b>info@cathedra.cz</b>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <div class="grid-wrapper">
        <div class="left-column">
            <section class="info-block reveal-section" use:reveal>
                <h3>SOCIALS</h3>
                <div class="social-grid">
                    <a href="https://facebook.com/..." target="_blank" class="social-link reveal-item" title="Facebook" use:reveal style="transition-delay: 0.1s">
                        <img src="/pics/ico/facebook.svg" alt="FB" class="social-ico" />
                    </a>
                    <a href="https://instagram.com/..." target="_blank" class="social-link reveal-item" title="Instagram" use:reveal style="transition-delay: 0.2s">
                        <img src="/pics/ico/instagram.svg" alt="IG" class="social-ico" />
                    </a>
                    <a href="ttps://ilinkedin.com/..." class="social-link reveal-item" title="LinkedIn" use:reveal style="transition-delay: 0.3s">
                        <img src="/pics/ico/linkedin.svg" alt="LinkedIn" class="social-ico" />
                    </a>
                </div>   
            </section>

            <section class="info-block reveal-section" use:reveal>
                <h3>FIREMNÍ ÚDAJE</h3>
                <ul class="company-list">
                    <li class="reveal-item" use:reveal style="transition-delay: 0.1s"><b>Ičo:</b> <br>02168961</li>
                    <li class="reveal-item" use:reveal style="transition-delay: 0.2s"><b>Adresa:</b> <br>Uhelná 1191 Kladno 27309</li>
                    <li class="reveal-item" use:reveal style="transition-delay: 0.3s"><b>Datová schránka:</b> <br>02168961</li>
                    <li class="reveal-item" use:reveal style="transition-delay: 0.4s"><b>Zápis v rejstříku:</b> <br>Zapsán v živnostenském rejstříku vedeném Magistrátem města Kladna</li>
                </ul>
            </section>
        </div>
                
        <div class="ContactForm reveal-section" use:reveal>
            <h3>KONTAKTNÍ FORMULÁŘ</h3>
            
            {#if form?.success}
                <div class="success-message-box" in:fade>
                    <div class="icon">✓</div>
                    <h2>Zpráva odeslána</h2>
                    <p>Děkujeme za váš zájem. Co nejdříve se vám ozveme zpět.</p>
                    <button class="btn-submit active" onclick={() => location.reload()}>POSLAT DALŠÍ DOTAZ</button>
                </div>
            {:else}
                <form 
                    method="POST" 
                    enctype="multipart/form-data" 
                    use:enhance={async ({ formData: data }) => {
                        submitting = true;
                        const token = await getRecaptchaToken();
                        data.append('recaptcha_token', token);
                        data.delete('attachment');
                        selectedFiles.forEach(f => data.append('attachment', f));
                        return async ({ update }) => { 
                            await update(); 
                            submitting = false; 
                        };
                    }} 
                    autocomplete="off"
                >
                    <input type="text" name="website" style="display:none !important" tabindex="-1" autocomplete="off" />

                    <div class="input-group reveal-item" use:reveal>
                        <label for="name">Jméno *</label>
                        <input type="text" name="name" id="name" required bind:value={formData.name} 
                               aria-invalid={formData.name.trim().length < 2}
                               class:live-error={formData.name.trim().length < 2}/>
                    </div>

                    <div class="input-group reveal-item" use:reveal style="transition-delay: 0.1s">
                        <label for="email">Email *</label>
                        <input type="email" name="email" id="email" required bind:value={formData.email} 
                               aria-invalid={!isValidEmail}
                               class:live-error={!isValidEmail}/>
                    </div>

                    <div class="input-group reveal-item" use:reveal style="transition-delay: 0.2s">
                        <label for="option">Předmět *</label>
                        <select name="typ_projektu" id="option" required bind:value={formData.typ_projektu}
                                aria-invalid={!formData.typ_projektu}
                                class:live-error={!formData.typ_projektu}>
                            <option value="" disabled selected>Vyberte...</option>
                            <option value="poptavka">Nová poptávka</option>
                            <option value="spoluprace">Spolupráce</option>
                            <option value="jine">Jiný dotaz</option>
                        </select>
                    </div>

                    <div class="input-group reveal-item" use:reveal style="transition-delay: 0.3s">
                        <label for="message">Zpráva *</label>
                        <textarea name="message" id="message" required bind:value={formData.message}
                                  aria-invalid={formData.message.trim().length < 5}
                                  class:live-error={formData.message.trim().length < 5}></textarea>
                    </div>

                    <div class="file-dropzone reveal-item" use:reveal style="transition-delay: 0.4s">
                        <label for="file-upload" class="dropzone-label">
                            {selectedFiles.length < 4 ? 'PŘIDAT PŘÍLOHU (MAX 4)' : 'LIMIT POČTU DOSAŽEN'}
                        </label>
                        <input id="file-upload" type="file" multiple onchange={handleFileChange} />
                        
                        {#if selectedFiles.length > 0}
                            <div class="selected-files-list" transition:slide>
                                {#each selectedFiles as file, i}
                                    <div class="file-item">
                                        <span>{file.name}</span>
                                        <button type="button" class="remove-btn" onclick={() => removeFile(i)}>✕</button>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <div class="status-msg" 
                         class:status-error={statusDisplay.type === 'error'}
                         class:status-success={statusDisplay.type === 'success'}>
                        {statusDisplay.text}
                    </div>

                    <div class="gdpr-wrapper reveal-item" use:reveal>
                        <div class="gdpr-box">
                            <input type="checkbox" id="gdpr" name="gdpr" required bind:checked={formData.gdpr} />
                            <label for="gdpr">Souhlasím se zpracováním <a href="/gdpr" class="gdpr-link">osobních údajů</a></label>
                        </div>
                    </div>

                    <button type="submit" class="btn-submit" class:active={!isInvalid} disabled={isInvalid}>
                        {#if submitting}
                            {totalFilesSize > 2 * 1024 * 1024 ? 'NAHRÁVÁM PŘÍLOHY...' : 'ODESÍLÁM...'}
                        {:else}
                            ODESLAT
                        {/if}
                    </button>

                    {#if form}
                        {#if !form.success}
                            <p class="error-text-bottom" in:fade>
                                {form.error || 'Nastala neočekávaná chyba. Zkuste to později.'}
                            </p> 
                        {/if}
                    {/if}
                </form>
            {/if}
        </div>
    </div>
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

    /* 1. GLOBÁLNÍ GRIDY A WRAPPERY */
    .grid-wrapper { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr)); 
        background-color: white; 
    }

    .info-block, .ContactForm { 
        padding: clamp(2rem, 5vw, 4rem); 
    }

    .ContactForm { background-color: var(--secondary); }

    /* 2. SEKCE VIZITKY */
    .person-card-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;      
        justify-content: center; 
        background-color: var(--secondary);
        padding: clamp(2rem, 8vw, 6rem);
        gap: clamp(2rem, 5vw, 5rem);
    }

    .image-container.centered-content {
        flex: 1 1 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-container :global(img) {
        max-width: 100%;
        height: auto;
    }

    .contact-person-box {
        flex: 1 1 450px;
        background: transparent;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .person-profile {
        display: flex;
        flex-direction: row;      
        flex-wrap: nowrap;        
        align-items: center;      
        gap: 2.5rem;
        margin-top: 2rem;
    }

    .profile-img-wrapper {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid var(--action);
        flex-shrink: 0;
    }

    .profile-img { width: 100%; height: 100%; object-fit: cover; }

    .contact-list {
        list-style: none;
        padding: 0 !important;    
        margin: 0 !important;
        border-left: none !important; 
    }

    .contact-list li {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .contact-link {
        display: flex;
        align-items: center;      
        gap: 10px;
        text-decoration: none;
        color: inherit;
    }

    .name-row {
        font-size: 1.5rem; 
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 0.5rem !important;
    }

    .ico { width: 24px; height: 24px; flex-shrink: 0; }

    /* 3. FORMULÁŘ */
    input, textarea, select {
        width: 100%;
        border: none;
        background: transparent;
        border-bottom: 2px solid var(--active);
        padding: 0.8rem 0;
        font-family: inherit;
    }

    .live-error { border-bottom-color: maroon !important; }

    .file-dropzone {
        border: 2px dashed var(--main);
        text-align: center;
        background: rgba(255,255,255,0.2);
        margin: 2rem 0;          
        padding: 2rem;
    }

    .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255,255,255,0.5);
        padding: 10px 15px;
        margin: 8px 0;
        border-radius: 4px;
    }

    .remove-btn {
        background: none;
        border: none;
        color: var(--action);
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 1;
        padding: 0 5px;
    }

    .gdpr-box {
        display: flex;
        flex-direction: row;      
        align-items: center;      
        gap: 12px;
        margin: 2.5rem 0;
    }

    .gdpr-box input[type="checkbox"] {
        width: 22px; height: 22px; flex-shrink: 0;
    }
    .gdpr-link{
        text-decoration: underline;
    }

    .company-list {
        list-style: none;
        padding-left: 1.5rem;
        border-left: 3px solid var(--main);
    }

    .company-list li {
        padding-bottom: 1.4rem; 
        display: flex;
        flex-direction: column;
    }

    .social-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 60px); 
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px; height: 60px;
        background: #f0f0f0;
        border-radius: 12px;
    }

    .btn-submit { 
        width: 100%; 
        padding: 1.2rem; 
        background-color: #ccc; 
        color: white; 
        border: none; 
        font-weight: bold; 
        letter-spacing: 2px; 
        transition: 0.3s; 
    }
    
    .btn-submit.active { 
        background-color: var(--action); 
        cursor: pointer; 
    }
</style>