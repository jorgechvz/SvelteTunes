<script>
  import HeroArtist from "$lib/components/ui/artists/hero-artist.svelte";
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import Discography from "$lib/components/ui/artists/discography.svelte";
  import TopSongs from "$lib/components/ui/artists/top-songs.svelte";
  import { currentPage } from "$lib/stores/store.js";
  import ArtistsPlaylists from "$lib/components/ui/artists/artists-playlists.svelte";
  import SimilarArtists from "$lib/components/ui/artists/similar-artists.svelte";
  export let data;
  $: ({ result, top, albums, playlists } = data);
  const activeTab = writable("discography");
  const setTab = (tab) => {
    const url = new URL(window.location);
    url.searchParams.delete("index");
    goto(`${url.pathname}${url.search}`);
    activeTab.set(tab);
    currentPage.set(1);
  };
</script>

<section class="max-w-7xl mx-auto pt-10 pb-32">
  <HeroArtist artist={result.artist} />
  <Tabs.Root value={$activeTab} onValueChange={setTab}>
    <Tabs.List class="grid w-full grid-cols-4">
      <Tabs.Trigger value="discography">Discography</Tabs.Trigger>
      <Tabs.Trigger value="topSongs">Top Songs</Tabs.Trigger>
      <Tabs.Trigger value="artistPlaylists">Top Playlists</Tabs.Trigger>
      <Tabs.Trigger value="similarArtists">Similar Artists</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content class="mt-10 mx-4" value="discography">
      <Discography {result} {albums} {setTab} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="topSongs">
      <TopSongs topSongs={top} id={result.artist.id} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="artistPlaylists">
      <ArtistsPlaylists artistsPlaylists={playlists} id={result.artist.id} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="similarArtists">
      <SimilarArtists similarArtists={result.related} {setTab}/>
    </Tabs.Content>
  </Tabs.Root>
</section>
