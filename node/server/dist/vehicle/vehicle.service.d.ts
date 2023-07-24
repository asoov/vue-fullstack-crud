import { Vehicle } from "./vehicle";
import { Repository } from "typeorm";
export declare class VehicleService {
    private readonly vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    getAll(): Promise<Vehicle[]>;
    add(vehicle: Vehicle): Promise<Vehicle>;
}
