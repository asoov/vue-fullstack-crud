<template>
  <v-snackbar :color="type">
    <div class="snackbar">
      {{ text }}
      <v-btn text="Close" color="white" @click="$emit('close')">Close</v-btn>
    </div>
  </v-snackbar>
</template>
<script lang="ts">
export default {
  name: "Snackbar",
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value: string) => ["success", "error"].includes(value)
    }
  }
};
</script>
<style lang="scss">
.snackbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
