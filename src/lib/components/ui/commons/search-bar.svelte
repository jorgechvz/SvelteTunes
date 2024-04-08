<script>
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/input/input.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  let search = "";

  const redirectToResultPage = () => {
    goto(`/search?q=${search}`);
  };
</script>

<div class="z-10 flex items-center bg-white fixed top-0 w-full border-b-2 h-24">
  <div class="ml-8 w-1/4 relative">
    <div class="absolute left-3 top-3 h-4 w-4 text-muted-foreground">
      <FaSearch />
    </div>
    <Input
      placeholder="Search for songs, albums, artists"
      type="text"
      class="pl-10 bg-gray-200"
      bind:value={search}
      on:keydown={(e) => e.key === "Enter" && redirectToResultPage()}
    />
  </div>
</div>
