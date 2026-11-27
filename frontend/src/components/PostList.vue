<script setup lang="ts">
import type { SocialPost } from "../types/social-post";

defineProps<{
  posts: SocialPost[];
  selectedPostId: string | null;
}>();

const emit = defineEmits<{
  select: [post: SocialPost];
}>();
</script>

<template>
  <div>
    <p class="mb-4 text-xs font-semibold tracking-widest text-neutral-500">
      SAMPLE DATA · {{ posts.length }} RESULTS
    </p>

    <p v-if="!posts.length" class="py-8 text-sm text-neutral-500">
      No sample posts match your keywords. Try “new baby” or “first home”.
    </p>

    <ul v-else class="space-y-2">
      <li v-for="post in posts" :key="post.id">
        <button
          type="button"
          :aria-pressed="selectedPostId === post.id"
          class="w-full cursor-pointer rounded-lg border-l-2 p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-teal-700"
          :class="
            selectedPostId === post.id
              ? 'border-teal-700 bg-teal-50'
              : 'border-transparent hover:bg-neutral-50'
          "
          @click="emit('select', post)"
        >
          <div class="flex items-center gap-3">
            <span
              aria-hidden="true"
              class="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-semibold text-neutral-600"
            >
              {{ post.authorName.charAt(0) }}
            </span>

            <div class="min-w-0">
              <p class="font-semibold text-neutral-950">
                {{ post.authorName }}
              </p>

              <p class="truncate text-sm text-neutral-500">
                @{{ post.authorHandle }}
              </p>
            </div>

            <span class="ml-auto text-xs font-medium text-teal-700">
              Bluesky
            </span>
          </div>

          <p class="mt-4 text-base leading-relaxed text-neutral-800">
            {{ post.text }}
          </p>
        </button>
      </li>
    </ul>
  </div>
</template>
