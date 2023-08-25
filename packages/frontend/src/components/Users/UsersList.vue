<template>
  <v-list lines="two">
    <v-list-item
      v-for="user in users"
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
</template>

<script lang="ts">
import UserOverlay from "@/components/Users/UserOverlay.vue";
import { formatDate } from "@/utils/formatDate";

export default {
  name: "UsersList",
  components: { UserOverlay },
  props: {
    users: Array
  },
  methods: {
    formatBirthDate(date: Date): string {
      return formatDate(date);
    }
  }
};
</script>
