<template>
  <div class="bg-[#FAFAFA] min-h-screen">
    <div class="md:grid md:grid-cols-5 h-screen">
      <!-- Mobile Navbar Toggle Button -->
      <button
        class="md:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-20"
        @click="toggleSidebar"
      >
        <i class="fa-solid fa-bars"></i>
      </button>

      <!-- sidebar -->
      <div
        :class="[
          'bg-gray-800 custom-shadow-right fixed md:relative z-10 md:z-0 top-0 md:top-auto h-full transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
        class="md:translate-x-0 md:block"
      >
        <div class="w-full h-auto flex justify-center cursor-pointer p-4">
          <img class="w-[121px]" src="/assets/logo.png" alt="" />
        </div>

        <!-- Sidebar Links -->
        <router-link
          to="/dashboard"
          class="cursor-pointer hover:bg-[#e01a2e] text-gray-300 hover:text-white rounded-s-md ml-[20px] flex group relative"
        >
          <div class="p-[10px] w-[50px]">
            <i class="fa-solid fa-house-chimney text-[20px] text-blue-500"></i>
          </div>
          <div class="py-[10px] mx-[10px]">
            <p class="siemreap-regular text-[16px]">Dashboard</p>
          </div>
        </router-link>

        <router-link
          to="/employee"
          class="cursor-pointer mt-2 hover:bg-[#e01a2e] text-gray-300 hover:text-white rounded-s-md ml-[20px] flex group relative"
        >
          <div class="p-[10px] w-[50px]">
            <i class="fa-solid fa-users text-[20px] text-gray-400"></i>
          </div>
          <div class="py-[10px] mx-[10px]">
            <p class="siemreap-regular text-[16px]">Employee Management</p>
          </div>
        </router-link>

        <!-- Additional Sidebar Content... -->
      </div>

      <!-- content -->
      <div class="col-span-4 transition-all duration-300 ease-in-out">
        <!-- Header -->
        <div class="flex justify-end bg-gray-800 p-4 text-white">
          <div class="flex gap-5 items-end">
            <p class="text-[13px] md:text-[16px] font-semibold">
              {{ currentTime }}
            </p>
            <p class="text-[13px] md:text-[16px] font-semibold">
              {{ currentDate }}
            </p>
            <p
              class="text-green-300 text-[13px] md:text-[16px] font-semibold hidden md:block"
            >
              Update!!
            </p>
          </div>
        </div>
        <!-- Content Area -->
        <div class="h-auto p-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["username", "userRole"]), // Map Vuex state to computed properties
    role() {
      return this.userRole?.name || "";
    },
  },
  data() {
    return {
      currentTime: "",
      currentDate: "",
      showDropdown: false,
      eFormDropdownOpen: false,
      eFormDropdownOpensetting: false,
      UserDropdownOpensetting: false,
      ApprovalDropdownOpensetting: false,
      sidebarOpen: false,
    };
  },
  created() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.currentDate = now.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleEFormDropdown() {
      this.eFormDropdownOpen = !this.eFormDropdownOpen;
    },
    toggleEFormDropdownsetting() {
      this.eFormDropdownOpensetting = !this.eFormDropdownOpensetting;
    },
    toggleUserDropdownsetting() {
      this.UserDropdownOpensetting = !this.UserDropdownOpensetting;
    },
    toggleApprovalDropdownsetting() {
      this.ApprovalDropdownOpensetting = !this.ApprovalDropdownOpensetting;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$router.push("/login");
    },
  },
};
</script>
  
  <style scoped>
/* Styles for responsiveness and usability */

/* Hide sidebar for smaller devices by default */
@media (max-width: 767px) {
  .sidebar-open {
    transform: translateX(0);
  }
  .sidebar-closed {
    transform: translateX(-100%);
  }

  /* Reduce padding and font sizes for header on smaller screens */
  .header-content {
    padding: 2rem;
  }
}
</style>
  