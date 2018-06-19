import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
@Injectable()
export class AuthService {
    constructor(private router: Router, private afAuth: AngularFireAuth) { }
    private user: User;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email, userId: Math.round(Math.random() * 1000)
        };
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        this.authSuccessfully();
    }
    login(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
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
        return this.user != null;
    }
}