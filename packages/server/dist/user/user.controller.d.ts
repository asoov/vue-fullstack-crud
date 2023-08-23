import { User } from "./user";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | void>;
    getUsersByName(name: string): Promise<User[] | void>;
}
