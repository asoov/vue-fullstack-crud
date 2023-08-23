<template>
  <v-btn @click="open = !open">
    + Add new vehicle
    <v-dialog v-model="open">
      <v-card class="add-vehicle-overlay p-8" :loading="loading">
        <v-card-title class="px-8 pt-8">
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
import { ref, computed, SetupContext } from "vue";
import { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";
import { formatDateToYYYYMMDD } from "@/utils/formatDate";

export default {
  name: "AddVehicleOverlay",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(_, { emit }: SetupContext) {
    const formData = ref<Partial<Vehicle>>({
      model: "",
      color: "",
      licensePlate: "",
      validTill: null,
      vin: ""
    });

    const valid = ref(false);
    const open = ref(false);

    const validationRule = (value: string) => !!value || "Field is Required";

    const minDate = computed(() => {
      const date = new Date();
      return formatDateToYYYYMMDD(date);
    });

    function save() {
      emit("add-vehicle", formData.value);
    }

    function close() {
      open.value = false;
    }

    return {
      formData,
      valid,
      open,
      validationRule,
      minDate,
      save,
      close
    };
  }
};
</script>
<style lang="scss">
.add-vehicle-overlay {
  &--button-container {
    padding: 0 8px;
    display: flex;
    gap: 8px;
  }
}
</style>
