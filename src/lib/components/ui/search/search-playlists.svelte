<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import * as Card from "$lib/components/ui/card/index.js";
  export let searchPlaylists;
  let currentPage =
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1;
  let currentQuery = $page.url.searchParams.get("q") || "";

  const perPage = 25;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(searchPlaylists.total - 1, (page - 1) * perPage)
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
</script>

<div class="flex items-center gap-4 mt-16 mb-10">
  <h2 class="font-bold text-2xl">{searchPlaylists.total} Playlists Found</h2>
</div>
<div class="grid grid-cols-4 gap-6">
  {#each searchPlaylists.data as playlist, i}
    <Card.Root class="border-[0px] shadow-[0px]">
      <Card.Content class="flex aspect-square items-center justify-center p-1">
        <a href={`/playlist/${playlist.id}`}>
          <img
            class="w-full max-w-xs"
            src={playlist.picture_big}
            alt={playlist.title}
          />
          <div class="mt-2">
            <h3 class="font-bold hover:underline">{playlist.title}</h3>
            <div class="text-gray-500 mt-1">
              <p>{playlist.nb_tracks} songs</p>
            </div>
          </div>
        </a>
      </Card.Content>
    </Card.Root>
  {/each}
</div>

<Pagination.Root
  count={searchPlaylists.total}
  {perPage}
  let:pages
  let:currentPage
>
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
        disabled={currentPage === searchPlaylists.total / 25}
      />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
