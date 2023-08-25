<template>
  <v-card
    v-for="vehicle in vehicles"
    :key="vehicle.id"
    data-test-id="vehicles-cards-list-item"
  >
    <template #title>
      <div class="vehicles-cards-list--title">
        {{ vehicle.model }}
        <div
          data-test-id="vehicles-cards-list--color-dot"
          class="vehicles-cards-list--color-dot"
          :style="{ background: vehicle.color }"
        />
      </div>
    </template>
    <template #subtitle>{{ vehicle.color }}</template>
    <template #text>
      <span data-test-id="vehicles-cards-list--license-plate">{{
        vehicle.licensePlate
      }}</span>
      |
      <span data-test-id="vehicles-cards-list--valid-till">
        {{ new Date(vehicle.validTill).toDateString() }}
      </span>
    </template>
  </v-card>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";

export default {
  name: "VehiclesCardsList",
  props: {
    vehicles: {
      type: Array as PropType<Vehicle>,
      required: true
    }
  }
};
</script>

<style lang="scss">
.vehicles-cards-list--title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vehicles-cards-list--color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
</style>
