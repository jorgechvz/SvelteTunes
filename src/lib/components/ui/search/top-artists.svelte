<script>
  export let bestArtists;
  export let setTab;
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex items-center gap-4 mt-16 mb-10">
  <h2 class="font-bold text-2xl">Artists</h2>
  <Button
    class="py-[2px] px-5 bg-blue-500 text-white rounded-2xl"
    on:click={() => setTab("artists")}>View All</Button
  >
</div>
<div class="grid grid-cols-4">
  {#each bestArtists.data.slice(0, 4) as artist, i}
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
            <p class="text-sm text-muted-foreground mt-1">{artist.nb_fan} fans</p>
          </div>
        </a>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
