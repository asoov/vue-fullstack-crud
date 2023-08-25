import { Vehicle } from "fullstack-crud-node-backend/dist/vehicle/vehicle";

export const getMockVehicleData = (): Vehicle => {
  return {
    id: "123e4567-e89b-12d3-a456-426614174000",
    licensePlate: "XYZ-1234",
    vin: "1HGCM82633A123456",
    model: "Tesla Model 3",
    active: true,
    color: "Red",
    validTill: new Date("2099-12-31")
  };
};
