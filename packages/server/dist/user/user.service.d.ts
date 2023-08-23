import { User } from "./user";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    get(id: string): Promise<User | void>;
    getByName(lastName: string): Promise<User[] | void>;
}
