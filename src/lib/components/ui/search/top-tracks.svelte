<script>
  export let bestTracks;
  export let setTab;
  import * as Table from "$lib/components/ui/table";
  import FaRegClock from "svelte-icons/fa/FaRegClock.svelte";
  import Track from "$lib/components/ui/commons/track.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { index, trackList } from "$lib/stores/store.js";
  $: playingTrackIndex =
    $trackList.length > 0
      ? bestTracks.data.findIndex(
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
</script>

<div class="flex items-center gap-4">
  <h2 class="font-bold text-2xl">Songs</h2>
  <Button
    class="py-[2px] px-5 bg-blue-500 text-white rounded-2xl"
    on:click={() => setTab("songs")}>View All</Button
  >
</div>
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
    {#each bestTracks.data.slice(0, 6) as track, i}
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
        >
          <a href="/artist/{track.artist.id}" class="hover:underline">
            {track.artist.name}
          </a>
        </Table.Cell>
        <Table.Cell
          class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}
        >
          <a href="/album/{track.album.id}" class="hover:underline">
            {track.album.title}
          </a>
        </Table.Cell>
        <Table.Cell
          class={`${i === playingTrackIndex ? "text-orange-500" : ""}`}
        >
          {convertTime(track.duration)}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
