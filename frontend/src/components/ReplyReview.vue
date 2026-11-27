<script setup lang="ts">
import { ref } from "vue";
import { Copy, ExternalLink } from "@lucide/vue";
import type { SocialPost } from "../types/social-post";

const props = defineProps<{
  post: SocialPost;
  suggestedReply: string;
}>();

const emit = defineEmits<{
  save: [reply: string];
}>();

const reply = ref(props.suggestedReply);
const isSaved = ref(false);

const copyState = ref<"idle" | "copying" | "copied" | "error">("idle");

const copyReply = async () => {
  const text = reply.value.trim();

  if (!text) return;

  copyState.value = "copying";

  try {
    await navigator.clipboard.writeText(text);
    copyState.value = "copied";
  } catch {
    copyState.value = "error";
  }
};

const saveReply = () => {
  const text = reply.value.trim();

  if (!text) return;

  emit("save", text);
  isSaved.value = true;
};

const handleReplyInput = () => {
  copyState.value = "idle";
  isSaved.value = false;
};
</script>

<template>
  <section aria-labelledby="review-heading">
    <h2 id="review-heading" class="text-2xl font-bold tracking-tight">
      Review suggestion
    </h2>

    <div class="mt-5 flex flex-wrap items-center gap-3">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800"
      >
        <span class="size-2 rounded-full bg-teal-700" aria-hidden="true"></span>

        Pending review
      </span>

      <p class="text-sm text-neutral-500">
        Review and edit before using this reply.
      </p>
    </div>

    <div class="mt-8">
      <h3 class="text-sm font-medium text-neutral-500">Original post</h3>

      <article class="mt-3 rounded-lg border border-neutral-200 p-5">
        <p class="font-semibold text-neutral-950">
          {{ post.authorName }}
        </p>

        <p class="mt-1 text-sm text-neutral-500">@{{ post.authorHandle }}</p>

        <p class="mt-4 whitespace-pre-wrap leading-relaxed text-neutral-800">
          {{ post.text }}
        </p>

        <a
          v-if="post.url"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center gap-2 text-sm text-teal-700 underline underline-offset-4"
        >
          View original post

          <ExternalLink :size="15" aria-hidden="true" />
        </a>
      </article>
    </div>

    <div class="mt-8">
      <label
        for="reply-text"
        class="block text-sm font-medium text-neutral-600"
      >
        Your reply (edit before using)
      </label>

      <textarea
        id="reply-text"
        v-model="reply"
        rows="5"
        :disabled="copyState === 'copying'"
        class="mt-3 block w-full resize-y rounded-lg border border-neutral-300 p-4 leading-relaxed text-neutral-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10 focus:outline-none"
        @input="handleReplyInput"
      ></textarea>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        :disabled="!reply.trim() || copyState === 'copying'"
        class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        @click="copyReply"
      >
        <Copy :size="18" aria-hidden="true" />

        {{ copyState === "copying" ? "Copying..." : "Copy reply" }}
      </button>

      <button
        type="button"
        :disabled="!reply.trim() || copyState === 'copying'"
        class="inline-flex cursor-pointer items-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        @click="saveReply"
      >
        Save draft
      </button>
    </div>

    <p v-if="isSaved" role="status" class="mt-3 text-sm text-teal-700">
      Draft saved.
    </p>

    <p
      v-if="copyState === 'copied'"
      role="status"
      class="mt-3 text-sm text-teal-700"
    >
      Reply copied to clipboard.
    </p>

    <p
      v-if="copyState === 'error'"
      role="status"
      class="mt-3 text-sm text-red-700"
    >
      Could not copy automatically. Please select and copy the text manually.
    </p>

    <p class="mt-5 text-xs text-neutral-500">
      Sample suggestion. Nothing is sent automatically.
    </p>
  </section>
</template>
