<template>
    <div>
        <div class="max-w-7xl mx-auto p-4">
            <h1>{{ name }}</h1>
            <p v-if="status === 'active'">User is active</p>
            <p v-else-if="status === 'pending'">User is pending</p>
            <p v-else>User is inactive</p>

            <form @submit.prevent="addTask" class="mt-4 w-[300px]">
                <label for="newTask" class="block text-sm font-medium ">Add Task</label>
                <div class="flex gap-2">
                    <input type="text" id="newTask" name="newTask" v-model="newTask"
                        style="padding: 4px; border: 2px solid #ccc; border-radius: 5px; flex: 1;"
                        placeholder="Enter a new task" />
                    <button type="submit"
                        style="background-color: #007bff; color: white; border: none; padding: 2px 4px; border-radius: 5px; cursor: pointer;">
                        Add Task
                    </button>
                </div>
            </form>

            <h3>Tasks:</h3>
            <ul>
                <li v-for="(task, index) in tasks" :key="index">
                    <span>{{ task }}</span>
                    <button @click="deleteTask(index)"
                        style="background-color: #ff4d4f; color: white; border: none; padding: 1px 4px; border-radius: 4px; cursor: pointer;">
                        x
                    </button>

                </li>
            </ul>

            <br />
            <button @click="toggleStatus"
                style="background-color: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                Change Status
            </button>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const name = ref('Thai Dymong');
        const status = ref('active');
        const tasks = ref(['Tasks One', 'Task Two', 'Tasks Three']);
        const isMenuOpen = ref(false);
        const newTask = ref('');

        const toggleStatus = () => {
            if (status.value === 'active') {
                status.value = 'pending';
            } else if (status.value === 'pending') {
                status.value = 'inactive';
            } else {
                status.value = 'active';
            }
        };

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        const navLinks = ref([
            { text: 'Home', href: '#' },
            { text: 'About', href: '#' },
            { text: 'Contact', href: '#' },
        ]);

        const addTask = () => {
            if (newTask.value.trim() !== '') {
                tasks.value.push(newTask.value);
                newTask.value = '';
            }
        };

        const deleteTask = (index) => {
            tasks.value.splice(index, 1);
        };

        onMounted(async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                tasks.value = data.map((task) => task.title)
            } catch (error) {
                console.log('Error fetching tasks');
            }
        })

        return {
            name,
            status,
            tasks,
            isMenuOpen,
            toggleStatus,
            toggleMenu,
            navLinks,
            newTask,
            addTask,
            deleteTask,
        };
    },
};
</script>

<style scoped></style>