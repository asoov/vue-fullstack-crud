<template>
  <v-btn @click="open = !open">
    + Add new vehicle
    <v-dialog v-model="open">
      <v-card class="add-vehicle-overlay" :loading="loading">
        <v-card-title>
          Add new Vehicle
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="formData.model"
              :rules="[validationRule]"
              label="Model"
            />
            <v-text-field
              v-model="formData.color"
              :rules="[validationRule]"
              label="Color"
            />
            <v-text-field
              v-model="formData.licensePlate"
              :rules="[validationRule]"
              label="License Plate"
            />
            <v-text-field v-model="formData.vin" label="VIN" />
            <v-text-field
              type="date"
              :rules="[validationRule]"
              :min="minDate"
              v-model="formData.validTill"
              label="Valid Till"
            />
            <v-spacer />
            <v-card-actions cols="12">
              <v-btn color="primary" :disabled="!valid" text @click="save"
                >Save</v-btn
              >
              <v-btn text @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script lang="ts">
// used yarn link to link abi-node-backend to frontend for type usage
import { Vehicle } from "abi-node-backend/dist/vehicle/vehicle";
import { formatDateToYYYYMMDD } from "../utils/formatDate";

export default {
  name: "AddVehicleOverlay",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data(): {
    formData: Partial<Vehicle>;
    valid: boolean;
    validationRule: (value: string) => boolean | string;
    open: boolean;
  } {
    return {
      formData: {
        model: "",
        color: "",
        licensePlate: "",
        validTill: null,
        vin: ""
      },
      valid: false,
      validationRule: (value: string) => !!value || "Field is Required",
      open: false
    };
  },
  computed: {
    minDate(): string {
      const date = new Date();
      return formatDateToYYYYMMDD(date);
    }
  },
  methods: {
    save(): void {
      this.$emit("add-vehicle", this.formData);
    },
    close(): void {
      this.open = false;
    }
  }
};
</script>
<style lang="scss">
.add-vehicle-overlay {
  padding: 16px;

  &--button-container {
    padding: 0 8px;
    display: flex;
    gap: 8px;
  }
}
</style>
