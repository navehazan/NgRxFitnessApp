import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
export class AuthService {
    private user: User;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email, userId: Math.round(Math.random() * 1000)
        };
        this.isLogin.next(true);
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email, userId: Math.round(Math.random() * 1000)
        };
        this.isLogin.next(true);
    }
    logut() {
        this.user = null;
        this.isLogin.next(false);
    }
    getUser() {
        return { ...this.user };
    }
    // isAuth() {
    //     return !this.user === null;
    // }
}