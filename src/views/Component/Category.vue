<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="card bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">{{ item.name }}</h3>
          <p class="text-gray-700 mb-4">
            {{ item.description }}
          </p>
          <button
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Learn More
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
    const categories = ref([]); // Define a reactive variable for categories

    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:3000/category");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        categories.value = data.slice(0, 6).map((item) => ({
          name: item.name,
          description: item.description,
        }));
        console.log("categories", categories.value);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    });

    return {
      categories,
    };
  },
};
</script>
