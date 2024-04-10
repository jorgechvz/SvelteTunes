<script>
  export let result;
  export let albums;
  export let setTab;
  import { index, trackList } from "$lib/stores/store.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Track from "$lib/components/ui/commons/track.svelte";
  import IoIosArrowForward from "svelte-icons/io/IoIosArrowForward.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { convertDate } from "$lib/utilities";
  $: playingTrackIndex =
    $trackList.length > 0
      ? result.top.data.findIndex(
          (track) =>
            track.title === $trackList[$index].title &&
            track.artist.name === $trackList[$index].artist
        )
      : -1;

  let sortType = "";

  const handleSortChange = (selected) => {
    sortType = selected.value;
  };

  $: sortedAlbums = albums.data.slice().sort((a, b) => {
    if (sortType === "date") {
      return new Date(b.release_date) - new Date(a.release_date);
    }
    if (sortType === "name") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
</script>

<section>
  <div class="grid grid-cols-3 gap-x-6">
    <div class="col-span-2">
      <div class="flex items-center gap-4 mb-5">
        <h2 class="text-xl font-bold">Top Songs</h2>
        <Button
          class="py-[2px] px-5 bg-blue-500 text-white rounded-2xl"
          on:click={() => setTab("topSongs")}>View All</Button
        >
      </div>
      <div
        class="px-4 py-2 bg-secondary shadow-2xl border-secondary border-2 rounded-2xl"
      >
        {#each result.top.data as track, i}
          <div class="flex items-center gap-3 space-y-2">
            <Track
              title={track.title}
              artist={track.artist.name}
              file={track.preview}
              image={track.album.cover_small}
              {i}
            />
            <div>
              <img src={track.album.cover_small} alt={track.title} />
            </div>
            <h3>{i + 1}. {track.title}</h3>
          </div>
        {/each}
      </div>
    </div>
    <div class="col-span-1">
      <Button
        class="mb-5 px-5 bg-white rounded-2xl hover:bg-transparent hover:text-primary text-black"
        on:click={() => setTab("artistPlaylists")}
      >
        <div class="flex items-center gap-1">
          <h2 class="text-xl font-bold">Playlists</h2>
          <div class="w-6">
            <IoIosArrowForward />
          </div>
        </div>
      </Button>
      <div class="px-4 py-2">
        {#each result.playlists.data.slice(0, 4) as playlist}
          <a
            href="/playlist/{playlist.id}"
            class="flex items-center gap-3 mb-3"
          >
            <img src={playlist.picture_small} alt={playlist.title} />
            <div>
              <h3 class="font-bold">{playlist.title}</h3>
              <p>By {playlist.user.name}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
  <div>
    <div class="mt-16">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-2xl font-bold">Albums</h2>
        <Select.Root onSelectedChange={handleSortChange}>
          <Select.Trigger class="w-[180px] bg-primary text-white">
            <Select.Value placeholder="Filter By" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="date">Release Date</Select.Item>
            <Select.Item value="name">A - Z</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <div class="grid grid-cols-5 gap-4">
        {#each sortedAlbums.filter((album) => album.record_type === "album") as album}
          <a href="/album/{album.id}" class="mb-3">
            <img src={album.cover_medium} alt={album.title} />
            <div>
              <h3 class="font-bold">{album.title}</h3>
              <p>{convertDate(album.release_date)}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
    <div class="mt-16">
      <div class="mb-5">
        <h2 class="text-xl font-bold">EP's</h2>
      </div>
      <div class="grid grid-cols-5 gap-4">
        {#each sortedAlbums.filter((album) => album.record_type === "ep") as album}
          <a href="/album/{album.id}" class="mb-3">
            <img src={album.cover_medium} alt={album.title} />
            <div>
              <h3 class="font-bold">{album.title}</h3>
              <p>{convertDate(album.release_date)}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
    <div class="mt-16">
      <div class="mb-5">
        <h2 class="text-xl font-bold">Singles</h2>
      </div>
      <div class="grid grid-cols-5 gap-4">
        {#each sortedAlbums.filter((album) => album.record_type === "single") as album}
          <a href="/album/{album.id}" class="mb-3">
            <img src={album.cover_medium} alt={album.title} />
            <div>
              <h3 class="font-bold">{album.title}</h3>
              <p>{convertDate(album.release_date)}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
