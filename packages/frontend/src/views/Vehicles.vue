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
import AddVehicleOverlay from "../components/AddVehicleOverlay.vue";

// used yarn link to link abi-node-backend to frontend for type usage
import { Vehicle } from "abi-node-backend/src/vehicle/vehicle";
import { types } from "sass";
import Error = types.Error;
import Snackbar from "../components/Snackbar.vue";

export default {
  name: "Vehicles",
  components: { Snackbar, AddVehicleOverlay },
  data(): {
    getVehiclesLoading: boolean;
    getVehiclesError: Error | null;
    addVehicleLoading: boolean;
    addVehicleError: Error | null;
    vehicles: Vehicle[];
    snackbar: {
      show: boolean;
      text: string;
      type: string;
    };
  } {
    return {
      vehicles: [],
      getVehiclesLoading: false,
      getVehiclesError: null,
      addVehicleLoading: false,
      addVehicleError: null,
      snackbar: {
        show: false,
        text: "",
        type: "success"
      }
    };
  },
  methods: {
    async addNewVehicle(vehicleData: Vehicle) {
      try {
        this.addVehicleLoading = true;
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
        this.snackbar = {
          show: true,
          text: "Vehicle Added Successfully",
          type: "success"
        };
        await this.getVehicles();
      } catch (error) {
        this.addVehicleError = error;
        this.snackbar = {
          show: true,
          text: "Vehicle Added Failed",
          type: "error"
        };
        console.error(error);
      } finally {
        this.addVehicleLoading = false;
      }
    },
    async getVehicles() {
      try {
        this.getVehiclesLoading = true;
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/vehicles`
        );
        const data = await response.json();
        this.vehicles = data;
      } catch (error) {
        console.error(error);
        this.getVehiclesError = error;
      } finally {
        this.getVehiclesLoading = false;
      }
    }
  },
  async created() {
    await this.getVehicles();
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
