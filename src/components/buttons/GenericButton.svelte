<script>
  import { compute_rest_props } from "svelte/internal";

  export let pressFunc = () => {};
  export let releaseFunc = () => {};
  let touched = false;
  export let startedGame = true;
</script>

<button
  class={(touched ? "text-purple" : "active:text-purple") + ` ${$$props.class}`}
  on:mousedown={() => {
    startedGame && pressFunc();
  }}
  on:mouseup={() => {
    startedGame && releaseFunc();
  }}
  on:touchstart={(e) => {
    if (e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
      touched = true;
      startedGame && pressFunc();
    }
  }}
  on:touchend={(e) => {
    if (e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
      touched = false;
      startedGame && releaseFunc();
    }
  }}
>
  <slot />
</button>
