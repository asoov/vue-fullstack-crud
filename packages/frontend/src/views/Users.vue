<template>
  <div>
    <div class="users">
      <div class="users--search">
        <UsersSearch
          @search="searchUsers"
          @clear="clearInput"
          data-test-id="users-search"
        />
      </div>
      <p v-if="isLoading" data-test-id="users-loading">Loading users....</p>
      <p v-else-if="error" data-test-id="users-error">{{ error.message }}</p>
      <div v-else class="users--list">
        <UsersList :users="usersDisplayed" data-test-id="users-list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { formatDate } from "@/utils/formatDate";
import type { User } from "fullstack-crud-node-backend/dist/user/user";
import UsersSearch from "@/components/Users/UsersSearch.vue";
import UsersList from "@/components/Users/UsersList.vue";
import {fetchAllUsers, fetchUsersByName} from "@/services/userService";

export default {
  name: "Users",
  components: {UsersList, UsersSearch },
  setup() {
    const isLoading = ref(true);
    const error = ref<Error | null>(null);
    const allUsers = ref<User[]>([]);
    const usersDisplayed = ref<User[]>([]);

    async function getAllUsers() {
      try {
        isLoading.value = true;
        allUsers.value = await fetchAllUsers();
        usersDisplayed.value = allUsers.value;
      } catch (err) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    async function searchUsers(searchInput: string) {
      try {
        isLoading.value = true;
        usersDisplayed.value = await fetchUsersByName(searchInput);
      } catch (err) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    function formatBirthDate(date: Date): string {
      return formatDate(date);
    }

    function clearInput() {
      usersDisplayed.value = allUsers.value;
    }

    onMounted(getAllUsers);

    return {
      isLoading,
      error,
      allUsers,
      usersDisplayed,
      searchUsers,
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
