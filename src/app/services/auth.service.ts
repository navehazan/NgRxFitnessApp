import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from './ui.service';
@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private TrainingService: TrainingService,
        private uiService: UiService) { }
    isAuthenticated = false;
    isLogin = new Subject<boolean>();
    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged$.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            this.uiService.loadingStateChanged$.next(false);
        }).catch((err) => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackbar(err.message, null, { duration: 3000 })

        })

    }
    login(authData: AuthData) {
        this.uiService.loadingStateChanged$.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((res) => {
            this.uiService.loadingStateChanged$.next(false);
        }).catch((err) => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackbar(err.message, null, { duration: 3000 })
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