<script setup lang="ts">
import { ref } from "vue";
import AppSidebar from "./components/AppSidebar.vue";
import KeywordSearch from "./components/KeywordSearch.vue";
import PostList from "./components/PostList.vue";
import ReplyReview from "./components/ReplyReview.vue";
import { searchPosts } from "./services/posts-api";
import type { SocialPost } from "./types/social-post";

const searchKeywords = ref<string[]>([]);
const posts = ref<SocialPost[]>([]);
const selectedPost = ref<SocialPost | null>(null);
const isSearching = ref(false);
const searchError = ref("");

const handleSearch = async (keywords: string[]) => {
  if (isSearching.value) return;

  searchKeywords.value = keywords;
  selectedPost.value = null;
  posts.value = [];
  isSearching.value = true;
  searchError.value = "";

  try {
    const results = await Promise.all(
      keywords.map((keyword) => searchPosts(keyword)),
    );

    const uniquePosts = new Map<string, SocialPost>();

    results.flat().forEach((post) => {
      uniquePosts.set(post.id, post);
    });

    posts.value = [...uniquePosts.values()];
    selectedPost.value = posts.value[0] ?? null;
  } catch {
    searchError.value = "Could not load posts. Please try again.";
  } finally {
    isSearching.value = false;
  }
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-white text-neutral-950 antialiased md:flex-row"
  >
    <AppSidebar />

    <main class="min-w-0 flex-1 p-6 lg:p-10">
      <p class="text-sm font-semibold tracking-widest text-teal-700">
        LISTENING WORKSPACE
      </p>

      <h1 class="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
        Find a conversation worth having.
      </h1>

      <div class="mt-8">
        <KeywordSearch :is-searching="isSearching" @search="handleSearch" />
      </div>

      <div v-if="searchKeywords.length" class="mt-10">
        <p
          v-if="isSearching"
          role="status"
          class="py-8 text-sm text-neutral-500"
        >
          Searching public posts...
        </p>

        <p
          v-else-if="searchError"
          role="alert"
          class="py-8 text-sm text-red-700"
        >
          {{ searchError }}
        </p>

        <div v-else class="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div class="min-w-0">
            <PostList
              :posts="posts"
              :selected-post-id="selectedPost?.id ?? null"
              @select="selectedPost = $event"
            />
          </div>

          <div
            class="min-w-0 border-t border-neutral-200 pt-8 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8"
          >
            <ReplyReview
              v-if="selectedPost"
              :key="selectedPost.id"
              :post="selectedPost"
              suggested-reply=""
            />

            <p v-else-if="posts.length" class="py-8 text-sm text-neutral-500">
              Select a post to review a suggested reply.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
