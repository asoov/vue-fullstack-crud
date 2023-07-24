<template>
  <v-btn @click="open = !open" color="grey-lighten-1" variant="text"
    >More...
    <v-dialog v-model="open">
      <v-card max-width="500">
        <v-card-title>
          <span class="headline">{{ user.firstName }} {{ user.lastName }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ user.email }}</p>
          <p>{{ formattedBirthDate }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="open = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script lang="ts">
import { formatDate } from "../utils/formatDate";
import type {User}  from "abi-node-backend/dist/user/user";
import {Prop} from "vue";
export default {
  name: "UserOverlay",
  props: {
    user: {
      type: Object as Prop<User>,
      required: true
    }
  },
  data(): { open: boolean } {
    return {
      open: false
    };
  },
  computed: {
    formattedBirthDate(): string {
      return formatDate(this.user.birthday);
    }
  }
};
</script>
