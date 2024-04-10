<script>
  import { convertTimeWithHours } from "$lib/utilities";

    export let playlist
</script>

<section>
    <div class="flex gap-10 items-center">
        <img class="w-full max-w-xs" src={playlist.picture_big} alt='image for{playlist.title}'>
        <div>
            <h1 class="text-7xl font-bold mb-10">{playlist.title}</h1>
            <h3>{playlist.creator.name}</h3>
            <div class="flex gap-2 text-gray-500 mt-2">
                <p>{playlist.nb_tracks} songs</p>
                <p>|</p>
                <p>{convertTimeWithHours(playlist.duration)}</p>
                <p>|</p>
                <p>{playlist.fans} fans</p>
            </div>
            <p class="mt-10 text-gray-500">{playlist.description}</p>
        </div>
    </div>
</section>