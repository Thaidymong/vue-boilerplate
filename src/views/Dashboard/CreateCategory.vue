<template>
  <div class="container">
    <p class="title text-center">Create Category</p>
    <form @submit.prevent="handleSubmit" class="category-form">
      <div class="form-group">
        <label for="name" class="form-label">Category Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          required
          class="form-textarea"
        ></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="submit-button">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const form = ref({
  name: "",
  description: "",
});

const handleSubmit = async () => {
  try {
    const response = await axios.post(`${baseUrl}/category`, form.value);

    if ([200, 201].includes(response.status)) {
      Swal.fire("Success!", "Category added successfully!", "success");
      router.push("/category");
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error adding Category:", error);
    Swal.fire("Error!", error.response?.data?.message || error.message || "Failed to add Category. Please try again later.", "error");
  }
};
</script>

<style scoped>
.container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00992b;
  text-align: center;
  margin-bottom: 1.5rem;
}

.category-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #00992b;
  box-shadow: 0 0 0 3px rgba(0, 153, 43, 0.2);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: #00992b;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #007f23;
}
</style>
