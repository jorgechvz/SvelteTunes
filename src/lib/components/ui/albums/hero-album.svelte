<script>
  export let album;
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { convertDate, convertTimeWithHours } from "$lib/utilities";
</script>

<section class="mb-10">
  <div class="flex gap-10 items-center">
    <img
      class="w-full max-w-xs"
      src={album.cover_big}
      alt="image for{album.title}"
    />
    <div>
      <h1 class="text-6xl font-bold mb-10">{album.title}</h1>
      <div class="flex gap-3 items-center">
        <Avatar.Root>
          <Avatar.Image
            src={album.artist.picture_small}
            alt="Avatar for {album.artist.name}"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
        <h3>{album.artist.name}</h3>
      </div>
      <div class="flex gap-2 text-gray-500 mt-2">
        <p>{album.nb_tracks} songs</p>
        <p>|</p>
        <p>{convertTimeWithHours(album.duration)}</p>
        <p>|</p>
        <p>{album.fans} fans</p>
        <p>|</p>
        <p>{convertDate(album.release_date)}</p>
      </div>
    </div>
  </div>
</section>
