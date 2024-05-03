<!-- NavBar.vue -->

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <nav class="navbar flex justify-between items-center h-20 px-8">
    <div class="flex items-center">
      <router-link to="/">
        <img
          src="@/assets/mainlogolow.svg"
          alt="Logo"
          class="h-8 mr-4"
        />
      </router-link>
    </div>

    <div class="search relative w-full md:w-auto mr-4">
      <input
        type="text"
        placeholder="Search"
        class="w-full bg-transparent px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-700 transition duration-300 ease-in-out"
      />
      <button class="absolute right-0 top-0 mt-2 mr-2">
        <i class="fas fa-search text-gray-600 text-lg"></i>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative group mr-4"> 
        <button class="text-gray-600 text-lg focus:outline-none">
           <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200" alt="jane avatar">
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10 invisible group-hover:visible"
        >
          <router-link
            to="/settings"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Settings
          </router-link>
          <button class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
            Logout
          </button>
          <router-link to="/about" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            About
          </router-link>
        </div>
      </div>

      <div class="relative group">
        <button class="text-gray-600 text-lg focus:outline-none">
          <i class="fas fa-bell"></i>
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10 invisible group-hover:visible group-focus:visible"
        >
          <p class="px-4 py-2 text-gray-800">You have 2 new notifications</p>
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            See All Notifications
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>





<script>
export default {
  name: "NavBar",
  
};
</script>
