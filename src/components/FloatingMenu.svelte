<script lang="ts">
  import { setUpInputMap } from "../libs/functions";

  import LinkListItem from "./LinkListItem.svelte";
  import InputPopup from "./InputPopup.svelte";
  import { getContext, onMount } from "svelte";
  import type { Module } from "src/types/Module";
  export let loadFile;
  export let saveFile;
  export let startedGame;
  export let currentKeys;
  export let Module: Module;
  export let exportMappings;
  export let importMappings;
  const { open } = getContext("simple-modal");

  let volumeSlider;
  let oldVolume = 1;

  let speed = 2;
  let incSpeed = () => {
    speed++;
    Module._setSpeed(speed);
  };
  let decSpeed = () => {
    speed--;
    if (speed < 2) speed = 2;
    Module._setSpeed(speed);
  };

  let onSetKey = (callback) => {
    console.log("onSetKey");
    let onOkay = (key) => {
      console.log(key);
      if (Object.values(currentKeys).some((x) => x === key)) return;
      callback(key);
      currentKeys = setUpInputMap(Module);
    };
    // @ts-ignore
    open(InputPopup, {
      onOkay,
    });
  };

  let setVolume = (e) => {
    oldVolume = e.target.value;
    Module._setVolume(e.target.value);
  };

  function onMute() {
    Module._mute();
    oldVolume = volumeSlider.value;
    volumeSlider.value = 0;
  }

  function onUnmute() {
    Module._unMute();
    volumeSlider.value = oldVolume;
  }
</script>

<div class="hidden lg:block mt-4 ml-4 space-y-6  w-min">
  <div class=" w-40 bg-purple rounded-t-xl ">
    <p class="flex justify-around text-lightPink py-1">Game Options</p>
    <div
      class="bg-darkPurple h-full text-purple p-2 leading-relaxed  whitespace-nowrap"
    >
      <ul class="px-2">
        <LinkListItem on:click={loadFile}>Load Game</LinkListItem>
        <LinkListItem on:click={saveFile}>Save Game</LinkListItem>
        <LinkListItem disabled={!startedGame}>Load SaveState</LinkListItem>
        <LinkListItem disabled={!startedGame}>Save SaveState</LinkListItem>
      </ul>
    </div>
  </div>
  <div class="w-40 bg-purple rounded-t-xl ">
    <p class="flex justify-around text-lightPink py-1">Input Mappings</p>
    <div
      class="bg-darkPurple h-full whitespace-nowrap text-purple p-2 leading-relaxed "
    >
      <ul class="px-2">
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyA))}
        >
          A {currentKeys.A ? `(${currentKeys.A})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyB))}
        >
          B {currentKeys.B ? `(${currentKeys.B})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyUp))}
        >
          Up {currentKeys.Up ? `(${currentKeys.Up})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyDown))}
        >
          Down {currentKeys.Down ? `(${currentKeys.Down})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyLeft))}
        >
          Left {currentKeys.Left ? `(${currentKeys.Left})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyRight))}
        >
          Right {currentKeys.Right ? `(${currentKeys.Right})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyStart))}
        >
          Start {currentKeys.Start ? `(${currentKeys.Start})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeySelect))}
        >
          Select {currentKeys.Select ? `(${currentKeys.Select})` : ""}
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => onSetKey(Module.setKeyForward))}
        >
          Forward {currentKeys.Forward ? `(${currentKeys.Forward})` : ""}
        </LinkListItem>
      </ul>
    </div>
  </div>
  <div class=" w-40 bg-purple rounded-t-xl ">
    <p class="flex justify-around text-lightPink py-1">Emulation Settings</p>
    <div
      class="bg-darkPurple h-full whitespace-nowrap text-purple p-2 leading-relaxed "
    >
      <ul class="px-2">
        <LinkListItem on:click={onMute}>Mute Sound</LinkListItem>
        <LinkListItem on:click={onUnmute}>Unmute Sound</LinkListItem>
        <div class="h-4" />
        <div class="text-pink">Forward Speed</div>
        <input class="hidden" type="number" step="1" bind:value={speed} />
        <div class="flex justify-between p-2">
          <button
            class="border h-10 w-10 text-pink borger-pink rounded"
            on:click={decSpeed}>-1</button
          >
          <p class="self-center font-bold text-xl">{speed}</p>
          <button
            class="border h-10 w-10 text-pink borger-pink rounded"
            on:click={incSpeed}>+1</button
          >
        </div>
        <div class="h-4" />
        <div class="text-pink">Set Volume</div>
        <input
          class="w-full"
          type="range"
          min="0"
          max="1"
          step="0.01"
          on:change={setVolume}
          bind:this={volumeSlider}
        />
      </ul>
    </div>
  </div>
  <div class=" w-40 bg-purple rounded-t-xl ">
    <p class="flex justify-around text-lightPink py-1">Other Options</p>
    <div
      class="bg-darkPurple h-full whitespace-nowrap text-purple p-2 leading-relaxed "
    >
      <ul class="px-2">
        <LinkListItem disabled>Load Cheats</LinkListItem>
        <LinkListItem disabled>Save Cheats</LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => importMappings())}
        >
          Import Mappings
        </LinkListItem>
        <LinkListItem
          disabled={!startedGame}
          on:click={startedGame && (() => exportMappings())}
        >
          Export Mappings
        </LinkListItem>
      </ul>
    </div>
  </div>
</div>
