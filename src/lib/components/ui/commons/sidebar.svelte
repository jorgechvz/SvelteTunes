<script>
  import { page } from "$app/stores";
  import * as Card from "$lib/components/ui/card/index";
  import FaHome from "svelte-icons/fa/FaHome.svelte";
</script>

<div class="flex h-full max-h-screen flex-col gap-2">
  <div class="flex h-14 mb-8 items-center px-4 lg:h-[60px] lg:px-6">
    <a href="/" class="flex items-center gap-2 font-bold text-3xl">
      <span class="mt-10">SvelteTunes</span>
    </a>
  </div>
  <div class="flex-1">
    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
      <a
        href="/"
        class="flex items-center gap-1 rounded-lg px-3 py-2 transition-all hover:text-primary text-xl font-semibold"
        class:active={$page.url.pathname === "/"}
      >
        <div class="w-7">
          <FaHome />
        </div>
        Home
      </a>
    </nav>
  </div>
  <div class="mt-auto p-4 mb-32 max-w-60">
    <Card.Root>
      <Card.Header class="p-2 pt-0 md:p-4">
        <Card.Title>Upgrade to Pro</Card.Title>
        <Card.Description>
          Unlock all features and get unlimited access to our support team.
        </Card.Description>
      </Card.Header>
      <Card.Content class="p-2 pt-0 md:p-4 md:pt-0"></Card.Content>
    </Card.Root>
  </div>
</div>

<style>
  .active {
    color: #ff3e00;
  }
</style>
