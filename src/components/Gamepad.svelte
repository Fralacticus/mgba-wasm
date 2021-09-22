<script lang="ts">
  import type { Module } from "src/types/Module";
  import GenericButton from "./buttons/GenericButton.svelte";
  export let startedGame = false;
  export let Module: Module;
</script>

<div class="flex-grow grid grid-rows-3 grid-flow-col gap-0">
  <div class="h-full w-full " />
  <div
    class="h-full w-full flex justify-end items-center translate-x-1 md:translate-x-8"
  >
    <GenericButton
      class="w-14"
      {startedGame}
      pressFunc={() => Module._pressKeyLeft()}
      releaseFunc={() => Module._releaseKeyLeft()}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          transform="matrix(0 1 1 0 0 0)"
        />
        <path
          d="M24.2727 11.9231L16 20.1958L24.2727 28.4685"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </GenericButton>
  </div>
  <div class="h-full w-full " />
  <div
    class="h-full w-full flex justify-center items-end translate-y-7 md:translate-y-11 lg:translate-y-10"
  >
    <GenericButton
      class="w-14"
      {startedGame}
      pressFunc={() => Module._pressKeyUp()}
      releaseFunc={() => Module._releaseKeyUp()}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="39" height="39" />
        <path
          d="M11.9231 24.2727L20.1958 16L28.4685 24.2727"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </GenericButton>
  </div>
  <div class="h-full w-full " />
  <div
    class="h-full w-full flex justify-center items-start -translate-y-7 md:-translate-y-11 lg:-translate-y-10"
  >
    <GenericButton
      class="w-14"
      {startedGame}
      pressFunc={() => Module._pressKeyDown()}
      releaseFunc={() => Module._releaseKeyDown()}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <rect
          x="0.5"
          y="-0.5"
          width="39"
          height="39"
          transform="matrix(1 0 0 -1 0 39)"
        />
        <path
          d="M11.9231 15.7273L20.1958 24L28.4685 15.7273"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </GenericButton>
  </div>
  <div class="h-full w-full " />
  <div
    class="h-full w-full flex justify-start items-center -translate-x-1 md:-translate-x-8"
  >
    <GenericButton
      class="w-14"
      {startedGame}
      pressFunc={() => Module._pressKeyRight()}
      releaseFunc={() => Module._releaseKeyRight()}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-0.5"
          y="-0.5"
          width="39"
          height="39"
          transform="matrix(0 -1 -1 0 39 39)"
        />
        <path
          d="M15.7273 28.0769L24 19.8042L15.7273 11.5315"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </GenericButton>
  </div>
  <div class="h-full w-full " />
</div>
<div class="flex-grow flex gap-0 flex-shrink-0">
  <div class="h-full w-full  flex flex-col items-center justify-center">
    <GenericButton
      class="w-14 translate-y-6 md:self-end"
      {startedGame}
      pressFunc={() => Module._pressKeyB()}
      releaseFunc={() => Module._releaseKeyB()}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19.5" stroke="currentColor" />
        <path
          d="M17.2939 24.1239V14.1708H20.5479C21.6279 14.1708 22.4391 14.3941 22.9814 14.8407C23.5283 15.2873 23.8018 15.9481 23.8018 16.8231C23.8018 17.288 23.6696 17.7004 23.4053 18.0604C23.1409 18.4159 22.7809 18.6916 22.3252 18.8876C22.863 19.038 23.2868 19.3251 23.5967 19.7489C23.9111 20.1682 24.0684 20.6695 24.0684 21.2528C24.0684 22.146 23.779 22.8479 23.2002 23.3583C22.6214 23.8687 21.8034 24.1239 20.7461 24.1239H17.2939ZM18.6064 19.4686V23.0507H20.7734C21.3841 23.0507 21.8649 22.8934 22.2158 22.579C22.5713 22.26 22.749 21.8225 22.749 21.2665C22.749 20.0679 22.0973 19.4686 20.7939 19.4686H18.6064ZM18.6064 18.4159H20.5889C21.1631 18.4159 21.6211 18.2723 21.9629 17.9852C22.3092 17.6981 22.4824 17.3085 22.4824 16.8163C22.4824 16.2694 22.3229 15.8729 22.0039 15.6268C21.6849 15.3762 21.1995 15.2509 20.5479 15.2509H18.6064V18.4159Z"
          fill="currentColor"
        />
      </svg>
    </GenericButton>
  </div>
  <div class="h-full w-full  flex flex-col items-center justify-center">
    <GenericButton
      class="w-14 -translate-y-6 md:self-start"
      {startedGame}
      pressFunc={() => Module._pressKeyA()}
      releaseFunc={() => Module._releaseKeyA()}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19.5" />
        <path
          d="M22.0407 21.5262H17.8708L16.9342 24.1239H15.5807L19.3815 14.1708H20.5299L24.3376 24.1239H22.9909L22.0407 21.5262ZM18.2672 20.4462H21.651L19.9557 15.7909L18.2672 20.4462Z"
          fill="currentColor"
        />
      </svg>
    </GenericButton>
  </div>
</div>
