<template>
  <v-form class="users-search__container" @submit.prevent="searchUsers">
    <v-text-field
      data-test-id="users-search-input"
      color="surface"
      clearable
      @click:clear="clearInput"
      v-model="searchInput"
    >
      <template #label>
        Search user by last name
      </template>
    </v-text-field>
    <v-btn class="users-search__button" type="submit" rounded="xl"
      >Search</v-btn
    >
  </v-form>
</template>

<script lang="ts">
import { ref, SetupContext, watch } from "vue";

export default {
  name: "UsersSearch",
  setup(_, { emit }: SetupContext) {
    const searchInput = ref("");

    function searchUsers() {
      emit("search", searchInput.value);
    }

    watch(searchInput, () => {
      if (searchInput.value === "") {
        emit("clear");
      }
    });
    function clearInput() {
      searchInput.value = "";
      emit("clear");
    }

    return {
      searchInput,
      searchUsers,
      clearInput
    };
  }
};
</script>
<style lang="scss">
.users-search__button {
  margin-top: 8px;
}

.users-search__container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
}
</style>
