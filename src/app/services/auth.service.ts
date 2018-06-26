import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { AuthData } from "../models/auth-data.model";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from './training.service';
import { UiService } from './ui.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import * as AUTH from "../actions/auth.action";
import * as UI from "../actions/ui.action";
@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private TrainingService: TrainingService,
        private uiService: UiService,
        private store: Store<fromApp.State>) { }
    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.Start())
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
            this.store.dispatch(new UI.End())
        }).catch((err) => {
            this.store.dispatch(new UI.End())
            this.uiService.showSnackbar(err.message, null, 3000)

        })

    }
    login(authData: AuthData) {
        this.store.dispatch(new UI.Start())
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((res) => {
            this.store.dispatch(new UI.End())
        }).catch((err) => {
            this.store.dispatch(new UI.End())
            this.uiService.showSnackbar(err.message, null, 3000)
        })

    }
    initAuthListener() {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.store.dispatch(new AUTH.Login())
                this.router.navigate(["/training"]);
            } else {
                this.store.dispatch(new AUTH.Logout())
                this.router.navigate(["/login"])
            }
        })
    }
    logut() {
        this.afAuth.auth.signOut();
    }
}