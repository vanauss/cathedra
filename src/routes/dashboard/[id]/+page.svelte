<script lang="ts">
    // Definujeme si, jak vypadá projekt, aby TS nepanikařil
    interface Project {
        id: string;
        title: string;
        status: string;
        progress_percentage: number;
        client_id: string;
    }

    // Definujeme data jako objekt, který obsahuje náš projekt
    export let data: { project: Project };

    // Reaktive proměnná pro snadný přístup
    $: project = data.project;
</script>

<div class="body-container">
    <div style="margin-bottom: 2em;">
        <a href="/dashboard" style="text-decoration: none; font-weight: bold; color: var(--main); text-transform: uppercase; font-size: 0.9rem;">
            ← Zpět na přehled zakázek
        </a>
    </div>
    
    {#if project}
        <h1 style="text-align: left; font-size: 4rem; margin-bottom: 0.5em;">{project.title}</h1>
        
        <div class="box-container white" style="padding: 3em; border: 2px solid var(--main); min-height: auto; display: block;">
            <h2 style="font-size: 1.5rem; margin-bottom: 1em;">DETAILNÍ SPECIFIKACE</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2em; margin-bottom: 2em;">
                <div>
                    <p style="font-size: 0.9rem; color: #666; margin: 0;">STAV PROJEKTU</p>
                    <p style="font-weight: bold; font-size: 1.2rem;">{project.status}</p>
                </div>
                <div>
                    <p style="font-size: 0.9rem; color: #666; margin: 0;">POSTUP VÝROBY</p>
                    <p style="font-weight: bold; font-size: 1.2rem;">{project.progress_percentage}%</p>
                </div>
            </div>

            <div style="background: var(--secondary); height: 12px; border: 1px solid var(--main); margin-bottom: 3em; position: relative; overflow: hidden;">
                <div style="background: var(--main); height: 100%; width: {project.progress_percentage}%; transition: width 1s ease-out;"></div>
            </div>
            
            <div style="border-top: 1px solid var(--secondary); padding-top: 2em;">
                <p>Zde budou nahrány technické výkresy, potvrzené objednávky a termíny montáže pro projekt <strong>{project.title}</strong>.</p>
                <p style="font-style: italic; color: #888; font-size: 1rem;">Dokumentace se připravuje...</p>
            </div>
        </div>
    {/if}
</div>