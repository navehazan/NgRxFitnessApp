import { UiService } from './../../../services/ui.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../app.reducer";
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private uiService: UiService, private authService: AuthService, private store: Store<fromApp.State>) { }
  isLogin = false;
  ngOnInit() {
    this.store.select("auth").subscribe((state) => {
      this.isLogin = state && state.isAuth;
    })
  }
  toggleSidenav() {
    this.uiService.sidenav$.next("click");
  }
  onLogout() {
    this.toggleSidenav();
    this.authService.logut();
  }

}
