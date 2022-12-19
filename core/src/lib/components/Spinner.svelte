<script>
import "./Spinner.scss";
let top = 511;
export let message = "loading";
let css = "color:black;";
</script>
<section>
<span class="spinner"
      style="width:100%;margin:0px auto;text-align:center;position:fixed;z-index:250;top:{top}px;color:white !important;">
             <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                 <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33"
                         r="30"></circle>
             </svg>
			 <h2 style={css}>{message}</h2>
         </span>
</section>