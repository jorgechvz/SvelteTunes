<script>
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import { getEmblaContext } from "./context.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  let className = undefined;
  export { className as class };
  export let variant = "outline";
  export let size = "icon";
  const { orientation, canScrollPrev, scrollPrev, handleKeyDown } =
    getEmblaContext("<Carousel.Previous/>");
</script>

<Button
  {variant}
  {size}
  class={cn(
    "absolute h-8 w-8 touch-manipulation rounded-full",
    $orientation === "horizontal"
      ? "right-[75px] top-[-45px] -translate-y-1/2"
      : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
    className
  )}
  disabled={!$canScrollPrev}
  on:click={scrollPrev}
  on:keydown={handleKeyDown}
  {...$$restProps}
>
  <ArrowLeft class="h-4 w-4" />
  <span class="sr-only">Previous slide</span>
</Button>
