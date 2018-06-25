import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../app.reducer";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private uiService: UiService, private authService: AuthService, private store: Store<fromApp.State>) { }
  isLogin = false;
  ngOnInit() {
    this.store.select("auth").subscribe((state) => {
      this.isLogin = state && state.isAuth
    })

  }
  toggleSidenav() {
    this.uiService.sidenav$.next("click");
  }
  onLogout() {
    this.authService.logut();
  }

}
