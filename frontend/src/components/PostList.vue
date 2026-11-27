<script setup lang="ts">
import UserAvatar from "./UserAvatar.vue";
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
      PUBLIC POSTS · {{ posts.length }} RESULTS
    </p>

    <p v-if="!posts.length" class="py-8 text-sm text-neutral-500">
      No public posts found. Try different keywords.
    </p>

    <ul v-else class="space-y-4">
      <li v-for="post in posts" :key="post.id">
        <button
          type="button"
          :aria-pressed="selectedPostId === post.id"
          class="w-full cursor-pointer rounded-xl border p-5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          :class="
            selectedPostId === post.id
              ? 'border-teal-600 bg-teal-50/50 shadow-sm ring-1 ring-teal-600/15'
              : 'border-neutral-200 bg-white shadow-sm hover:border-teal-300 hover:shadow-md'
          "
          @click="emit('select', post)"
        >
          <div class="flex items-start gap-3">
            <UserAvatar :name="post.authorName" :src="post.avatarUrl" />

            <div class="min-w-0 flex-1">
              <p class="truncate text-base font-semibold text-neutral-900">
                {{ post.authorName }}
              </p>

              <p class="mt-0.5 truncate text-sm text-neutral-500">
                @{{ post.authorHandle }}
              </p>
            </div>

            <span
              class="shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700"
            >
              Bluesky
            </span>
          </div>

          <p
            class="mt-4 line-clamp-4 text-[15px] leading-7 whitespace-pre-line text-neutral-700 [overflow-wrap:anywhere]"
          >
            {{ post.text }}
          </p>
        </button>
      </li>
    </ul>
  </div>
</template>
