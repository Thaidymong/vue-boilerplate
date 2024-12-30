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
          All Products List
        </li>
      </ol>
    </nav>

    <!-- List Products Table -->
    <div class="w-full bg-white shadow-lg rounded-lg p-5 mt-4">
      <div class="flex justify-between items-center pb-4">
        <p class="text-lg font-semibold text-green-700 underline">
          All Products List
        </p>
        <router-link :to="{ name: 'add-product' }">
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md 
                   hover:bg-green-700 focus:outline-none focus:ring-2 
                   focus:ring-green-500 focus:ring-opacity-50 transition 
                   ease-in-out duration-300"
          >
            Add Product
          </button>
        </router-link>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-5">
        <p>Loading products...</p>
      </div>

      <!-- No products state -->
      <div v-else-if="products.length === 0" class="text-center py-5">
        <p>No products available.</p>
      </div>

      <!-- Products Table -->
      <table class="table-fixed w-full border-collapse text-sm text-gray-700" v-else>
        <thead class="bg-gray-100 text-xs">
          <tr>
            <th class="px-4 py-2 border text-[12px] w-[50px]">N.O</th>
            <th class="px-4 py-2 border w-[150px]">Category Name</th>
            <th class="px-4 py-2 border w-[150px]">Product Name</th>
            <th
              class="px-4 py-2 border w-[250px] overflow-hidden 
                     text-ellipsis whitespace-nowrap"
            >
              Description
            </th>
            <th class="px-4 py-2 border w-[80px]">Price</th>
            <th class="px-4 py-2 border w-[120px]">Thumbnails</th>
            <th class="px-4 py-2 border w-[140px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="product.id"
            class="bg-white border"
          >
            <td class="px-4 py-3 border text-center">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">
              {{ product.category?.name || 'No Category' }}
            </td>
            <td class="px-4 py-2 border">{{ product.name }}</td>
            <td
              class="px-4 py-2 border w-[250px] overflow-hidden 
                     text-ellipsis whitespace-nowrap"
            >
              {{ product.description }}
            </td>
            <td class="px-4 py-2 border">{{ product.price }}</td>
            <td class="px-4 py-2 border">
              <img
                :src="product.thumbnails"
                alt="Thumbnail"
                class="w-16 h-16 object-cover rounded"
              />
            </td>
            <td class="px-4 py-2 border">
              <router-link :to="{ name: 'updateProduct', params: { id: product.id } }">
                <button
                  class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 
                         transition ease-in-out duration-200"
                >
                  Edit
                </button>
              </router-link>
              <button
                @click="confirmDelete(product)"
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

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Reactive data
const products = ref([]);
const isLoading = ref(false);

// Fetch all products
async function fetchProducts() {
  isLoading.value = true;
  try {
    const response = await axios.get(`${baseUrl}/product`);
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    Swal.fire('Error!', 'Failed to fetch products. Please try again later.', 'error');
  } finally {
    isLoading.value = false;
  }
}

// Direct delete function
async function deleteProduct(productId) {
  try {
    await axios.delete(`${baseUrl}/product/${productId}`);
    Swal.fire('Success!', 'Product deleted successfully!', 'success');
    // Refresh the product list
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
    Swal.fire('Error!', 'Failed to delete product. Please try again later.', 'error');
  }
}

// Confirm delete with SweetAlert
async function confirmDelete(product) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete "${product.name}". This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    await deleteProduct(product.id);
  }
}

// Lifecycle hook
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped lang="scss">
/* Breadcrumb container */
.breadcrumb-container {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Breadcrumb styles */
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

/* Create category form (if you need it in this file) */
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
