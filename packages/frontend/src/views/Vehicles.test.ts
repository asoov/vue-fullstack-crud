import { flushPromises, mount } from "@vue/test-utils";
import Vehicles from "@/views/Vehicles.vue";
import { nextTick } from "vue";
import { vi } from "vitest";

// Mock the services
vi.mock("@/services/vehicleService", () => ({
  fetchVehicles: vi.fn(),
  addVehicle: vi.fn()
}));

import { fetchVehicles, addVehicle } from "@/services/vehicleService";
import { getMockVehicleData } from "@/test/getMockVehicleData";
import { mountWithPlugins } from "@/test/test-util";

describe("Vehicles.vue", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    vi.clearAllMocks();
  });

  it("shows loading when fetching vehicles", async () => {
    (fetchVehicles as vi).mockResolvedValueOnce([]);
    const wrapper = mountWithPlugins(Vehicles);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("shows error message when there is an error fetching vehicles", async () => {
    const errorMessage = "Failed to fetch vehicles";
    (fetchVehicles as vi).mockRejectedValueOnce(new Error(errorMessage));
    const wrapper = mountWithPlugins(Vehicles);
    await flushPromises();
    expect(wrapper.text()).toContain(errorMessage);
  });

  it("updates vehicles list and shows snackbar on successful vehicle addition", async () => {
    const mockVehicles = [getMockVehicleData()];
    (fetchVehicles as vi).mockResolvedValueOnce(mockVehicles);
    (addVehicle as vi).mockResolvedValueOnce(undefined);

    const wrapper = mountWithPlugins(Vehicles);

    await wrapper.vm.addNewVehicle(getMockVehicleData());
    await flushPromises();
    expect(fetchVehicles).toHaveBeenCalledTimes(1); // it should be called once on load
    expect(addVehicle).toHaveBeenCalledTimes(1); // it should be called once when adding a vehicle
    expect(wrapper.vm.vehicles).toEqual([...mockVehicles, ...mockVehicles]);
    expect(wrapper.vm.snackbar.show).toBe(true);
    expect(wrapper.vm.snackbar.text).toBe("Vehicle Added Successfully");
  });
});
