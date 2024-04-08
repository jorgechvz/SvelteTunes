<script>
  export let data;
  import GenreList from "$lib/components/ui/genre/genre-list.svelte";
  import ChartAlbums from "$lib/components/ui/albums/albums-charts.svelte";
  import ArtistsCharts from "$lib/components/ui/artists/artists-charts.svelte";
  import PlaylistsCharts from "$lib/components/ui/playlists/playlists-charts.svelte";

  const { genres, albums, artists, playlists } = data;
</script>

<div class="max-w-7xl mx-auto mb-32">
  <h1 class="text-4xl font-bold mb-12 pt-10">Explore the Music</h1>
  <div class="mb-16">
    <div class="mb-5 space-y-2">
      <h2 class="text-2xl font-bold">Unmissable albums this week</h2>
      <p class="text-muted-foreground">Recommended by our experts</p>
    </div>
    <ChartAlbums {albums} />
  </div>
  <div class="mb-16">
    <div class="mb-5 space-y-2">
      <h2 class="text-2xl font-bold">Artists you should be listening to</h2>
      <p class="text-muted-foreground">
        Discover the best new artists and bands
      </p>
    </div>
    <ArtistsCharts {artists} />
  </div>
  <div class="mb-16">
    <div class="mb-5 space-y-2">
      <h2 class="text-2xl font-bold">This week's freshest releases</h2>
      <p class="text-muted-foreground">Check out all the latest drops</p>
    </div>
    <PlaylistsCharts {playlists} />
  </div>
  <div class="mb-4  ">
    <div class="mb-5 space-y-2">
      <h2 class="text-2xl font-bold">Explore by genre</h2>
    </div>
    <GenreList {genres} />
  </div>
</div>
