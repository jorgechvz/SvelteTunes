<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import * as Card from "$lib/components/ui/card/index.js";
  export let searchAlbums;
  let currentPage =
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1;
  let currentQuery = $page.url.searchParams.get("q") || "";

  const perPage = 25;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(searchAlbums.total - 1, (page - 1) * perPage)
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
<div class="flex items-center gap-4 mt-16 mb-10">
    <h2 class="font-bold text-2xl">{searchAlbums.total} Albums Found</h2>
  </div>
<div class="grid grid-cols-4 gap-6">
  {#each searchAlbums.data as album, i}
    <Card.Root class="border-[0px] shadow-[0px]">
      <Card.Content class="flex aspect-square items-center justify-center p-1">
        <div>
          <a href={`/album/${album.id}`}>
            <img class="w-full" src={album.cover_big} alt={album.title} />
          </a>
          <div class="mt-2">
            <a href={`/album/${album.id}`}>
              <h3 class="font-bold hover:underline">{album.title}</h3>
            </a>
            <p class="text-muted-foreground">
              by
              <a href={`/artist/${album.artist.id}`} class="hover:underline">
                {album.artist.name}
              </a>
            </p>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
<Pagination.Root count={searchAlbums.total} {perPage} let:pages let:currentPage>
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
        disabled={currentPage === searchAlbums.total / 25}
      />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
