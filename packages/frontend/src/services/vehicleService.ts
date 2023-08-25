import { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_ENDPOINT}/vehicles`);
  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }
  return response.json();
}

export async function addVehicle(vehicleData: Vehicle): Promise<void> {
  const result = await fetch(`${API_ENDPOINT}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...vehicleData,
      validTill: new Date(vehicleData.validTill)
    })
  });
  if (!result.ok) {
    throw new Error("Failed to add vehicle");
  }
}
