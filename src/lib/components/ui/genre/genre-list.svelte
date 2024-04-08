<script>
  export let genres;
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
  }
</script>

<section class="max-w-7xl mx-auto">
  <ul class="grid grid-cols-4 place-items-center gap-5">
    {#each genres as {id, name}}
      <li
        class="py-12 font-bold border-2 text-2xl text-white text-center w-full rounded-lg hover:brightness-200 cursor-pointer"
        style="background-color: {getRandomColor()}"
      >
        <a href="/genre/{id}">
          {name}
        </a>
      </li>
    {/each}
  </ul>
</section>
