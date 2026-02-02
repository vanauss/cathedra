<script lang="ts">
  import { fade, slide } from 'svelte/transition';

  // Svelte 5 Runes pro reaktivní stav
  let showBanner = $state(false);
  let showDetails = $state(false);

  let consent = $state({
    necessary: true,
    analytics: false,
    marketing: false
  });

  // $effect se spustí po vykreslení komponenty (nahrazuje onMount pro browser logiku)
  $effect(() => {
    const saved = localStorage.getItem('cookie-consent-settings');
    if (!saved) {
      showBanner = true;
      updateGoogleConsent({ analytics: false, marketing: false });
    } else {
      const parsed = JSON.parse(saved);
      consent.analytics = parsed.analytics;
      consent.marketing = parsed.marketing;
      updateGoogleConsent(parsed);
    }
  });

  function updateGoogleConsent(settings: { analytics: boolean, marketing: boolean }) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': settings.analytics ? 'granted' : 'denied',
        'ad_storage': settings.marketing ? 'granted' : 'denied',
        'ad_user_data': settings.marketing ? 'granted' : 'denied',
        'ad_personalization': settings.marketing ? 'granted' : 'denied'
      });
    }
  }

  function save(settings: { necessary: boolean, analytics: boolean, marketing: boolean }) {
    localStorage.setItem('cookie-consent-settings', JSON.stringify(settings));
    updateGoogleConsent(settings);
    showBanner = false;
  }

  // Funkce využívající reaktivní stav
  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save(consent);
</script>

{#if showBanner}
  <div class="cookie-full-width" transition:slide={{ axis: 'y' }}>
    <div class="container">
      <div class="main-content">
        <div class="text">
          <h3>Nastavení soukromí</h3>
          <p>
            Tento web používá cookies k analýze návštěvnosti a personalizaci obsahu. 
            Kliknutím na „Přijmout vše“ souhlasíte s jejich využíváním. [2026-01-31]
          </p>
        </div>
        
        <div class="main-buttons">
          <button onclick={acceptAll} class="btn-dark">Přijmout vše</button>
          <button onclick={rejectAll} class="btn-outline">Odmítnout vše</button>
          <button onclick={() => showDetails = !showDetails} class="btn-text">
            {showDetails ? 'Skrýt detaily ↑' : 'Přizpůsobit nastavení ↓'}
          </button>
        </div>
      </div>

      {#if showDetails}
        <div class="details-grid" transition:fade>
          <div class="option">
            <input type="checkbox" id="nec" checked disabled>
            <label for="nec"><strong>Nezbytné:</strong> Nutné pro chod webu.</label>
          </div>
          <div class="option">
            <input type="checkbox" id="ana" bind:checked={consent.analytics}>
            <label for="ana"><strong>Analytické:</strong> Pomáhají nám pochopit, co vás zajímá.</label>
          </div>
          <div class="option">
            <input type="checkbox" id="mark" bind:checked={consent.marketing}>
            <label for="mark"><strong>Marketingové:</strong> Pro lepší cílení reklam.</label>
          </div>
          <button onclick={saveCustom} class="btn-save">Uložit vybrané</button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Styly zůstávají stejné, protože Svelte 5 stále používá scoped CSS */
  .cookie-full-width {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #E2E8CE;
    z-index: 10000;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
    border-top: 1px solid rgba(0,0,0,0.1);
    font-family: 'Montserrat', sans-serif;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .main-content {
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  }

  .text h3 {
    margin: 0 0 0.2rem 0;
    font-size: 1rem;
    color: #333;
    text-transform: uppercase;
  }

  .text p {
    margin: 0;
    font-size: 0.85rem;
    color: #444;
  }

  .main-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    flex: 1 0 auto;
    justify-content: flex-end;
  }

  button {
    font-size: clamp(12px, 0.8rem, 14px);
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    border: 1px solid transparent;
    font-family: inherit;
  }

  .btn-dark { background-color: #333; color: white; }
  .btn-outline { background: transparent; border: 1px solid #333; color: #333; }
  .btn-text { background: transparent; border: 1px solid #333; color: #333; font-weight: 400; }

  .details-grid {
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.1);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #333;
    white-space: nowrap;
  }

  .btn-save {
    background-color: #333;
    color: white;
    margin-left: auto;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
</style>