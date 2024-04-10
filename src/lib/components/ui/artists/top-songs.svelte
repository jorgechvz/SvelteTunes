<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import FaRegClock from "svelte-icons/fa/FaRegClock.svelte";
  import Track from "$lib/components/ui/commons/track.svelte";
  import * as Table from "$lib/components/ui/table";
  import { index, trackList, currentPage } from "$lib/stores/store.js";
  import { convertTime } from "$lib/utilities";
  export let topSongs;
  export let id;
  $: playingTrackIndex =
    $trackList.length > 0
      ? topSongs.data.findIndex(
          (track) =>
            track.title === $trackList[$index].title &&
            track.artist.name === $trackList[$index].artist
        )
      : -1;
  $: currentPage.set(
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1
  );

  const perPage = 10;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(topSongs.total - 1, (page - 1) * perPage)
    );
    if (newIndex !== $currentPage) {
      let newUrl = `/artist/${id}?index=${newIndex}`; // Use newIndex in the URL
      if (newIndex === 0) {
        newUrl = `/artist/${id}`;
      }
      goto(newUrl);
    }
  };
  onMount(() => {
    changePage($currentPage);
  });
</script>

<div class="flex items-center gap-4">
  <h2 class="font-bold text-2xl">Top Songs</h2>
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
    {#each topSongs.data as track, i}
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
<Pagination.Root count={topSongs.total} {perPage} let:pages {$currentPage}>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton
        on:click={() => changePage($currentPage - 1)}
        disabled={$currentPage === 1}
      />
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item isVisible={$currentPage == page.value}>
          <Pagination.Link
            {page}
            isActive={$currentPage == page.value}
            on:click={() => changePage(page.value)}
          >
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton on:click={() => changePage($currentPage + 1)} />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
