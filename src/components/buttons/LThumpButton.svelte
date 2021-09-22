<script>
  import GenericButton from "./GenericButton.svelte";

  export let Module;
  export let startedGame;
</script>

<GenericButton
  class="w-20"
  pressFunc={() => Module._pressKeyL()}
  releaseFunc={() => Module._releaseKeyL()}
  {startedGame}
>
  <svg
    stroke="currentColor"
    viewBox="0 0 71 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1H70.5M1.42121 1.29851V20.7015M1.42121 20.7015V21M1.42121 20.7015C3.92917 20.7015 6.41783 20.3908 8.77479 19.7834L66.5161 4.90319C68.655 4.35199 70.0788 2.91141 70.0788 1.29851M18 11V11.4954H10.8823V8V4.63113"
    />
  </svg>
</GenericButton>
