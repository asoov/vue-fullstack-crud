import { User } from "./user";
import { Repository } from "typeorm";
export declare class UserTestDataService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    private insertTestUsers;
}
