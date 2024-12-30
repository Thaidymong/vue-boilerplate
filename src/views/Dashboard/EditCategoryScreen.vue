<template>
  <div class="flex items-center justify-center my-8">
    <div class="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
      <!-- Header -->
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        Update Category
      </h2>

      <!-- Loading / Error States -->
      <div v-if="isLoading" class="text-gray-500">
        <p>Loading category data...</p>
      </div>
      <div v-else-if="error" class="text-red-600 mb-4">
        <p>{{ error }}</p>
      </div>

      <!-- Update Form -->
      <form v-else @submit.prevent="handleUpdate" class="space-y-4">
        <!-- Category Name -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700" for="name">
            Category Name
          </label>
          <input
            id="name"
            v-model="categoryForm.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded 
                   focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter category name"
          />
        </div>

        <!-- Category Description -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700" for="description">
            Description
          </label>
          <textarea
            id="description"
            v-model="categoryForm.description"
            class="w-full p-2 border border-gray-300 rounded 
                   focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter category description"
            rows="4"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end space-x-3 mt-6">
          <!-- Cancel / Back Button (Optional) -->
          <button
            type="button"
            @click="goBack"
            class="py-2 px-4 rounded border border-gray-300 text-gray-700 
                   hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <!-- Submit Button -->
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded 
                   hover:bg-blue-700 focus:outline-none 
                   focus:ring focus:ring-blue-300 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// Adjust if needed or use your .env
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';

// Retrieve route & router
const route = useRoute();
const router = useRouter();
const categoryId = route.params.id; // e.g. "/category/5" => categoryId = "5"

// Reactive form data
const categoryForm = ref({
  name: '',
  description: '',
});

// Loading & error states
const isLoading = ref(false);
const error = ref(null);

// Fetch existing category data on component mount
onMounted(async () => {
  isLoading.value = true;
  try {
    // GET /category/:id to load default values
    const { data } = await axios.get(`${baseUrl}/category/${categoryId}`);
    // Populate form with server data
    categoryForm.value = {
      name: data?.name || '',
      description: data?.description || '',
    };
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to fetch category data.';
    Swal.fire('Error', error.value, 'error');
  } finally {
    isLoading.value = false;
  }
});

// Handle form submission (PUT /category/:id)
async function handleUpdate() {
  isLoading.value = true;
  error.value = null;

  try {
    await axios.put(`${baseUrl}/category/${categoryId}`, categoryForm.value);
    Swal.fire('Success', 'Category updated successfully.', 'success');
    router.push('/category'); // Navigate back to category list (adjust as needed)
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to update category.';
    Swal.fire('Error', error.value, 'error');
  } finally {
    isLoading.value = false;
  }
}

// Optional: goBack method to navigate to a previous page or category list
function goBack() {
  router.back(); 
}
</script>

<style scoped>
/* Your custom CSS or rely on Tailwind classes from the template. */
</style>
