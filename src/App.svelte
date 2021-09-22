<script lang="ts">
  import { getContext, onMount } from "svelte";
  import NavBar from "./components/NavBar.svelte";
  import type { Module } from "./types/Module";
  import { setUpInputMap } from "./libs/functions";
  import FloatingMenu from "./components/FloatingMenu.svelte";
  import LThumpButton from "./components/buttons/LThumpButton.svelte";
  import ForwardButton from "./components/buttons/ForwardButton.svelte";
  import RThumpButton from "./components/buttons/RThumpButton.svelte";
  import Gamepad from "./components/Gamepad.svelte";
  import Drawer from "./components/Drawer.svelte";
  import LinkListItem from "./components/LinkListItem.svelte";
  import GenericButton from "./components/buttons/GenericButton.svelte";

  let openDrawer = false;
  let currentKeys = {
    A: null,
    B: null,
    Start: null,
    Select: null,
    R: null,
    L: null,
    Up: null,
    Down: null,
    Left: null,
    Right: null,
    Forward: null,
  };

  let loaded = false;
  let startedGame = false;
  let Module: Module;
  let gameContainer: HTMLElement;

  function setSize(width, height) {
    // @ts-ignore
    Module._setSize(width, height);
  }

  let loadBuffer = (name: string, buffer: any) => {
    Module.FS.writeFile(name, new Uint8Array(buffer));
    Module.loadFile(name);

    setSize(gameContainer.clientWidth, gameContainer.clientHeight);
  };

  // Info: Creating Dom Elements in memory to allow for click to Upload on custom elements
  let inputer = document.createElement("input");
  inputer.type = "file";
  inputer.addEventListener("change", FileOpenSave);

  let inputerMappings = document.createElement("input");
  inputerMappings.type = "file";
  inputerMappings.addEventListener("change", FileOpenMappings);

  let loadFile = () => inputer.click();
  let linkSaver = document.createElement("a");

  function FileOpenMappings(e: Event) {
    // @ts-ignore
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      currentKeys = setUpInputMap(Module);
      volumeSlider.value = 1;
      oldVolume = 1;
      Module._setVolume(1);
    };
    reader.readAsText(file);
  }

  function FileOpenSave(e: Event) {
    // @ts-ignore
    let romFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      loadBuffer(romFile.name, e.target.result);
      startedGame = true;
      currentKeys = setUpInputMap(Module);
    };
    reader.readAsArrayBuffer(romFile);
  }

  let saveFile = () => {
    var save = Module.getSave();
    linkSaver.download = Module.saveName;
    var blob = new Blob([save], { type: "application/octet-stream" });
    linkSaver.href = URL.createObjectURL(blob);
    linkSaver.click();
  };

  function exportMappings() {
    linkSaver.download = "mappings.json";
    var blob = new Blob([JSON.stringify(currentKeys)], {
      type: "aplication/json",
    });
    linkSaver.href = URL.createObjectURL(blob);
    linkSaver.click();
  }

  function importMappings() {
    inputerMappings.click();
  }

  onMount(() => {
    Module = {
      canvas: (function () {
        return document.getElementById("canvas");
      })(),
    } as any;
    // @ts-ignore
    mGBA(Module).then(() => {
      // @ts-ignore
      window.Module = Module;

      loaded = true;
    });
  });

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

  let setVolume = (e) => {
    if (startedGame) Module._setVolume(e.target.value);
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

<Drawer
  open={openDrawer}
  size="75%"
  placement="left"
  on:clickAway={() => (openDrawer = false)}
>
  <div class="h-full w-full flex flex-col bg-darkPurple">
    <p class="bg-purple text-pink text-center pt-1 pb-2 h-10">mGBA</p>
    <div class=" bg-darkBlue ">
      <p class=" text-lightPink py-1 ml-4">Game Options</p>
      <div
        class="bg-darkPurple h-min text-purple p-2 leading-relaxed  whitespace-nowrap "
      >
        <ul class="px-2">
          <LinkListItem on:click={loadFile}>Load Game</LinkListItem>
          <LinkListItem on:click={saveFile}>Save Game</LinkListItem>
          <LinkListItem disabled>Load SaveState</LinkListItem>
          <LinkListItem disabled>Save SaveState</LinkListItem>
        </ul>
      </div>
    </div>

    <div class=" bg-darkBlue ">
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
    <div class="bg-darkBlue  ">
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
</Drawer>

<NavBar
  openDrawer={() => {
    console.log("open");
    openDrawer = true;
  }}
  {loadFile}
  {saveFile}
/>
<main
  class="bg-darkBlue flex  h-max relative justify-between flex-grow lg:pt-4"
>
  <FloatingMenu
    {...{
      loadFile,
      saveFile,
      startedGame,
      currentKeys,
      Module,
      exportMappings,
      importMappings,
    }}
  />
  <div class="flex flex-col place-items-start w-full lg:w-3/5 h-min">
    <div
      class="bg-black w-full   max-h-2/5 grid place-items-center h-2/5 "
      bind:this={gameContainer}
    >
      <canvas id="canvas" />
    </div>
    <div class="flex flex-col flex-grow w-full text-pink">
      <div class="p-2 flex justify-between flex-nowrap  ">
        <LThumpButton {startedGame} {Module} />
        <ForwardButton {startedGame} {Module} />
        <RThumpButton {startedGame} {Module} />
      </div>
      <div class="flex-grow  flex justify-evenly p-2 space-x-2 ">
        <Gamepad {...{ Module, startedGame }} />
      </div>
      <div
        class="flex-shrink-0 flex flex-col justify-center items-center space-y-4"
      >
        <GenericButton
          pressFunc={() => Module._pressKeyStart()}
          releaseFunc={() => Module._releaseKeyStart()}
          class="w-20"
        >
          <svg
            viewBox="0 0 91 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.499756"
              y="0.5"
              width="90"
              height="19"
              rx="9.5"
              stroke="currentColor"
            />
            <path
              d="M34.0879 10.5635C32.9622 10.2399 32.1419 9.84342 31.627 9.37402C31.1165 8.90007 30.8613 8.31673 30.8613 7.62402C30.8613 6.84017 31.1735 6.19303 31.7979 5.68262C32.4268 5.16764 33.2425 4.91016 34.2451 4.91016C34.9287 4.91016 35.5371 5.04232 36.0703 5.30664C36.6081 5.57096 37.0228 5.93555 37.3145 6.40039C37.6107 6.86523 37.7588 7.37337 37.7588 7.9248H36.4395C36.4395 7.32324 36.248 6.85156 35.8652 6.50977C35.4824 6.16341 34.9424 5.99023 34.2451 5.99023C33.598 5.99023 33.0921 6.13379 32.7275 6.4209C32.3675 6.70345 32.1875 7.09766 32.1875 7.60352C32.1875 8.00911 32.3584 8.35319 32.7002 8.63574C33.0465 8.91374 33.6322 9.16895 34.457 9.40137C35.2865 9.63379 35.9336 9.89128 36.3984 10.1738C36.8678 10.4518 37.2142 10.7777 37.4375 11.1514C37.6654 11.5251 37.7793 11.9648 37.7793 12.4707C37.7793 13.2773 37.4648 13.9245 36.8359 14.4121C36.207 14.8952 35.3662 15.1367 34.3135 15.1367C33.6299 15.1367 32.9919 15.0068 32.3994 14.7471C31.807 14.4827 31.349 14.1227 31.0254 13.667C30.7064 13.2113 30.5469 12.694 30.5469 12.1152H31.8662C31.8662 12.7168 32.0872 13.193 32.5293 13.5439C32.9759 13.8903 33.5706 14.0635 34.3135 14.0635C35.0062 14.0635 35.5371 13.9222 35.9062 13.6396C36.2754 13.3571 36.46 12.972 36.46 12.4844C36.46 11.9967 36.2891 11.6208 35.9473 11.3564C35.6055 11.0876 34.9857 10.8232 34.0879 10.5635ZM40.9854 5.8125V7.60352H42.3662V8.58105H40.9854V13.168C40.9854 13.4642 41.0469 13.6875 41.1699 13.8379C41.293 13.9837 41.5026 14.0566 41.7988 14.0566C41.9447 14.0566 42.1452 14.0293 42.4004 13.9746V15C42.0677 15.0911 41.7441 15.1367 41.4297 15.1367C40.8646 15.1367 40.4385 14.9658 40.1514 14.624C39.8643 14.2822 39.7207 13.7969 39.7207 13.168V8.58105H38.374V7.60352H39.7207V5.8125H40.9854ZM48.416 15C48.3431 14.8542 48.2839 14.5944 48.2383 14.2207C47.6504 14.8314 46.9486 15.1367 46.1328 15.1367C45.4036 15.1367 44.8044 14.9316 44.335 14.5215C43.8701 14.1068 43.6377 13.5827 43.6377 12.9492C43.6377 12.179 43.9294 11.582 44.5127 11.1582C45.1006 10.7298 45.9255 10.5156 46.9873 10.5156H48.2178V9.93457C48.2178 9.49251 48.0856 9.1416 47.8213 8.88184C47.557 8.61751 47.1673 8.48535 46.6523 8.48535C46.2012 8.48535 45.8229 8.59928 45.5176 8.82715C45.2122 9.05501 45.0596 9.33073 45.0596 9.6543H43.7881C43.7881 9.28516 43.918 8.92969 44.1777 8.58789C44.4421 8.24154 44.7975 7.9681 45.2441 7.76758C45.6953 7.56706 46.1898 7.4668 46.7275 7.4668C47.5798 7.4668 48.2474 7.68099 48.7305 8.10938C49.2135 8.5332 49.4642 9.11882 49.4824 9.86621V13.2705C49.4824 13.9495 49.569 14.4896 49.7422 14.8906V15H48.416ZM46.3174 14.0361C46.7139 14.0361 47.0898 13.9336 47.4453 13.7285C47.8008 13.5234 48.0583 13.2568 48.2178 12.9287V11.4111H47.2266C45.6771 11.4111 44.9023 11.8646 44.9023 12.7715C44.9023 13.168 45.0345 13.4779 45.2988 13.7012C45.5632 13.9245 45.9027 14.0361 46.3174 14.0361ZM55.04 8.73828C54.8486 8.70638 54.6413 8.69043 54.418 8.69043C53.5885 8.69043 53.0257 9.04362 52.7295 9.75V15H51.4648V7.60352H52.6953L52.7158 8.45801C53.1305 7.7972 53.7184 7.4668 54.4795 7.4668C54.7256 7.4668 54.9124 7.4987 55.04 7.5625V8.73828ZM58.2666 5.8125V7.60352H59.6475V8.58105H58.2666V13.168C58.2666 13.4642 58.3281 13.6875 58.4512 13.8379C58.5742 13.9837 58.7839 14.0566 59.0801 14.0566C59.2259 14.0566 59.4264 14.0293 59.6816 13.9746V15C59.349 15.0911 59.0254 15.1367 58.7109 15.1367C58.1458 15.1367 57.7197 14.9658 57.4326 14.624C57.1455 14.2822 57.002 13.7969 57.002 13.168V8.58105H55.6553V7.60352H57.002V5.8125H58.2666Z"
              fill="currentColor"
            />
          </svg>
        </GenericButton>
        <GenericButton
          class="w-20"
          pressFunc={() => Module._pressKeySelect()}
          releaseFunc={() => Module._releaseKeySelect()}
        >
          <svg
            viewBox="0 0 91 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.499756"
              y="0.5"
              width="90"
              height="19"
              rx="9.5"
              stroke="currentColor"
            />
            <path
              d="M29.0876 10.5635C27.962 10.2399 27.1417 9.84342 26.6267 9.37402C26.1163 8.90007 25.8611 8.31673 25.8611 7.62402C25.8611 6.84017 26.1733 6.19303 26.7976 5.68262C27.4265 5.16764 28.2423 4.91016 29.2449 4.91016C29.9285 4.91016 30.5369 5.04232 31.0701 5.30664C31.6078 5.57096 32.0225 5.93555 32.3142 6.40039C32.6104 6.86523 32.7585 7.37337 32.7585 7.9248H31.4392C31.4392 7.32324 31.2478 6.85156 30.865 6.50977C30.4822 6.16341 29.9421 5.99023 29.2449 5.99023C28.5977 5.99023 28.0919 6.13379 27.7273 6.4209C27.3673 6.70345 27.1873 7.09766 27.1873 7.60352C27.1873 8.00911 27.3582 8.35319 27.7 8.63574C28.0463 8.91374 28.6319 9.16895 29.4568 9.40137C30.2862 9.63379 30.9333 9.89128 31.3982 10.1738C31.8676 10.4518 32.2139 10.7777 32.4373 11.1514C32.6651 11.5251 32.7791 11.9648 32.7791 12.4707C32.7791 13.2773 32.4646 13.9245 31.8357 14.4121C31.2068 14.8952 30.366 15.1367 29.3132 15.1367C28.6296 15.1367 27.9916 15.0068 27.3992 14.7471C26.8067 14.4827 26.3487 14.1227 26.0251 13.667C25.7061 13.2113 25.5466 12.694 25.5466 12.1152H26.866C26.866 12.7168 27.087 13.193 27.5291 13.5439C27.9757 13.8903 28.5704 14.0635 29.3132 14.0635C30.0059 14.0635 30.5369 13.9222 30.906 13.6396C31.2751 13.3571 31.4597 12.972 31.4597 12.4844C31.4597 11.9967 31.2888 11.6208 30.947 11.3564C30.6052 11.0876 29.9854 10.8232 29.0876 10.5635ZM37.3386 15.1367C36.336 15.1367 35.5203 14.8086 34.8914 14.1523C34.2625 13.4915 33.948 12.6097 33.948 11.5068V11.2744C33.948 10.5407 34.087 9.88672 34.365 9.3125C34.6475 8.73372 35.0395 8.28255 35.5408 7.95898C36.0466 7.63086 36.5935 7.4668 37.1814 7.4668C38.143 7.4668 38.8904 7.78353 39.4236 8.41699C39.9568 9.05046 40.2234 9.95736 40.2234 11.1377V11.6641H35.2126C35.2309 12.3932 35.4428 12.9834 35.8484 13.4346C36.2585 13.8812 36.7781 14.1045 37.407 14.1045C37.8536 14.1045 38.2319 14.0133 38.5417 13.8311C38.8516 13.6488 39.1228 13.4072 39.3552 13.1064L40.1277 13.708C39.5079 14.6605 38.5782 15.1367 37.3386 15.1367ZM37.1814 8.50586C36.671 8.50586 36.2426 8.69271 35.8962 9.06641C35.5499 9.43555 35.3357 9.95508 35.2537 10.625H38.9587V10.5293C38.9223 9.88672 38.7491 9.38997 38.4392 9.03906C38.1293 8.68359 37.71 8.50586 37.1814 8.50586ZM43.0671 15H41.8025V4.5H43.0671V15ZM48.1667 15.1367C47.1641 15.1367 46.3484 14.8086 45.7195 14.1523C45.0906 13.4915 44.7761 12.6097 44.7761 11.5068V11.2744C44.7761 10.5407 44.9151 9.88672 45.1931 9.3125C45.4757 8.73372 45.8676 8.28255 46.3689 7.95898C46.8748 7.63086 47.4216 7.4668 48.0095 7.4668C48.9711 7.4668 49.7185 7.78353 50.2517 8.41699C50.7849 9.05046 51.0515 9.95736 51.0515 11.1377V11.6641H46.0408C46.059 12.3932 46.2709 12.9834 46.6765 13.4346C47.0867 13.8812 47.6062 14.1045 48.2351 14.1045C48.6817 14.1045 49.06 14.0133 49.3699 13.8311C49.6798 13.6488 49.9509 13.4072 50.1833 13.1064L50.9558 13.708C50.336 14.6605 49.4063 15.1367 48.1667 15.1367ZM48.0095 8.50586C47.4991 8.50586 47.0707 8.69271 46.7244 9.06641C46.378 9.43555 46.1638 9.95508 46.0818 10.625H49.7869V10.5293C49.7504 9.88672 49.5772 9.38997 49.2673 9.03906C48.9574 8.68359 48.5382 8.50586 48.0095 8.50586ZM55.488 14.1045C55.9392 14.1045 56.3334 13.9678 56.6707 13.6943C57.0079 13.4209 57.1947 13.0791 57.2312 12.6689H58.4275C58.4047 13.0928 58.2589 13.4961 57.99 13.8789C57.7211 14.2617 57.3611 14.5671 56.9099 14.7949C56.4633 15.0228 55.9893 15.1367 55.488 15.1367C54.4809 15.1367 53.6788 14.8018 53.0818 14.1318C52.4893 13.4574 52.1931 12.5368 52.1931 11.3701V11.1582C52.1931 10.4382 52.3253 9.79785 52.5896 9.2373C52.8539 8.67676 53.2322 8.24154 53.7244 7.93164C54.2211 7.62174 54.8067 7.4668 55.4812 7.4668C56.3106 7.4668 56.9988 7.71517 57.5457 8.21191C58.0971 8.70866 58.391 9.35352 58.4275 10.1465H57.2312C57.1947 9.66797 57.0125 9.27604 56.6843 8.9707C56.3608 8.66081 55.9597 8.50586 55.4812 8.50586C54.8386 8.50586 54.3396 8.73828 53.9841 9.20312C53.6332 9.66341 53.4578 10.3311 53.4578 11.2061V11.4453C53.4578 12.2975 53.6332 12.9538 53.9841 13.4141C54.335 13.8743 54.8363 14.1045 55.488 14.1045ZM61.5652 5.8125V7.60352H62.946V8.58105H61.5652V13.168C61.5652 13.4642 61.6267 13.6875 61.7498 13.8379C61.8728 13.9837 62.0824 14.0566 62.3787 14.0566C62.5245 14.0566 62.725 14.0293 62.9802 13.9746V15C62.6475 15.0911 62.324 15.1367 62.0095 15.1367C61.4444 15.1367 61.0183 14.9658 60.7312 14.624C60.4441 14.2822 60.3005 13.7969 60.3005 13.168V8.58105H58.9539V7.60352H60.3005V5.8125H61.5652Z"
              fill="currentColor"
            />
          </svg>
        </GenericButton>
      </div>
    </div>
  </div>
  <div class="hidden lg:block" />
</main>
<footer class="flex  justify-around">
  {#if loaded}
    <span
      id="version"
      class=" text-white bg-darkBlue w-full text-center h-full"
    >
      {Module.version.projectName + " " + Module.version.projectVersion}
    </span>
  {/if}
</footer>

<svelte:window
  on:resize={() => {
    if (!startedGame) return;
    setSize(gameContainer.clientWidth, gameContainer.clientHeight);
  }}
/>
