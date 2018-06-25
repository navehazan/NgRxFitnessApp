import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../app.reducer";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  isLoading = false;
  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.store.select("ui").subscribe((state) => {
      this.isLoading = state && state.isLoading;
    })

    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }
  onLoginSubmit() {
    this.authService.login(this.loginForm.value);
  }

}
