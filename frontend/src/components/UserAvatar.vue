<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  name: string;
  src?: string | null;
}>();

const imageFailed = ref(false);

const initials = computed(() => {
  return (
    props.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "?"
  );
});

watch(
  () => props.src,
  () => {
    imageFailed.value = false;
  },
);
</script>

<template>
  <span
    class="inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 font-semibold text-neutral-600"
  >
    <img
      v-if="src && !imageFailed"
      :src="src"
      alt=""
      loading="lazy"
      referrerpolicy="no-referrer"
      class="size-full object-cover"
      @error="imageFailed = true"
    />

    <span v-else aria-hidden="true">
      {{ initials }}
    </span>
  </span>
</template>
