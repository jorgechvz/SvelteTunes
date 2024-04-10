<script>
  export let artist;
</script>

<section class="mb-10">
  <div class="flex gap-10 items-center">
    <img
      class="w-full rounded-full max-w-xs"
      src={artist.picture_big}
      alt="Image for{artist.name}"
    />
    <div>
      <h1 class="text-7xl font-bold mb-8">{artist.name}</h1>
      <div class="flex gap-2 text-gray-500 mt-2">
        <p>{artist.nb_album} songs</p>
        <p>|</p>
        <p>{artist.nb_fan} fans</p>
      </div>
    </div>
  </div>
</section>
