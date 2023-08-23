<template>
  <div>
    <p v-if="getUsersLoading">Loading users....</p>
    <p v-else-if="getUsersError">{{ getUsersError.message }}</p>
    <div class="users" v-else>
      <div class="users--search">
        <v-form class="users--search__container" @submit.prevent="searchUsersByName">
          <v-text-field color="surface" clearable @click:clear="clearInput" v-model="searchInput">
            <template #label>
              Search user by last name
            </template>
          </v-text-field>
          <v-btn class="users--search__button" type="submit" rounded="xl">Search</v-btn>
        </v-form>
      </div>
      <div class="users--list">
        <v-list lines="two">
          <v-list-item v-for="user in usersDisplayed" :key="user.id" :title="`${user.firstName} ${user.lastName}`"
            prepend-avatar="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541">
            <v-list-item-subtitle>
              <p>{{ user.email }}</p>
              <p>{{ formatBirthDate(user.birthday) }}</p>
            </v-list-item-subtitle>
            <template v-slot:append>
              <UserOverlay :user="user" />
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import UserOverlay from "@/components/UserOverlay.vue";
import { formatDate } from "@/utils/formatDate";
import type { User } from "fullstack-crud-node-backend/dist/user/user";

export default {
  name: "Users",
  components: { UserOverlay },
  setup() {
    const searchInput = ref("");
    const getUsersLoading = ref(false);
    const getUsersError = ref<Error | null>(null);
    const searchUsersLoading = ref(false);
    const searchUsersError = ref<Error | null>(null);
    const allUsers = ref<User[]>([]);
    const usersDisplayed = ref<User[]>([]);

    async function getAllUsers() {
      try {
        getUsersLoading.value = true;
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users`);
        const data = await response.json();
        allUsers.value = data;
        usersDisplayed.value = data;
      } catch (error) {
        getUsersError.value = error;
      } finally {
        getUsersLoading.value = false;
      }
    }

    async function searchUsersByName() {
      try {
        searchUsersLoading.value = true;
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/name/${searchInput.value}`);
        const data = await response.json();
        usersDisplayed.value = data;
      } catch (error) {
        searchUsersError.value = error;
      } finally {
        searchUsersLoading.value = false;
      }
    }

    function formatBirthDate(date: Date): string {
      return formatDate(date);
    }

    function clearInput() {
      searchInput.value = "";
      usersDisplayed.value = allUsers.value;
    }

    watch(searchInput, (val) => {
      if (val === "") {
        usersDisplayed.value = allUsers.value;
      }
    });

    onMounted(getAllUsers);

    return {
      searchInput,
      getUsersLoading,
      getUsersError,
      searchUsersLoading,
      searchUsersError,
      allUsers,
      usersDisplayed,
      searchUsersByName,
      formatBirthDate,
      clearInput
    };
  }
}
</script>
<style lang="scss">
.users {
  padding: 16px;
  overflow: hidden;

  &--search {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;

    &__button {
      margin-top: 8px;
    }

    &__container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 16px;
    }
  }

  &--list {
    border-radius: 8px;
    border: 1px solid $gray-lighter;
    overflow: hidden;
  }
}
</style>
