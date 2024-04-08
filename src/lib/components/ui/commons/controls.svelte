<script>
  import Slider from "$lib/components/ui/commons/slider.svelte";
  import {
    status,
    isPlaying,
    audioPlayer,
    index,
    trackList,
  } from "$lib/stores/store.js";
  import { format } from "$lib/utilities.js";
  import PlayButton from "$lib/components/ui/commons/play-button.svelte";
  import { onMount } from "svelte";
  import MdVolumeUp from "svelte-icons/md/MdVolumeUp.svelte";
  import MdVolumeOff from "svelte-icons/md/MdVolumeOff.svelte";
  import MdVolumeDown from "svelte-icons/md/MdVolumeDown.svelte";

  let duration = 0;
  let currentTime = 0;
  let paused = true;
  let volume = 1;

  let slider;
  let rAF = null;

  let title, artist, src, image;

  // Use a reactive statement to update the track info whenever the index changes
  $: {
    title = $trackList[$index]?.title;
    artist = $trackList[$index].artist;
    src = $trackList[$index].file;
    image = $trackList[$index].image;
  }

  function whilePlaying() {
    slider.value = audio?.currentTime;
    currentTime = slider.value;
    rAF = requestAnimationFrame(whilePlaying);
  }

  function loadTrack($index) {
    title = $trackList[$index]?.title;
    artist = $trackList[$index].artist;
    image = $trackList[$index].image;
    $audioPlayer.src = $trackList[$index].file;
    $audioPlayer.load();
  }

  function playTrack() {
    $isPlaying = true;
    requestAnimationFrame(whilePlaying);
    $audioPlayer.play();
  }

  function pauseTrack() {
    $isPlaying = false;
    cancelAnimationFrame(rAF);
    $audioPlayer.pause();
  }

  function movePosition() {
    time = slider.value;
    if (!audio.paused) {
      cancelAnimationFrame(rAF);
    }
  }

  function updatePosition() {
    audio.currentTime = slider.value;
    if (!audio.paused) {
      requestAnimationFrame(whilePlaying);
    }
  }

  function previousTrack() {
    $isPlaying = false;
    currentTime = 0;
    if ($index > 0) {
      $index -= 1;
    } else {
      $index = $trackList.length - 1;
    }
    loadTrack($index);
    playTrack();
  }

  function nextTrack() {
    $isPlaying = false;
    currentTime = 0;
    if ($index < $trackList.length - 1) {
      $index += 1;
    } else {
      $index = 0;
    }
    loadTrack($index);
    playTrack();
  }

  onMount(() => {
    $audioPlayer.load();
  });
</script>

<audio
  bind:this={$audioPlayer}
  bind:duration
  bind:currentTime
  bind:paused
  bind:volume
  on:canplay={() => ($status = "can play some")}
  on:canplaythrough={() => ($status = "can play all")}
  on:waiting={() => ($status = "waiting")}
  on:timeupdate={() => ($status = "playing")}
  on:seeking={() => ($status = "seeking")}
  on:ended={() => {
    $isPlaying = false;
    currentTime = 0;
  }}
  {src}
/>

<div class="grid grid-cols-6 bg-primary text-white items-center px-6 py-4 fixed bottom-0 w-full">
  <div class="flex items-center gap-4 col-span-1">
    <div class="min-w-14">
      <img src={image} alt="Album cover for {title}" class="w-full" />
    </div>
    <div class="flex-col items-center">
      <div>
        <p class="font-bold text-lg">{title}</p>
      </div>
      <div>
        <p>{artist}</p>
      </div>
    </div>
  </div>

  <div class="col-span-4 px-60">
    <div class="flex gap-6 place-content-center mb-2">
      <button class="rounded-xl" on:click={previousTrack}>Prev</button>

      <PlayButton controls />

      <button class="rounded-xl" on:click={nextTrack}>Next</button>
    </div>
    <div class="flex items-center gap-6">
      <span>{format(currentTime)}</span>

      <div class="w-full">
        <Slider
          bind:this={slider}
          min={0}
          bind:value={currentTime}
          max={duration}
          step={0.01}
          precision={2}
          formatter={(v) => format(v)}
          on:input={movePosition}
          on:change={updatePosition}
        />
      </div>

      <span>{format(duration)}</span>
    </div>
  </div>
  <div class="flex col-span-1 gap-3 items-center">
    {#if volume > 0.5}
      <div class="w-9">
        <MdVolumeUp />
      </div>
    {:else if volume > 0}
      <div class="w-9">
        <MdVolumeDown />
      </div>
    {:else}
      <div class="w-9">
        <MdVolumeOff />
      </div>
    {/if}
    <div class="w-full">
      <Slider
        min={0}
        max={1}
        step={0.01}
        precision={2}
        formatter={(v) => Math.round(v * 100)}
        bind:value={volume}
      />
    </div>
  </div>
</div>
