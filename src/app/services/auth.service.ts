import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthService {
    constructor(private router: Router) { }
    private user: User;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email, userId: Math.round(Math.random() * 1000)
        };
        this.authSuccessfully();
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email, userId: Math.round(Math.random() * 1000)
        };
        this.authSuccessfully();
    }
    logut() {
        this.user = null;
        this.isLogin.next(false);
        this.router.navigate(["/login"])
    }
    getUser() {
        return { ...this.user };
    }

    authSuccessfully() {
        this.isLogin.next(true);
        this.router.navigate(["/training"]);
    }
    isAuth() {
        return !this.user === null;
    }
}