import { Vehicle } from "./vehicle";
import { VehicleService } from "./vehicle.service";
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    getVehicles(): Promise<Vehicle[]>;
    addVehicle(vehicle: Vehicle): Promise<Vehicle>;
}
