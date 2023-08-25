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
      <VehiclesCardsList :vehicles="vehicles" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { fetchVehicles, addVehicle } from "@/services/vehicleService";
import Snackbar from "@/components/Snackbar.vue";
import AddVehicleOverlay from "@/components/AddVehicleOverlay.vue";
import type { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";
import VehiclesCardsList from "@/components/Vehicles/VehiclesCardsList.vue";

export default {
  name: "Vehicles",
  components: {VehiclesCardsList, Snackbar, AddVehicleOverlay },
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

    async function loadVehicles() {
      try {
        getVehiclesLoading.value = true;
        vehicles.value = await fetchVehicles();
      } catch (error) {
        getVehiclesError.value = error as Error;
      } finally {
        getVehiclesLoading.value = false;
      }
    }

    async function addNewVehicle(vehicleData: Vehicle) {
      try {
        addVehicleLoading.value = true;
        await addVehicle(vehicleData);
        vehicles.value = [...vehicles.value, vehicleData];
        snackbar.show = true;
        snackbar.text = "Vehicle Added Successfully";
        snackbar.type = "success";
      } catch (error) {
        addVehicleError.value = error as Error;
        snackbar.show = true;
        snackbar.text = (error as Error).message || "Vehicle Add Failed";
        snackbar.type = "error";
      } finally {
        addVehicleLoading.value = false;
      }
    }

    loadVehicles();

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
}
</style>
