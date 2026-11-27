<script setup lang="ts">
import { Bookmark, Search } from "@lucide/vue";

defineProps<{
  activeView: "discover" | "drafts";
}>();

const emit = defineEmits<{
  navigate: [view: "discover" | "drafts"];
}>();

const navigationItems = [
  { id: "discover", label: "Discover", icon: Search },
  { id: "drafts", label: "Saved drafts", icon: Bookmark },
] as const;
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

    <nav aria-label="Main navigation" class="mt-6 flex gap-2 md:flex-col">
      <button
        v-for="item in navigationItems"
        :key="item.id"
        type="button"
        :aria-current="activeView === item.id ? 'page' : undefined"
        class="flex flex-1 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 md:flex-none"
        :class="
          activeView === item.id
            ? 'bg-teal-700/10 text-teal-900'
            : 'text-neutral-600 hover:bg-neutral-200/60'
        "
        @click="emit('navigate', item.id)"
      >
        <component
          :is="item.icon"
          :size="21"
          :stroke-width="1.75"
          aria-hidden="true"
        />

        {{ item.label }}
      </button>
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
