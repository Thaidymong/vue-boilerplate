<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in news"
        :key="index"
        class="card bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <img
          class="w-full h-48 object-cover"
          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          alt="News Image"
        />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 mb-4">
            {{ item.body }}
          </p>
          <button
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const news = ref([]); // Define a reactive variable for news

    onMounted(async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        // Limit to 6 items
        news.value = data.slice(0, 3).map((item) => ({
          title: item.title,
          body: item.body,
        }));
        console.log("news", news.value);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    });

    return {
      news,
    };
  },
};
</script>
