<script>
  export let bestPlaylists;
  export let setTab;
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex items-center gap-4 mt-16 mb-10">
  <h2 class="font-bold text-2xl">Playlists</h2>
  <Button
    class="py-[2px] px-5 bg-blue-500 text-white rounded-2xl"
    on:click={() => setTab("playlists")}>View All</Button
  >
</div>
<div class="grid grid-cols-4">
  {#each bestPlaylists.data.slice(0, 4) as playlist, i}
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
