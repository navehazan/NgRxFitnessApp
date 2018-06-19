import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from './training.service';
@Injectable()
export class AuthService {
    constructor(private router: Router, private afAuth: AngularFireAuth, private TrainingService: TrainingService) { }
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
        this.TrainingService.cancelSubscription();
        this.afAuth.auth.signOut();
        this.isLogin.next(false);
        this.router.navigate(["/login"])
        this.isAuthenticated = false;
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