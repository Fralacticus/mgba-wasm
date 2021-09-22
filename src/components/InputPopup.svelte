<script>
  import { getContext, onMount } from "svelte";

  export let onOkay = (a) => {};
  export let onCancel = () => {};

  let text = null;

  function _onCancel() {
    onCancel();
    close();
  }

  function _onOkay() {
    onOkay(text.toUpperCase());
    close();
  }

  const { close } = getContext("simple-modal");
  onMount(() => {
    let input = document.createElement("input");
    input.className = "bg-lightgray h-10 p-2 text-center uppercase";
    input.placeholder = "Type key";
    input.addEventListener("keydown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.key.startsWith("Arrow")) {
        text = e.key.substr(5);
        input.value = text;
      } else {
        text = e.key;
        input.value = text;
      }
    });
    document.getElementById("popupCont").appendChild(input);
    input.focus();
  });
</script>

<div class="flex flex-col items-center space-y-2">
  <p class="text-4xl">Pick what to bind:</p>
  <div
    class="flex-grow py-6 h-10 flex items-center justify-around "
    id="popupCont"
  />
  <div class="w-full text-xl flex justify-evenly">
    <button class="border-2 rounded-lg p-1" on:click={_onCancel}>
      Cancel
    </button>
    <button class="border-2 rounded-lg p-1" on:click={_onOkay}> Okay </button>
  </div>
</div>
