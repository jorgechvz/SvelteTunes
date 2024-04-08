<script>
  import {
    status,
    isPlaying,
    audioPlayer,
    index,
    trackList,
    addTrack,
  } from "$lib/stores/store.js";
  import LoadingIcon from "$lib/components/ui/icons/loading-icon.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";

  export let controls = false;
  export let track = false;
  export let title = "";
  export let artist = "";
  export let file = "";
  export let image = "";

  function playTrack() {
    $audioPlayer.play();
    $isPlaying = true;
  }

  function pauseTrack() {
    $audioPlayer.pause();
    $isPlaying = false;
  }

  function loadTrack($index) {
    title = $trackList[$index].title;
    artist = $trackList[$index].artist;
	image = $trackList[$index].image;
    $audioPlayer.src = $trackList[$index].file;
    $audioPlayer.load();
  }

  function addAndPlayTrack() {
    addTrack({ title, artist, file, image });
    $index = $trackList.length - 1;
    // 		$currentTime = 0;
    // Load and play the new track
    loadTrack($index);
    playTrack();
  }
</script>

{#if controls}
  {#if $isPlaying === false}
    <button class="play-button controls" on:click={playTrack}>
      <div class="text-orange-700">
        <MdPlayArrow />
      </div>
    </button>
  {:else if $isPlaying === true && ($status === "waiting" || $status === "loading" || $status === "can play some" || $status === "can play all")}
    <button class="play-button controls" on:click={pauseTrack}>
      <LoadingIcon />
    </button>
  {:else if $isPlaying === true}
    <button class="play-button controls" on:click={pauseTrack}>
      <div class="text-orange-700 w-9">
        <MdPause />
      </div>
    </button>
  {/if}
{:else if track}
  {#if title !== $trackList[$index].title}
    <button class="play-button track" on:click={addAndPlayTrack}>
      <div class="text-orange-700">
        <MdPlayArrow />
      </div>
    </button>
  {:else if title === $trackList[$index].title && $isPlaying === true && ($status === "loading" || $status === "can play some" || $status === "can play all" || $status === "waiting")}
    <button class="play-button track border-primary" on:click={pauseTrack}>
      <LoadingIcon size={2.5} />
    </button>
  {:else if title === $trackList[$index].title && $isPlaying === true}
    <button class="play-button track border-primary" on:click={pauseTrack}>
      <div class="text-orange-700 w-9">
        <MdPause />
      </div>
    </button>
  {:else if title === $trackList[$index].title && $isPlaying === false}
    <button class="play-button track border-primary" on:click={playTrack}>
      <div class="text-orange-700">
        <MdPlayArrow />
      </div>
    </button>
  {/if}
{/if}

<style>
  .play-button {
    margin: 0;
    padding: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4rem;
    border: 1px solid #bbb;
    background: #fcfcfc;
  }

  .controls {
    width: 3rem;
    height: 3rem;
    border: 0;
  }

  .track {
    width: 2.5rem;
    height: 2.5rem;
  }
</style>
