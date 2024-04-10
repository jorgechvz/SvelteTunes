<script>
  import AlbumTracks from "$lib/components/ui/albums/album-tracks.svelte";
  import HeroAlbum from "$lib/components/ui/albums/hero-album.svelte";

  export let data;
  $: ({ album } = data);
</script>

<section class="max-w-7xl mx-auto pt-10 pb-32">
  <HeroAlbum {album} />
  <AlbumTracks {album} />
</section>