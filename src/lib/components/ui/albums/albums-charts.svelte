<script>
  import * as Carousel from "$lib/components/ui/carousel/index";
  import * as Card from "$lib/components/ui/card/index";
  export let albums;
</script>

<section class="max-w-7xl m-auto">
  <Carousel.Root class="w-full max-w-7xl">
    <Carousel.Previous />
    <Carousel.Next />
    <Carousel.Content class="-ml-1">
      {#each albums as { id, cover_medium, title, artist }}
        <Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/5">
          <div class="p-1">
            <Card.Root class="border-[0px] shadow-[0px]">
              <Card.Content
                class="flex aspect-square items-center justify-center p-1"
              >
                <div>
                  <a href={`/album/${id}`}>
                    <img class="w-full" src={cover_medium} alt={title} />
                  </a>
                  <div class="mt-2">
                    <a href={`/album/${id}`}>
                      <h3 class="font-bold hover:underline">{title}</h3>
                    </a>
                    <p class="text-muted-foreground">
                      by
                      <a href={`/artist/${artist.id}`} class="hover:underline">
                        {artist.name}
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
  </Carousel.Root>
</section>
