<template>
  <div class="flex items-center justify-center my-8">
    <!-- Card Container -->
    <div class="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
      <!-- Header -->
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        Update Product
      </h2>

      <!-- Loading / Error States -->
      <div v-if="isLoading" class="text-gray-500">
        <p>Loading product data...</p>
      </div>
      <div v-else-if="error" class="text-red-600 mb-4">
        <p>{{ error }}</p>
      </div>

      <!-- Update Form -->
      <form v-else @submit.prevent="handleUpdate" class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700" for="name"
            >Product Name</label
          >
          <input
            id="name"
            v-model="productForm.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter product name"
          />
        </div>

        <!-- Description -->
        <div>
          <label
            class="block mb-1 font-semibold text-gray-700"
            for="description"
            >Description</label
          >
          <textarea
            id="description"
            v-model="productForm.description"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter product description"
            rows="4"
          ></textarea>
        </div>

        <!-- Price -->
        <div>
          <label class="block mb-1 font-semibold text-gray-700" for="price"
            >Price</label
          >
          <input
            id="price"
            v-model="productForm.price"
            type="number"
            step="0.01"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter product price"
          />
        </div>

        <!-- Thumbnails -->
        <div>
          <label
            class="block mb-1 font-semibold text-gray-700"
            for="thumbnails"
            >Thumbnail URL</label
          >
          <input
            id="thumbnails"
            v-model="productForm.thumbnails"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter thumbnail URL"
          />
        </div>

        <!-- Thumbnail Preview (Optional) -->
        <div v-if="productForm.thumbnails" class="mt-2">
          <p class="text-gray-600 text-sm mb-1">Preview:</p>
          <img
            :src="productForm.thumbnails"
            alt="Product Thumbnail Preview"
            class="w-32 h-32 object-cover rounded border border-gray-200"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end space-x-3 mt-6">
          <!-- Cancel / Back Button (Optional) -->
          <button
            type="button"
            @click="goBack"
            class="py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <!-- Submit Button -->
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

/**
 * If you're using Vite env vars:
 * VITE_API_BASE_URL=http://localhost:8088
 * Otherwise, you can hardcode your API base URL below.
 */
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088'

// Get route and router instances
const route = useRoute()
const router = useRouter()

// The product ID from the route param: e.g., /product/7/update => route.params.id = "7"
const productId = route.params.id

// Reactive object to store form data (with some default values)
const productForm = ref({
  name: '',
  description: '',
  price: 0,          // Default to 0 if no price is provided
  thumbnails: '',    // Default to empty string
})

// Loading & Error states
const isLoading = ref(false)
const error = ref(null)

/**
 * Fetch existing product data when component mounts.
 * If the API returns null/undefined for some fields, we’ll
 * keep (or revert to) the default values we assigned above.
 */
onMounted(async () => {
  isLoading.value = true
  try {
    // Fetch product details
    const { data } = await axios.get(`${baseUrl}/product/${productId}`)

    // Pre-fill the form with existing data OR default fallback.
    productForm.value = {
      name: data?.name || 'Default Name',
      description: data?.description || 'Default Description',
      price: data?.price !== undefined ? data.price : 0,
      thumbnails: data?.thumbnails || '',
    }
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      err.message ||
      'Failed to fetch product data.'
    Swal.fire('Error', error.value, 'error')
  } finally {
    isLoading.value = false
  }
})

/**
 * Submit handler for updating the product.
 */
async function handleUpdate() {
  isLoading.value = true
  error.value = null

  try {
    // Send PUT request to update the product
    await axios.put(`${baseUrl}/product/${productId}`, productForm.value)

    // Show success alert and navigate away (e.g., to product list or detail)
    Swal.fire('Success', 'Product updated successfully.', 'success')
    router.push('/product') // Adjust the route to your product list or details page
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      err.message ||
      'Failed to update product.'
    Swal.fire('Error', error.value, 'error')
  } finally {
    isLoading.value = false
  }
}

/**
 * Optional: goBack method to navigate to a previous page or product list.
 */
function goBack() {
  router.back() // or router.push('/product')
}
</script>

<style scoped>
/* Additional custom CSS if needed. 
   Tailwind utility classes are primarily used in-template. */
</style>
