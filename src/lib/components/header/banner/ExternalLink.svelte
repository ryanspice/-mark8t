<script>
  export let href;
  export let alt = '';
  export let icon = null;
  export let label = null;
  export let style = '';
  export let clickHandler = null;
  export let className = '';
</script>
<object title={href} class={className}>
  <a href={href} alt={alt} target="_blank" on:click={clickHandler}>
    <slot />
    {#if (icon)}<i class='material-icons' style={style}>{icon}</i>{/if}
    {#if (label)}<span style={style}>{label}</span>{/if}
  </a>
</object>
<style>
  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: inherit;
  }

  i {
    position: relative;
    top: 6px;
  }


  @media (max-width: 767px) {
    span {
      display: none;
    }
  }

  span {
    margin-left: 0.5rem;
  }
</style>
