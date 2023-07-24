<template>
  <div>
    <p v-if="getUsersLoading">Loading users....</p>
    <p v-else-if="getUsersError">{{ getUsersError.message }}</p>
    <div class="users" v-else>
      <div class="users--search">
        <v-form
          class="users--search__container"
          @submit.prevent="searchUsersByName"
        >
          <v-text-field
            color="surface"
            clearable
            @click:clear="clearInput"
            v-model="searchInput"
          >
            <template #label>
              Search user by last name
            </template>
          </v-text-field>
          <v-btn class="users--search__button" type="submit" rounded="xl"
            >Search</v-btn
          >
        </v-form>
      </div>
      <div class="users--list">
        <v-list lines="two">
          <v-list-item
            v-for="user in usersDisplayed"
            :key="user.id"
            :title="`${user.firstName} ${user.lastName}`"
            prepend-avatar="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          >
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
import UserOverlay from "../components/UserOverlay.vue";
import { formatDate } from "../utils/formatDate";
// used yarn link to link abi-node-backend to frontend for type usage
import { User } from "abi-node-backend/dist/user/user";

export default {
  name: "Users",
  components: { UserOverlay },
  data(): {
    searchInput: string;
    searchUsersLoading: boolean;
    searchUsersError: Error | null;
    getUsersLoading: boolean;
    getUsersError: Error | null;
    allUsers: User[];
    usersDisplayed: User[];
  } {
    return {
      searchInput: "",
      getUsersLoading: false,
      getUsersError: null,
      searchUsersLoading: false,
      searchUsersError: null,
      allUsers: [],
      usersDisplayed: []
    };
  },

  async created() {
    await this.getAllUsers();
  },

  methods: {
    async getAllUsers(): Promise<void> {
      try {
        this.getUsersLoading = true;
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/users`
        );
        const data = await response.json();
        this.allUsers = data;
        this.usersDisplayed = data;
      } catch (error) {
        this.getUsersError = error;
      } finally {
        this.getUsersLoading = false;
      }
    },

    async searchUsersByName(): void {
      console.log("searchByName", this.searchInput);
      // As we are already fetching all users on page load, we COULD just filter the users array
      // However as we created a endpoint to look, we will use it here
      // This is also more realistic, as we would not fetch all users on page load in a real world scenario
      try {
        this.searchUsersLoading = true;
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/users/name/${this.searchInput}`
        );
        const data = await response.json();
        this.usersDisplayed = data;
      } catch (error) {
        this.searchUsersError = error;
      } finally {
        this.searchUsersLoading = false;
      }
    },

    formatBirthDate(date: Date): string {
      return formatDate(date);
    },
    clearInput() {
      this.searchInput = "";
      this.usersDisplayed = this.allUsers;
    }
  },

  watch: {
    searchInput(val: string) {
      if (val === "") {
        this.usersDisplayed = this.allUsers;
      }
    }
  }
};
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
