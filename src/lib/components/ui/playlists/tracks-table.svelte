<script>
  import * as Table from "$lib/components/ui/table";
  import FaRegClock from "svelte-icons/fa/FaRegClock.svelte";
  import Track from "$lib/components/ui/commons/track.svelte";
  import { index, trackList, search } from "$lib/stores/store.js";
  export let playlist;
  $: playingTrackIndex =
    $trackList.length > 0
      ? playlist.tracks.data.findIndex(
          (track) =>
            track.title === $trackList[$index].title &&
            track.artist.name === $trackList[$index].artist
        )
      : -1;
  function convertTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  }
  $: filteredTracks = playlist.tracks.data.filter(
    (track) =>
      track.title.toLowerCase().includes($search.toLowerCase()) ||
      track.artist.name.toLowerCase().includes($search.toLowerCase()) ||
      track.album.title.toLowerCase().includes($search.toLowerCase())
  );
</script>

<Table.Root class="mt-10">
  <Table.Header>
    <Table.Row>
      <Table.Head>Song</Table.Head>
      <Table.Head>Artist</Table.Head>
      <Table.Head>Album</Table.Head>
      <Table.Head>
        <div class="w-4">
          <FaRegClock />
        </div>
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each filteredTracks as track, i}
      <Table.Row>
        <Table.Cell>
          <div class="flex items-center gap-3 group">
            <Track
              title={track.title}
              artist={track.artist.name}
              file={track.preview}
              image={track.album.cover_small}
              {i}
            />
            <div class="w-[42px]">
              <img
                src={track.album.cover_small}
                alt="Image for {track.title}"
                class="w-full"
              />
            </div>
            <p class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}>
              {track.title}
            </p>
          </div>
        </Table.Cell>
        <Table.Cell
          class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}
          >{track.artist.name}</Table.Cell
        >
        <Table.Cell
          class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}
          >{track.album.title}</Table.Cell
        >
        <Table.Cell
          class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}
          >{convertTime(track.duration)}</Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
