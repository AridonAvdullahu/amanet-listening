<script setup lang="ts">
import { ref } from "vue";
import { Search, X } from "@lucide/vue";

const emit = defineEmits<{
  search: [keywords: string[]];
}>();

const input = ref("");
const keywords = ref<string[]>([]);

const addKeyword = () => {
  const keyword = input.value.trim();

  if (!keyword) return;

  const alreadyExists = keywords.value.some(
    (item) => item.toLowerCase() === keyword.toLowerCase(),
  );

  if (!alreadyExists) {
    keywords.value.push(keyword);
  }

  input.value = "";
};

const removeKeyword = (keyword: string) => {
  keywords.value = keywords.value.filter((item) => item !== keyword);
};

const handleSearch = () => {
  addKeyword();

  if (!keywords.value.length) return;

  emit("search", [...keywords.value]);
};
</script>

<template>
  <form
    class="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3 focus-within:border-teal-700 sm:flex-row sm:items-center"
    role="search"
    @submit.prevent="handleSearch"
  >
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <Search
        :size="22"
        class="ml-2 shrink-0 text-neutral-500"
        aria-hidden="true"
      />

      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span
          v-for="keyword in keywords"
          :key="keyword"
          class="inline-flex max-w-full items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm text-teal-900"
        >
          <span class="break-all">{{ keyword }}</span>

          <button
            type="button"
            :aria-label="`Remove keyword ${keyword}`"
            class="shrink-0 cursor-pointer rounded-full p-0.5 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-teal-700"
            @click="removeKeyword(keyword)"
          >
            <X :size="14" aria-hidden="true" />
          </button>
        </span>

        <label for="keyword-input" class="sr-only">
          Add a keyword or hashtag
        </label>

        <input
          id="keyword-input"
          v-model="input"
          type="text"
          placeholder="Add a keyword or #hashtag"
          class="min-w-40 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          @keydown.enter.prevent="addKeyword"
        />
      </div>
    </div>

    <button
      type="submit"
      :disabled="!keywords.length && !input.trim()"
      class="shrink-0 cursor-pointer rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Search posts
    </button>
  </form>
</template>
