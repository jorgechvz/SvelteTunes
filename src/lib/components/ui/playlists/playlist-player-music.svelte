<script>
  import Input from "$lib/components/ui/input/input.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import { search } from "$lib/stores/store.js";
</script>

<section class="mt-10 flex items-center justify-between">
  <h3 class="text-2xl font-bold">Playlist's Tracks</h3>
  <form action="" class="max-w-sm w-full">
    <div class="relative">
      <div class="absolute left-3 top-3 h-4 w-4 text-muted-foreground">
        <FaSearch />
      </div>
      <Input
        bind:value={$search}
        class="pl-10 bg-gray-200"
        type="text"
        placeholder="Search within song"
      />
    </div>
  </form>
</section>
