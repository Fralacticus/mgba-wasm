<script>
  export let disabled = false;
  export let noHover = false;
  let hoverStyles =
    "cursor-pointer hover:text-pink active:text-white underline";
  let commonStyles = "select-none  w-min";
</script>

<li
  on:click
  class={disabled
    ? `text-white text-opacity-50 select-none`
    : noHover
    ? commonStyles
    : `${hoverStyles} ${commonStyles}`}
>
  <slot />
</li>
