<template>
  <div>
    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="bg-gray-100 p-4 rounded-lg shadow-sm">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <a href="#" class="text-blue-600 hover:underline">
            Home <span class="text-black">→</span>
          </a>
        </li>
        <li aria-current="page" class="font-semibold text-gray-800">
          Create Category
        </li>
      </ol>
    </nav>
    
    <!-- List Categories Table -->
    <div class="w-full bg-white shadow-lg rounded-lg p-5">
      <div class="flex justify-between items-center pb-4">
        <p class="text-lg font-semibold text-green-700 underline">
          Category Lists
        </p>
        <router-link :to="{ name: 'create-category' }">
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md
                   hover:bg-green-700 focus:outline-none focus:ring-2
                   focus:ring-green-500 focus:ring-opacity-50 transition
                   ease-in-out duration-300"
          >
            Add Category
          </button>
        </router-link>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-5">
        <p>Loading categories...</p>
      </div>

      <!-- No categories state -->
      <div v-else-if="categories.length === 0" class="text-center py-5">
        <p>No categories available.</p>
      </div>

      <!-- Categories Table -->
      <table v-else class="w-full border-collapse text-sm text-gray-700">
        <thead class="bg-gray-100 text-xs">
          <tr>
            <th class="px-4 py-2 border text-[12px]">N.O</th>
            <th class="px-4 py-2 border">Category Name</th>
            <th class="px-4 py-2 border">Description</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(category, index) in categories"
            :key="category.id"
            class="bg-white border"
          >
            <td class="px-4 py-3 border">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">{{ category.name }}</td>
            <td class="px-4 py-2 border">{{ category.description }}</td>
            <td class="px-4 py-2 border">
              <router-link :to="{ name: 'updateCategory', params: { id: category.id } }">
                <button
                  class="bg-blue-600 text-white px-3 py-1 rounded
                         hover:bg-blue-700 transition ease-in-out duration-200"
                >
                  Edit
                </button>
              </router-link>
             
              <button
                @click="confirmDelete(category)"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700
                       transition ease-in-out duration-200 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

// Base URL (from your .env file or hardcode if needed)
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Reactive state
const categories = ref([]);
const isLoading = ref(false);

// Fetch all categories from API
async function fetchCategory() {
  isLoading.value = true;
  try {
    const response = await axios.get(`${baseUrl}/category`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    Swal.fire('Error!', 'Failed to fetch categories. Please try again later.', 'error');
  } finally {
    isLoading.value = false;
  }
}

// Show SweetAlert2 confirmation before deleting
async function confirmDelete(category) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete "${category.name}". This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
  });
  if (result.isConfirmed) {
    await deleteCategory(category.id);
  }
}

// Perform the actual category deletion
async function deleteCategory(id) {
  try {
    await axios.delete(`${baseUrl}/category/${id}`);
    Swal.fire('Deleted!', 'Category has been deleted.', 'success');
    // Refresh the list
    fetchCategory();
  } catch (error) {
    console.error('Error deleting category:', error);
    Swal.fire('Error!', 'Failed to delete category. Please try again later.', 'error');
  }
}

// Fetch categories on component mount
onMounted(() => {
  fetchCategory();
});
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.breadcrumb {
  margin-bottom: 0;
  font-size: 1rem;
  color: #6c757d;

  .breadcrumb-item {
    &.active {
      font-weight: bold;
      color: #343a40;
    }
  }
}

.breadcrumb-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}

.create-category {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #ffffff, #f1f1f1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #333;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
  }

  .form-actions {
    display: flex;
    justify-content: center;

    .btn-primary {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  }
}
</style>
