<script>
  import { base } from '$app/paths';
  import MediaQuery from 'svelte-media-queries'
  import { isOpen } from '../../stores.js';
  import Hours from './Hours.svelte';
  let open;
  isOpen.subscribe(value => {
    open = value;
  });
</script>
<style>
  section {

    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    section {
      overflow: hidden;
      position: fixed;
      top: -30px;
      right: -100px;
      z-index: 2;
    }
  }

  div {
    margin: 0px auto;
    margin-top: 2rem;
    margin-bottom: -2rem;
  }

  :root {
    --text-color: #f00;
    --border-color: #3da7f8;
    --animation-time: 1s;
    --text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 5px var(--text-color),
      0 0 10px var(--text-color), 0 0 10px var(--text-color),
      0 0 10px var(--text-color), 0 0 10px var(--text-color),
      0 0 20px var(--text-color), 0 0 30px var(--text-color),
      0 0 40px var(--text-color), 0 0 55px var(--text-color),
      0 0 75px var(--text-color);
    --box-shadow: inset 0 0 50px var(--border-color), 0 0 10px var(--border-color),
      0 0 20px var(--border-color), 0 0 30px var(--border-color);
  }

  div:not(.closed) {
    background-color: transparent;
    border: 3px solid rgba(255, 255, 255, 0.33);
    border-radius: 20px;
    padding: 14px 24px;
    transform: rotate(-6deg);
    animation: turnOnBorder 0.24s forwards step-end,
      flickerBorder calc(var(--animation-time) * 16) infinite step-end 1s;
  }

  p {
    font-family: Roboto;
    margin: 0px;
    color: #fff;
  }

  span {
    font-size: 100px;
  }

  p span {
    opacity: 0.33;
    animation: turnOn forwards step-end;
  }

  p span:nth-child(1) {
    animation-delay: 0.3s;
  }

  p span:nth-child(2) {
    animation-delay: 0.2s;
  }

  p span:nth-child(3) {
    animation-delay: 0.4s;
  }

  p span:nth-child(4) {
    animation: turnOn 0.27s forwards step-end,
      flicker var(--animation-time) infinite step-end 1s;
  }

  @keyframes turnOnBorder {
    100% {
      border: 3px solid #fff;
      box-shadow: var(--box-shadow);
      opacity: 1;
    }
  }

  @keyframes turnOn {
    100% {
      text-shadow: var(--text-shadow);
      opacity: 1;
    }
  }

  @keyframes flicker {
    0% {
      text-shadow: var(--text-shadow);
    }

    99% {
      text-shadow: none;
    }
  }

  @keyframes flickerBorder {
    0% {
      box-shadow: var(--box-shadow);
    }

    99% {
      box-shadow: none;
    }
  }

  div:not(.closed) {
    z-index: 3;
    transform: scale(0.4);
  }

  .closed {
    --animation-time: none;
    --text-color: black;
    --text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 5px var(--text-color),
      0 0 10px var(--text-color), 0 0 10px var(--text-color),
      0 0 10px var(--text-color), 0 0 10px var(--text-color),
      0 0 20px var(--text-color), 0 0 30px var(--text-color),
      0 0 40px var(--text-color), 0 0 55px var(--text-color),
      0 0 75px var(--text-color);
    width: 400px;
    transform: scale(0.4);
    text-shadow: none !important;

  }

  .closed>p,
  .closed>span {
    color: black !important;
    text-shadow: none !important;
  }
</style>
<section>
  {#if open}
  <div on:click={()=>{
    window.location = base+"/admin";
    }}>
    <p>
      <span>O</span>
      <span>P</span>
      <span>E</span>
      <span>N</span>
    </p>
  </div>
  {:else}
  <div class="closed" on:click={()=>{
    window.location = "/events";
    }}>
    <p>
      <span>C</span>
      <span>L</span>
      <span>O</span>
      <span>S</span>
      <span>E</span>
      <span>D</span>
    </p>
  </div>
  {/if}
  <MediaQuery query={['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)' , '(min-width: 1280px)' ]}
    let:matches>
    {@const [mobile, tablet, desktop] = matches}
    {#if (desktop)}
    <Hours />
    {/if}
  </MediaQuery>
</section>