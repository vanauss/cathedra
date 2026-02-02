<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import type { ActionData } from './$types';

    // Import obrazku z assets [cite: 2026-02-01]
    import imgPoptavka from '$lib/assets/pics/Cathedra_zakazkova_vyroba_praha.png?enhanced';

    let { form }: { form: ActionData } = $props();

    const siteKey = "6LfpdVwsAAAAAO9j8GzLnE0hadHXQElD_JMN-Sls";
    
    let submitting = $state(false);
    let selectedFiles = $state<File[]>([]);
    let fileError = $state("");
    let formData = $state({ name: '', email: '', message: '', gdpr: false, typ_projektu: '' });

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
                window.grecaptcha.execute(siteKey, { action: 'poptavka' }).then(resolve);
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
    <h1 class="reveal-text" use:reveal>Poptávka</h1>

    <main class="box-container person-card-wrapper reveal-section" use:reveal>
        <div class="image-container centered-content">
            <enhanced:img src={imgPoptavka} alt="Cathedra workshop" />
        </div>

        <div class="text-container contact-person-box">
            <h2>Práce v materiálu</h2>
            <div class="hero-text-style">
                <p>Naše práce stojí na poctivém řemesle a třech materiálech: <b>ocel, masivní dřevo a přírodní kámen.</b></p>
                <p>Pokud máte projekt, který vyžaduje technické řešení, zavolejte nám na <b><a href="tel:+420604489741" class="contact-link">+420 604 489 741</a></b>.</p>
            </div>
        </div>
    </main>

    <div class="grid-wrapper">
        <div class="left-column">
            <section class="info-block reveal-section" use:reveal>
                <h3>Jak postupovat?</h3>
                <div class="sjednoceny-grid">
                    <div class="grid-item reveal-item" use:reveal style="transition-delay: 0.1s">
                        <h4>Mám výkresy</h4>
                        <p>Pošlete nám dokumentaci. Posoudíme konstrukci a připravíme nabídku.</p>
                    </div>
                    <div class="grid-item reveal-item" use:reveal style="transition-delay: 0.2s">
                        <h4>Mám jen nápad</h4>
                        <p>Popište nám, co potřebujete. Společně vybereme materiály.</p>
                    </div>
                </div>
            </section>
        </div>
                
        <div class="ContactForm reveal-section" use:reveal>
            <h3>POPTÁVKOVÝ FORMULÁŘ</h3>
            
            {#if form?.success}
                <div class="success-message-box" in:fade>
                    <div class="icon">✓</div>
                    <h2>Poptávka odeslána</h2>
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

                    <div class="radio-group reveal-item" 
                         use:reveal
                         class:live-error={!formData.typ_projektu}
                         aria-invalid={!formData.typ_projektu}>
                        <label class="radio-option">
                            <input type="radio" name="typ_projektu" value="mam_navrh" bind:group={formData.typ_projektu} required />
                            <span>Mám připravený návrh / výkres</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="typ_projektu" value="chci_vymyslet" bind:group={formData.typ_projektu} required />
                            <span>Chci něco navrhnout a vymyslet</span>
                        </label>
                    </div>

                    <div class="input-group reveal-item" use:reveal style="transition-delay: 0.1s">
                        <label for="name">Jméno *</label>
                        <input type="text" name="name" id="name" required bind:value={formData.name} 
                               aria-invalid={formData.name.trim().length < 2}
                               class:live-error={formData.name.trim().length < 2}/>
                    </div>

                    <div class="input-group reveal-item" use:reveal style="transition-delay: 0.2s">
                        <label for="email">Email *</label>
                        <input type="email" name="email" id="email" required bind:value={formData.email} 
                               aria-invalid={!isValidEmail}
                               class:live-error={!isValidEmail}/>
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
                            ODESLAT POPTÁVKU
                        {/if}
                    </button>

                    {#if form?.error}
                        <p class="error-text-bottom" in:fade>
                            {form.error || 'Nastala neočekávaná chyba. Zkuste to později.'}
                        </p> 
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

    /* GLOBÁLNÍ GRIDY A WRAPPERY */
    .grid-wrapper { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr)); }
    .info-block, .ContactForm { padding: clamp(2rem, 5vw, 4rem); }
    .ContactForm { background-color: var(--secondary); }

    /* UNIFIKOVANÝ GRID PRO LEFT-COLUMN (PŘEJATO Z O NÁS) */
    .sjednoceny-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-template-rows: auto auto;
        gap: 2rem 2.5rem;
        margin-top: 2rem;
    }

    .grid-item {
        display: grid;
        grid-row: span 2;
        grid-template-rows: subgrid;
        row-gap: 0.8rem;
    }

    .grid-item h4 {
        margin: 0;
        align-self: end;
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: 800;
        color: var(--main);
    }

    .grid-item p {
        margin: 0;
        align-self: start;
        line-height: 1.6;
        font-size: 1rem;
        color: #444;
    }

    /* INPUTY A TEXTAREA */
    input, textarea {
        width: 100%; border: none; background: transparent;
        border-bottom: 2px solid var(--active); padding: 0.8rem 0; font-family: inherit;
        transition: border-color 0.3s ease;
    }

    .live-error { border-bottom-color: maroon !important; }

    .radio-group { 
        margin-bottom: 2rem; 
        display: flex; 
        flex-direction: column; 
        gap: 0.8rem; 
        padding: 0.8rem; 
        border: 2px solid transparent; 
        border-radius: 6px;
        transition: all 0.3s ease;
    }
    
    .radio-group.live-error { 
        border: 2px solid maroon !important;
        background: rgba(128, 0, 0, 0.05);
    }
    
    .radio-option { display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 0.9rem; }
    .radio-option input { width: 18px; height: 18px; cursor: pointer; }

    .status-msg { min-height: 1.2rem; margin-bottom: 1rem; font-size: 0.85rem; font-weight: bold; }
    .status-error { color: maroon; }
    .status-success { color: var(--main); }

    .file-dropzone { border: 2px dashed var(--main); text-align: center; background: rgba(255,255,255,0.2); margin: 2rem 0; padding: 2rem; }
    .file-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.5); padding: 10px 15px; margin: 8px 0; border-radius: 4px; }
    .remove-btn { background: none; border: none; color: var(--action); cursor: pointer; font-size: 1.5rem; line-height: 1; }

    .gdpr-box { display: flex; flex-direction: row; align-items: center; gap: 12px; margin: 2.5rem 0; }
    .gdpr-box input[type="checkbox"] { width: 22px; height: 22px; flex-shrink: 0; }
    .gdpr-link { text-decoration: underline; }

    .btn-submit { width: 100%; padding: 1.2rem; background-color: #ccc; color: white; border: none; font-weight: bold; letter-spacing: 2px; transition: 0.3s; }
    .btn-submit.active { background-color: var(--action); cursor: pointer; }

    .person-card-wrapper { display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: center; background-color: var(--secondary); padding: clamp(2rem, 8vw, 6rem); gap: clamp(2rem, 5vw, 5rem); }
    .image-container.centered-content { flex: 1 1 350px; display: flex; justify-content: center; }
    .image-container.centered-content :global(img) { max-width: 100%; height: auto; }
    .contact-person-box { flex: 1 1 450px; text-align: left; }
    .error-text-bottom { color: maroon; font-weight: bold; margin-top: 1rem; text-align: center; }

    .hero-text-style p { 
        font-size: clamp(1.1rem, 1.3vw, 1.4rem); 
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
</style>