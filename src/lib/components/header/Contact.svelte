<script>
  import { base } from "$app/paths";
  import MediaQuery from "svelte-media-queries";
  import LinkedIn from "./banner/LinkedIn.svelte";
  import Twitter from "./banner/Twitter.svelte";
  import ExternalLink from "./banner/ExternalLink.svelte";
  import ExternalLinkShare from "../static/ExternalLinkShare.svelte";
  import Button from "@smui/button";
  import styles from "./Contact.svelte.scss";

  $: website = {};
  import {
    _API_STORE_WEBSITE_,
    fetchWebsiteInfoFromJson,
  } from "../../stores.js";
  _API_STORE_WEBSITE_.subscribe((value) => {
    website = value;
  });

  fetchWebsiteInfoFromJson();

  export let enabledLinkedin = false;
  export let enabledTwitter = true;
  export let enabledFacebook = true;
  export let enabledEmail = true;
  export let enabledPhone = true;
  export let enabledShare = true;

  export let align = "";
  let order = [4, 3, 0, 5, 5];
</script>

<MediaQuery
  query={[
    "(max-width: 768px)",
    "(min-width: 768px) and (max-width: 1280px)",
    "(min-width: 1280px)",
  ]}
  let:matches
>
  {@const [mobile, tablet, desktop] = matches}
  <div class="">
    <!-- -->
    <div class="">
      <ul class={"top-bar-info " + align}>
        <li />
        <li />
        <li />
        {#if enabledEmail}
          <li style={"order:" + order[0] + ";"}>
            <ExternalLink
              href={"mailto:" + website.siteContactEmail}
              icon="email"
              label={desktop ? website.siteContactEmail : ""}
              alt="Send Email"
            />
          </li>
        {/if}
        {#if enabledPhone}
          <li style={"order:" + order[1] + ";"}>
            <ExternalLink
              href={"tel:" + website.siteContactPhone}
              icon="phone"
              label={desktop ? website.siteContactPhone : ""}
              alt="Make a Call"
            />
          </li>
        {/if}
        {#if enabledFacebook}
          <li style={"order:" + order[2] + ";"}>
            <ExternalLink
              href={"https://" + website.siteContactFacebook}
              icon="facebook"
              alt="Facebook"
              style="top:3px;transform: scale(1.3);"
            />
          </li>
        {/if}
        {#if enabledShare}
          <li style={"order:" + order[3] + ";"}>
            <ExternalLinkShare />
          </li>
        {/if}
        {#if enabledLinkedin}
          <li style={"order:" + order[4] + ";"}>
            <ExternalLink href={website.siteContactLinkedIn} alt="LinkedIn">
              <LinkedIn />
            </ExternalLink>
          </li>
        {/if}
        <!-- <li>
              <ExternalLink href="website.siteTwitter" alt="Twitter">
                  <Twitter />
              </ExternalLink>
          </li> -->

        <li style={"order:233;position:relative;left:13vw;"}>
          <ExternalLink target="" href={base + "/retail "} alt="Order Now">
            <Button>Order Now</Button>
          </ExternalLink>
        </li>
      </ul>
    </div>
    <!-- -->
    <div>
      <div class="hidden link">
        <a
          href="https://tracercanada.b2clogin.com/tracercanada.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_susi&client_id=5ac16849-77f9-4b75-ad57-90c114601daf&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fapp.tracercanada.ca%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=IKmGZ5UtSNtu_89im46O5ZmLB25xZmFMEDLGIkezNFo"
          target="_blank"
          alt="Sign In to app.tracercanada.ca"
        >
          <button
            class="mdc-button mdc-button--outlined smui-button--color-primary "
          >
            <div class="mdc-button__ripple" />
            <span class="mdc-button__label">SIGN IN</span>
          </button>
        </a>
        <a
          href={"mailto:" + website.siteContactEmail}
          alt={"Sent mail to " + website.siteContactEmail}
        >
          <!-- reserve -->
          <button
            class=" mdc-button mdc-button--outlined smui-button--color-primary "
          >
            <div class=" mdc-button__ripple" />
            <span class="mdc-button__label hidden"
              >{desktop ? "BOOK AN EVENT/RESERVATION" : "RESERVE"}</span
            >
          </button>
        </a>
        <!-- <button class="mdc-button mdc-button--outlined smui-button--color-secondary ">
      <div class="mdc-button__ripple"></div>
      <div id='google_translate_element' style="z-index:2332323232323;position:relative;"></div>
    </button> -->
      </div>
    </div>

    <!-- Hacky Google Translate -->
    <!-- <script type='text/javascript'
  src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'></script>
<script type='text/javascript'>
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  }
</script> -->
  </div>
</MediaQuery>
