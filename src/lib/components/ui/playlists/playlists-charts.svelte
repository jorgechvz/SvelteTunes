<script>
  import * as Carousel from "$lib/components/ui/carousel/index";
  import * as Card from "$lib/components/ui/card/index";
  export let playlists;
</script>

<section class="max-w-7xl m-auto">
  <Carousel.Root class="w-full max-w-7xl">
    <Carousel.Content class="-ml-1">
      {#each playlists as playlist}
        <Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/5">
          <div class="p-1">
            <Card.Root class="border-[0px] shadow-[0px]">
              <Card.Content
                class="flex aspect-square items-center justify-center p-1"
              >
                <a href={`/playlist/${playlist.id}`}>
                  <img
                    class="w-full"
                    src={playlist.picture_medium}
                    alt={playlist.title}
                  />
                  <div class="mt-2">
                    <h3 class="font-bold">{playlist.title}</h3>
                    <p class="text-muted-foreground">
                      {playlist.nb_tracks} tracks
                    </p>
                  </div>
                </a>
              </Card.Content>
            </Card.Root>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</section>
