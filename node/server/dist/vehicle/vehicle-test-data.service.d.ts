import { Vehicle } from "./vehicle";
import { Repository } from "typeorm";
export declare class VehicleTestDataService {
    private readonly vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    private insertTestVehicles;
}
