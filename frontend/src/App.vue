<script setup lang="ts">
import { computed, ref } from "vue";
import AppSidebar from "./components/AppSidebar.vue";
import KeywordSearch from "./components/KeywordSearch.vue";
import PostList from "./components/PostList.vue";
import { mockPosts } from "./data/mock-posts";
import type { SocialPost } from "./types/social-post";
import ReplyReview from "./components/ReplyReview.vue";
import type { ReplyDraft } from "./types/reply-draft";
import { mockReplies } from "./data/mock-replies";

const activeView = ref<"discover" | "drafts">("discover");
const searchKeywords = ref<string[]>([]);
const selectedPost = ref<SocialPost | null>(null);
const savedDrafts = ref<ReplyDraft[]>([]);

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

const selectedReply = computed(() => {
  const postId = selectedPost.value?.id;

  if (!postId) return "";

  const savedDraft = savedDrafts.value.find(
    (draft) => draft.post.id === postId,
  );

  return savedDraft?.reply ?? mockReplies[postId] ?? "";
});

const saveDraft = (reply: string) => {
  const post = selectedPost.value;

  if (!post) return;

  const draft: ReplyDraft = {
    post,
    reply,
  };

  savedDrafts.value = [
    draft,
    ...savedDrafts.value.filter((item) => item.post.id !== post.id),
  ];
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

        <div
          v-if="searchKeywords.length"
          class="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2"
        >
          <div class="min-w-0">
            <PostList
              :posts="filteredPosts"
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
              :suggested-reply="selectedReply"
              @save="saveDraft"
            />

            <p
              v-else-if="filteredPosts.length"
              class="py-8 text-sm text-neutral-500"
            >
              Select a post to review a suggested reply.
            </p>
          </div>
        </div>
      </template>

      <template v-else>
        <p class="text-sm font-semibold tracking-widest text-teal-700">
          YOUR WORKSPACE
        </p>

        <h1 class="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
          Saved drafts
        </h1>

        <p v-if="!savedDrafts.length" class="mt-4 text-neutral-500">
          Your saved replies will appear here.
        </p>

        <ul v-else class="mt-8 max-w-3xl space-y-4">
          <li
            v-for="draft in savedDrafts"
            :key="draft.post.id"
            class="rounded-xl border border-neutral-200 p-6"
          >
            <h2 class="font-semibold text-neutral-950">
              Reply to {{ draft.post.authorName }}
            </h2>

            <p class="mt-2 text-sm leading-relaxed text-neutral-500">
              {{ draft.post.text }}
            </p>

            <p
              class="mt-4 whitespace-pre-wrap leading-relaxed text-neutral-800"
            >
              {{ draft.reply }}
            </p>
          </li>
        </ul>
      </template>
    </main>
  </div>
</template>
