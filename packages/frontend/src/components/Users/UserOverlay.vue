<template>
  <v-btn @click="toggleOpen" data-test-id="user-overlay-button" variant="text">
    More...
    <v-dialog v-model="open">
      <v-card max-width="500" data-test-id="user-overlay-dialog-content">
        <v-card-title class="px-5 pt-8">
          <span class="headline">{{ user.firstName }} {{ user.lastName }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ user.email }}</p>
          <p>{{ formattedBirthDate }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="close"
            data-test-id="user-overlay-dialog-close-button"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script lang="ts">
import { ref, computed, PropType } from "vue";
import { formatDate } from "@/utils/formatDate";
import type { User } from "fullstack-crud-node-backend/dist/user/user";


export default {
  name: "UserOverlay",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props: { user: User }) {
    const open = ref(false);

    const formattedBirthDate = computed(() => {
      return formatDate(props.user.birthday);
    });

    const toggleOpen = () => {
      open.value = !open.value;
    };

    const close = () => {
      open.value = false;
    };

    return {
      open,
      formattedBirthDate,
      toggleOpen,
      close
    };
  }
};
</script>
