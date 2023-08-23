<template>
  <div class="vehicles">
    <div v-if="getVehiclesLoading">Loading...</div>
    <div v-else-if="getVehiclesError">{{ getVehiclesError.message }}</div>
    <div v-else class="vehicles--wrapper">
      <AddVehicleOverlay
        :loading="addVehicleLoading"
        @add-vehicle="addNewVehicle"
      />
      <Snackbar
        v-model="snackbar.show"
        :type="snackbar.type"
        :timeout="5000"
        :text="snackbar.text"
        @close="snackbar.show = false"
      />
      <div class="vehicles--cards-container">
        <v-card v-for="vehicle in vehicles">
          <template #title>
            <div class="vehicles--title">
              {{ vehicle.model }}
              <div
                class="vehicles--color-dot"
                :style="{ background: vehicle.color }"
              />
            </div>
          </template>
          <template #subtitle>{{ vehicle.color }}</template>
          <template #text
            >{{ vehicle.licensePlate }} |
            {{ new Date(vehicle.validTill).toDateString() }}</template
          >
        </v-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive } from "vue";
import Snackbar from "@/components/Snackbar.vue";
import AddVehicleOverlay from "@/components/AddVehicleOverlay.vue";
import type { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";

export default {
  name: "Vehicles",
  components: { Snackbar, AddVehicleOverlay },

  setup() {
    const getVehiclesLoading = ref(false);
    const getVehiclesError = ref<Error | null>(null);
    const addVehicleLoading = ref(false);
    const addVehicleError = ref<Error | null>(null);
    const vehicles = ref<Vehicle[]>([]);
    const snackbar = reactive({
      show: false,
      text: "",
      type: "success"
    });

    async function getVehicles() {
      try {
        getVehiclesLoading.value = true;
        const response = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/vehicles`
        );
        const data = await response.json();
        vehicles.value = data;
      } catch (error) {
        getVehiclesError.value = error;
      } finally {
        getVehiclesLoading.value = false;
      }
    }

    async function addNewVehicle(vehicleData: Vehicle) {
      try {
        addVehicleLoading.value = true;
        const result = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/vehicles`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...vehicleData,
                validTill: new Date(vehicleData.validTill)
              })
            }
        );
        if (!result.ok) {
          throw new Error("Failed to add vehicle");
        }
        snackbar.show = true;
        snackbar.text = "Vehicle Added Successfully";
        snackbar.type = "success";

        await getVehicles();
      } catch (error) {
        addVehicleError.value = error;
        snackbar.show = true;
        snackbar.text = "Vehicle Added Failed";
        snackbar.type = "error";
      } finally {
        addVehicleLoading.value = false;
      }
    }

    // Fetch vehicles when component is created
    getVehicles();

    return {
      getVehiclesLoading,
      getVehiclesError,
      addVehicleLoading,
      addVehicleError,
      vehicles,
      snackbar,
      addNewVehicle
    };
  }
};
</script>

<style lang="scss">
.vehicles {
  &--wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &--cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &--title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &--color-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
}
</style>
