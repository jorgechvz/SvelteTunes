<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import * as Card from "$lib/components/ui/card/index.js";
  export let searchArtists;
  let currentPage =
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1;
  let currentQuery = $page.url.searchParams.get("q") || "";

  const perPage = 25;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(searchArtists.total - 1, (page - 1) * perPage)
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
  <h2 class="font-bold text-2xl">{searchArtists.total} Artists Found</h2>
</div>
<div class="grid grid-cols-4 gap-6">
  {#each searchArtists.data as artist, i}
    <Card.Root class="border-[0px] shadow-[0px]">
      <Card.Content class="flex aspect-square items-center justify-center p-3">
        <a href="/artist/{artist.id}">
          <img
            class="w-full rounded-full"
            src={artist.picture_big}
            alt={artist.name}
          />
          <div class="mt-2 text-center">
            <h3 class="font-bold">{artist.name}</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {artist.nb_fan} fans
            </p>
          </div>
        </a>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
<Pagination.Root count={searchArtists.total} {perPage} let:pages let:currentPage>
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
        disabled={currentPage === searchArtists.total / 25}
      />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
