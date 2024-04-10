<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import { currentPage } from "$lib/stores/store.js";
  export let artistsPlaylists;
  export let id;
  $: currentPage.set(
    Math.floor(($page.url.searchParams.get("index") || 0) / perPage) + 1
  );

  const perPage = 20;

  const changePage = (page) => {
    const newIndex = Math.max(
      0,
      Math.min(artistsPlaylists.total - 1, (page - 1) * perPage)
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
  <h2 class="font-bold text-2xl">Playlists</h2>
</div>
<div class="grid grid-cols-5 gap-4">
  {#each artistsPlaylists.data as playlist}
    <a href="/playlist/{playlist.id}" class="mb-3">
      <img src={playlist.picture_medium} alt={playlist.title} />
      <div>
        <h3 class="font-bold">{playlist.title}</h3>
        <p>By {playlist.user.name}</p>
      </div>
    </a>
  {/each}
</div>
<Pagination.Root
  count={artistsPlaylists.total}
  {perPage}
  let:pages
  {$currentPage}
>
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
