<script>
  import {
    status,
    isPlaying,
    audioPlayer,
    index,
    trackList,
    addTrack,
  } from "$lib/stores/store.js";
  import PlayButton from "$lib/components/ui/commons/play-button.svelte";

  export let title;
  export let artist;
  export let file;
  export let image
  export let i;
  function selectTrack() {
    setTrack(i);
  }
</script>

<div class="info" class:playing={title === $trackList[$index].title}>
  <PlayButton track {title} {artist} {file} {image}/>
</div>

<style>
  .info {
    margin: 0;
    border: 0;
  }
</style>
