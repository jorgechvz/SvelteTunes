<script>
  export let similarArtists;
  export let setTab;
</script>

<div class="flex items-center gap-4 mb-10">
  <h2 class="font-bold text-2xl">Playlists</h2>
</div>
<div class="grid grid-cols-4 gap-4">
  {#each similarArtists.data as artist}
    <a
      href="/artist/{artist.id}"
      class="mb-3"
      on:click|preventDefault={(event) => {
        setTab("discography");
        window.location.href = `/artist/${artist.id}`;
      }}
    >
      <img
        src={artist.picture_medium}
        alt={artist.title}
        class="rounded-full mx-auto"
      />
      <div class="text-center mt-5">
        <h3 class="font-bold">{artist.name}</h3>
        <p>{artist.nb_fan} fans</p>
      </div>
    </a>
  {/each}
</div>
