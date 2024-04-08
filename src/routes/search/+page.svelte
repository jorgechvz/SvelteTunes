<script>
  export let data;
  $: ({ results } = data);
</script>

<div class="max-w-7xl mx-auto">
  <ul>
    {#each results.data as result}
      <li class="px-4 py-2 cursor-pointer">{result.title}</li>
    {/each}
  </ul>
</div>
