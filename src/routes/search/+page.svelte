<script>
  import { writable } from "svelte/store";
  import {page} from "$app/stores";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import TopTracks from "$lib/components/ui/search/top-tracks.svelte";
  import TopAlbums from "$lib/components/ui/search/top-albums.svelte";
  import TopPlaylists from "$lib/components/ui/search/top-playlists.svelte";
  import TopArtists from "$lib/components/ui/search/top-artists.svelte";
  import SearchTracks from "$lib/components/ui/search/search-tracks.svelte";
  import SearchAlbums from "$lib/components/ui/search/search-albums.svelte";
  import SearchPlaylists from "$lib/components/ui/search/search-playlists.svelte";
  import SearchArtists from "$lib/components/ui/search/search-artists.svelte";
  import { capitalize } from "$lib/utilities";
  export let data;
  $: ({ songs, albums, artists, playlists } = data);
  const activeTab = writable("all");
  const setTab = (tab) => activeTab.set(tab);
  const getQueryParam = $page.url.searchParams.get("q")
</script>

<div class="max-w-7xl mx-auto mb-48">
  <h1 class="font-bold text-4xl mb-12">Results for {capitalize(getQueryParam)}</h1>
  <Tabs.Root value={$activeTab} onValueChange={setTab}>
    <Tabs.List class="grid w-full grid-cols-5">
      <Tabs.Trigger value="all">All</Tabs.Trigger>
      <Tabs.Trigger value="songs">Songs</Tabs.Trigger>
      <Tabs.Trigger value="albums">Albums</Tabs.Trigger>
      <Tabs.Trigger value="playlists">Playlists</Tabs.Trigger>
      <Tabs.Trigger value="artists">Artists</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content class="mt-10 mx-4" value="all">
      <TopTracks bestTracks={songs} {setTab} />
      <TopAlbums bestAlbums={albums} {setTab} />
      <TopPlaylists bestPlaylists={playlists} {setTab} />
      <TopArtists bestArtists={artists} {setTab} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="songs">
      <SearchTracks searchSongs={songs} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="albums">
      <SearchAlbums searchAlbums={albums} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="playlists">
      <SearchPlaylists searchPlaylists={playlists} />
    </Tabs.Content>
    <Tabs.Content class="mt-10 mx-4" value="artists">
      <SearchArtists searchArtists={artists} />
    </Tabs.Content>
  </Tabs.Root>
</div>
