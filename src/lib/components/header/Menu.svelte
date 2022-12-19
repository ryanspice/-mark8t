<script>
  import Logo from '../static/Logo.svelte';
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Mark8t', path: '/covid19' },
    { name: 'Software Solutions', path: '/software' },
    { name: 'Logo', path: '/' },
    { name: 'Partnership Program', path: '/partners' },
    { name: 'Contact Us', path: '/contact' },
  ];
</script>

<style>
  a {
    color: rgba(225,225,225,1) !important;

    -webkit-text-stroke: 0.1px var(--primary, #e4c79f);
    /* line-height: 3rem; */
    font-weight: bolder;
    text-transform:lowercase;

  }
  
  @media (min-width: 1424px) {

    a {
      font-size:125%;
    }

  }

  a:hover {
    -webkit-text-stroke: 1px var(--primary, #e4c79f);
    border-bottom: 0.5rem rgba(25,25,25,1);

    text-decoration: none;
  }

  li.active a {
    border-color: #48c7ec;
    color: #48c7ec;
  }
  svg {
    height: 246px;
    width: auto;
    margin-left: 25px;
    margin-top: -113px;
    margin-bottom: -142px;
  }


</style>

<nav id="menu" class="animated acrylic mdc-elevation--z24">
  <ul>
    {#each navigationItems as { name, path }, i}
      {#if i === 3}
        <li>
          <Logo />
        </li>
      {:else}
        <li>
          <a href={path}>{name}</a>
        </li>
      {/if}
    {/each}
  </ul>
</nav>
