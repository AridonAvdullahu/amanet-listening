<script setup lang="ts">
import { Search } from "@lucide/vue";
</script>

<template>
  <aside
    class="flex w-full flex-col border-b border-neutral-200 bg-[#f4f4f2] p-4 md:min-h-screen md:w-64 md:shrink-0 md:border-r md:border-b-0"
  >
    <div class="px-3 py-4 text-xl whitespace-nowrap">
      <span class="font-bold text-neutral-950">Amanet</span>
      <span class="mx-1 text-teal-700">/</span>
      <span class="text-neutral-600">Listening</span>
    </div>

    <nav aria-label="Main navigation" class="mt-6">
      <a
        href="/"
        aria-current="page"
        class="flex items-center gap-3 rounded-lg bg-teal-700/10 px-4 py-3 text-base text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        <Search :size="21" :stroke-width="1.75" aria-hidden="true" />

        Discover
      </a>
    </nav>

    <div class="mt-auto hidden items-center gap-3 px-3 pt-8 pb-2 md:flex">
      <span
        aria-hidden="true"
        class="flex size-10 items-center justify-center rounded-full bg-teal-800 text-sm font-medium text-white"
      >
        AA
      </span>

      <span class="text-sm font-medium text-neutral-800"> Aridon A. </span>
    </div>
  </aside>
</template>
