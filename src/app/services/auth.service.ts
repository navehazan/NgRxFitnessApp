import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AuthService {
    constructor(private router: Router, private afAuth: AngularFireAuth, private TrainingService: TrainingService, private snackBar: MatSnackBar) { }
    isAuthenticated = false;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
        }).catch((err) => {
            this.snackBar.open(err.message, null, { duration: 3000 })
        })

    }
    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((res) => {
            console.log(res)
        }).catch((err) => {
            this.snackBar.open(err.message, null, { duration: 3000 })
        })

    }
    initAuthListener() {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.isAuthenticated = true;
                this.isLogin.next(true);
                this.router.navigate(["/training"]);
            } else {
                this.isLogin.next(false);
                this.router.navigate(["/login"])
                this.isAuthenticated = false;
            }
        })
    }
    logut() {
        this.afAuth.auth.signOut();
    }


    isAuth() {
        return this.isAuthenticated;
    }
}