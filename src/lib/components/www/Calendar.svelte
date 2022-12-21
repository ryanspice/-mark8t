<script>
  import { _CALENDAR_URL_, _CALENDAR_IFRAME_ } from "../../stores.js";
  let url, iframe;
  _CALENDAR_URL_.subscribe((value) => {
    url = value;
  });
  _CALENDAR_IFRAME_.subscribe((value) => {
    iframe = value;
  });
</script>

<section id="section__calendar">
  <div>
    <h2>what is happening</h2>
    <h1>THIS MONTH</h1>
    <h3 />
    <iframe
      title="Google Calendar"
      src={iframe}
      width="100%"
      height="600"
      frameborder="0"
      scrolling="no"
    />
    <h3>
      <br />
      <a href={url} alt="download .ics file"
        >Download <br /> <i class="material-icons">download</i></a
      >
    </h3>
  </div>
</section>

<style>
  #section__calendar {
    margin: 0px auto;
    background: rgb(2, 34, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 00, 0, 1) 62%,
      rgba(0, 0, 0, 0.500437675070028) 87%,
      rgba(0, 0, 0, 0) 100%
    );

    height: 100vh;
    min-height: 320px;
    max-height: 1000px;

    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* font-family: Arial, Helvetica Neue, Helvetica, sans-serif; */
    font-size: 14px;
    padding-bottom: 6rem;
    overflow: hidden !important;
  }

  #section__calendar div {
    max-width: 720px;
    max-height: 690px;
    width: 100%;
    flex-grow: 1;
    margin: 0 auto;
    max-width: 900px;
  }

  h1 {
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  h2 {
    width: 100%;
    text-align: center;
    font-weight: lighter;
    padding-top: 3rem;
  }

  h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 4rem;
  }

  h3 i {
    font-size: 2.5rem;
  }

  iframe {
    filter: invert(0.9) saturate(0.5) hue-rotate(145deg);
    border: 0;
    border-radius: 3px;
  }
</style>
