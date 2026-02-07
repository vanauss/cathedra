<script lang="ts">
    let { session, pathname, logout } = $props();
</script>

<nav>
    <div class="logo">
        <a href="/">
            <img src="/cathedra_logo.svg" alt="Cathedra logo" width="120" fetchpriority="high" />
        </a>
    </div>

    <div class="menu">
        <ul>
            <li><a href="/o-nas" class:active={pathname === '/o-nas'}>O nás</a></li>
            <li><a href="/reference" class:active={pathname === '/reference'}>Reference</a></li>
            <li><a href="/poptavky" class:active={pathname === '/poptavky'}>Poptávky</a></li>
            <li><a href="/kontakty" class:active={pathname === '/kontakty'}>Kontakt</a></li>
            <li>
                <a href={session ? "/dashboard" : "/prihlaseni"} 
                   class="client-link" 
                   class:active={pathname.includes('dashboard') || pathname === '/prihlaseni'}>
                    KLIENTSKÁ SEKCE
                </a>
            </li>
            {#if session}
                <li><button onclick={logout} class="logout-btn">ODHLÁSIT SE</button></li>
            {/if}
        </ul>
    </div>
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    min-height: 10vh;
    gap: 1rem;
  }

  /* LOGO - STEJNÝ EFEKT JAKO BUTTON */
  .logo {
    flex: 0 1 auto;
    margin-right: auto;
    transition: transform 0.2s ease;
  }

  .logo:hover {
    transform: scale(1.1);
  }

  .logo img {
    display: block;
  }

  .menu {
    flex: 1 1 400px;
    display: flex;
    justify-content: flex-end;
  }

  .menu ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1.5rem;
  }

  /* POLOŽKY MENU - STEJNÝ EFEKT JAKO BUTTON */
  .menu ul li {
    text-transform: uppercase;
    white-space: nowrap;
    transition: transform 0.2s ease;
  }

  .menu ul li:hover {
    transform: scale(1.1);
  }

  .menu ul li a, .logout-btn {
    text-decoration: none;
    color: inherit;
    display: inline-block; 
  }

  /* Aktivní link a logout tlačítko */
  .active {
    border-bottom: 2px solid var(--main);
    font-weight: bold;
  }

  .logout-btn {
    background: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: inherit;
    font-family: inherit;
    padding: 0;
  }

  @supports (width: 1cqw) {
    nav { container-type: inline-size; }
  }
</style>