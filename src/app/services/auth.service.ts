import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
@Injectable()
export class AuthService {
    constructor(private router: Router, private afAuth: AngularFireAuth) { }
    isAuthenticated = false;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
            this.authSuccessfully();
        }).catch((err) => {
            console.log(err)
        })

    }
    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
            this.authSuccessfully();
        }).catch((err) => {
            console.log(err)
        })

    }
    logut() {
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.isLogin.next(false);
        this.router.navigate(["/login"])
    }


    authSuccessfully() {
        this.isAuthenticated = true;
        this.isLogin.next(true);
        this.router.navigate(["/training"]);
    }
    isAuth() {
        return this.isAuthenticated;
    }
}