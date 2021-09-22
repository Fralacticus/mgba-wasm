<script>
  import GenericButton from "./GenericButton.svelte";

  export let Module;
  export let startedGame;
</script>

<GenericButton
  class="w-20"
  {startedGame}
  pressFunc={() => Module._pressKeyR()}
  releaseFunc={() => Module._releaseKeyR()}
>
  <svg viewBox="0 0 71 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <svg
      stroke="currentColor"
      viewBox="0 0 71 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M70 1H0.5M69.5788 1.29851V20.7015M69.5788 20.7015V21M69.5788 20.7015C67.0708 20.7015 64.5822 20.3908 62.2252 19.7834L4.48389 4.90319C2.34501 4.35199 0.921211 2.91141 0.921211 1.29851M60.1177 11.4954V8V4.63113C60.1177 4.63113 56.5 4.5 55.6943 4.63113C54.8885 4.76226 54 5.5 54.5 7C54.7723 7.81703 56.3798 8.04069 57.7871 8.07499M60 8C60 8 58.9634 8.10366 57.7871 8.07499M57.7871 8.07499L57 12"
      />
    </svg>
  </svg>
</GenericButton>
