<template>
  <div>
    <div class="navbar bg-gray-950">
      <div class="flex-1 pl-10">
        <p class="font-bold text-xl text-white">SCRIPT</p>
      </div>
      <div class="flex-none pr-10">
        <div class="dropdown dropdown-end pr-2">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle hover:bg-gray-700"
          >
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item bg-white text-black"
                >8</span
              >
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-lg font-bold">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar hover:bg-gray-700"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="../assets/profile2.jpg"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between hover:bg-gray-700 hover:text-white">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a class="hover:bg-gray-700 hover:text-white">Settings</a></li>
            <li @click="logout">
              <a class="hover:bg-gray-700 hover:text-white">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import AuthService from "@/service/AuthService.js";
export default {
  inject: ["GStore"],
  name: "NavBar",
  methods: {
    logout() {
      AuthService.logout();
    },
  },
};
</script>
