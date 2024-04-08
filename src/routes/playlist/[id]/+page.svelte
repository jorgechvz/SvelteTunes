<script>
  import HeroPlaylist from "$lib/components/ui/playlists/hero-playlist.svelte";
  import PlaylistPlayerMusic from "$lib/components/ui/playlists/playlist-player-music.svelte";
  import TracksTable from "$lib/components/ui/playlists/tracks-table.svelte";
  export let data;
  $: ({ playlist } = data);
</script>

<section class="max-w-7xl mx-auto pt-10 pb-32">
  <HeroPlaylist {playlist} />
  <PlaylistPlayerMusic />
  <TracksTable {playlist} />
</section>
