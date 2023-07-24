<script setup lang="ts"></script>

<template>
  <div class="navbar">
    <router-link to="/">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png"
        class="logo"
        alt="Vue logo"
      />
    </router-link>
    <router-link to="/vehicles">Vehicles</router-link>
    <router-link to="/users">Users</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.navbar {
  align-items: center;
  display: flex;
  gap: 48px;
}
.logo {
  width: 160px;
  padding: 1.5em;
}
</style>
