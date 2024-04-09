<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import FaRegClock from "svelte-icons/fa/FaRegClock.svelte";
  import Track from "$lib/components/ui/commons/track.svelte";
  import * as Table from "$lib/components/ui/table";
  import { index, trackList } from "$lib/stores/store.js";
  export let searchSongs;
  $: playingTrackIndex =
    $trackList.length > 0
      ? searchSongs.data.findIndex(
          (track) =>
            track.title === $trackList[$index].title &&
            track.artist.name === $trackList[$index].artist
        )
      : -1;
  let currentPage =
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1;
  let currentQuery = $page.url.searchParams.get("q") || "";

  const perPage = 25;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(searchSongs.total - 1, (page - 1) * perPage)
    );
    if (newIndex !== currentPage) {
      currentPage = newIndex;
      let newUrl = `/search?q=${currentQuery}&index=${newIndex}`; // Use newIndex in the URL
      if (currentPage === 0) {
        newUrl = `/search?q=${currentQuery}`;
      }
      goto(newUrl);
    }
  };
  onMount(() => {
    changePage(currentPage);
  });
  function convertTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  }
</script>

<div class="flex items-center gap-4">
  <h2 class="font-bold text-2xl">
    {searchSongs.total} Songs Found
  </h2>
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
    {#each searchSongs.data as track, i}
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
<Pagination.Root count={searchSongs.total} {perPage} let:pages let:currentPage>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton
        on:click={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item isVisible={currentPage == page.value}>
          <Pagination.Link
            {page}
            isActive={currentPage == page.value}
            on:click={() => changePage(page.value)}
          >
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton
        on:click={() => changePage(currentPage + 1)}
        disabled={currentPage === searchSongs.total / 25}
      />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
