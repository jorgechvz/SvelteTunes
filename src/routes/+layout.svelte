<script>
  import "../app.pcss";
  import Player from "$lib/components/ui/commons/player.svelte";
  import Sidebar from "$lib/components/ui/commons/sidebar.svelte";
  import SearchBar from "$lib/components/ui/commons/search-bar.svelte";
</script>

<div class="flex flex-row">
  <div class="w-1/6 px-5">
    <div class="fixed border-r-2 h-screen">
      <Sidebar />
    </div>
  </div>
  <div class="w-11/12 py-2">
    <div class="mb-32">
      <SearchBar />
    </div>
      <slot />
  </div>
</div>
<div c8lass="w-full">
  <Player />
</div>

<style>
  ::-webkit-scrollbar {
    background: transparent; /* make scrollbar transparent */
  }

  :global(html) {
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
  }
</style>
