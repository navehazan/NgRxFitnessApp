import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
export class AuthService {
    private user: User;
    registerUser(authData: AuthData) {
        this.user.email = authData.email;
        this.user.userId = Math.round(Math.random() * 1000);
    }
    login(authData: AuthData) {
        this.user.email = authData.email;
        this.user.userId = Math.round(Math.random() * 1000);
    }
    logut() {
        this.user = null;
    }
    getUser() {
        return { ...this.user };
    }
}