<script setup lang="ts">
import { computed, ref } from "vue";
import AppSidebar from "./components/AppSidebar.vue";
import KeywordSearch from "./components/KeywordSearch.vue";
import PostList from "./components/PostList.vue";
import { mockPosts } from "./data/mock-posts";
import type { SocialPost } from "./types/social-post";

const activeView = ref<"discover" | "drafts">("discover");
const searchKeywords = ref<string[]>([]);
const selectedPost = ref<SocialPost | null>(null);

const filteredPosts = computed(() => {
  return mockPosts.filter((post) =>
    searchKeywords.value.some((keyword) =>
      post.text.toLowerCase().includes(keyword.toLowerCase()),
    ),
  );
});

const handleSearch = (keywords: string[]) => {
  searchKeywords.value = keywords;
  selectedPost.value = null;
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-white text-neutral-950 antialiased md:flex-row"
  >
    <AppSidebar :active-view="activeView" @navigate="activeView = $event" />

    <main class="min-w-0 flex-1 p-6 lg:p-10">
      <template v-if="activeView === 'discover'">
        <p class="text-sm font-semibold tracking-widest text-teal-700">
          LISTENING WORKSPACE
        </p>

        <h1 class="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
          Find a conversation worth having.
        </h1>
        <div class="mt-8">
          <KeywordSearch @search="handleSearch" />
        </div>

        <div v-if="searchKeywords.length" class="mt-10 max-w-xl">
          <PostList
            :posts="filteredPosts"
            :selected-post-id="selectedPost?.id ?? null"
            @select="selectedPost = $event"
          />
        </div>
      </template>

      <template v-else>
        <p class="text-sm font-semibold tracking-widest text-teal-700">
          YOUR WORKSPACE
        </p>

        <h1 class="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
          Saved drafts
        </h1>

        <p class="mt-4 text-neutral-500">
          Your saved replies will appear here.
        </p>
      </template>
    </main>
  </div>
</template>
