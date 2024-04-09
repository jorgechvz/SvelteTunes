<script>
  export let bestAlbums;
  export let setTab;
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex items-center gap-4 mt-16 mb-10">
  <h2 class="font-bold text-2xl">Albums</h2>
  <Button
    class="py-[2px] px-5 bg-blue-500 text-white rounded-2xl"
    on:click={() => setTab("albums")}>View All</Button
  >
</div>
<div class="grid grid-cols-4">
  {#each bestAlbums.data.slice(0, 4) as album, i}
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
