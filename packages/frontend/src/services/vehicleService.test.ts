import { fetchVehicles, addVehicle } from "@/services/vehicleService";
import { vi } from "vitest";
import { getMockVehicleData } from "@/test/getMockVehicleData";

describe("vehicleService", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe("fetchVehicles", () => {
    it("fetches vehicles successfully", async () => {
      // Setup
      const mockVehicles = [getMockVehicleData()];
      (global.fetch as vi).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockVehicles)
      });

      // Execute
      const result = await fetchVehicles();

      // Verify
      expect(result).toEqual(mockVehicles);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_ENDPOINT}/vehicles`
      );
    });

    it("throws an error when fetching vehicles fails", async () => {
      (global.fetch as vi).mockResolvedValueOnce({
        ok: false
      });
      await expect(fetchVehicles()).rejects.toThrow("Failed to fetch vehicles");
    });
  });

  describe("addVehicle", () => {
    it("adds a vehicle successfully", async () => {
      const mockVehicle = getMockVehicleData();
      (global.fetch as vi).mockResolvedValueOnce({
        ok: true
      });

      await addVehicle(mockVehicle);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_ENDPOINT}/vehicles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...mockVehicle,
            validTill: new Date(mockVehicle.validTill)
          })
        }
      );
    });

    it("throws an error when adding a vehicle fails", async () => {
      const mockVehicle = getMockVehicleData();
      (global.fetch as vi).mockResolvedValueOnce({
        ok: false
      });
      await expect(addVehicle(mockVehicle)).rejects.toThrow(
        "Failed to add vehicle"
      );
    });
  });
});
