import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Route } from "@angular/compiler/src/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";
import { map } from "rxjs/operators";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.State>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select("auth").pipe(map((state) => state.isAuth))
    }

}
