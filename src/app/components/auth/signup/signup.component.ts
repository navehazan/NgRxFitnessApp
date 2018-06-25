import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../app.reducer";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate;
  isLoading = false;
  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromApp.State>) { }
  ngOnInit() {
    this.store.select("ui").subscribe((state) => {
      this.isLoading = state && state.isLoading;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.signupForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
      birthDay: new FormControl(null),
      agree: new FormControl(null)
    })
  }
  onSignupSubmit() {
    this.authService.registerUser(this.signupForm.value);
  }

}
