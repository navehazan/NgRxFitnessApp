import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  maxDate;
  ngUnsubscribe$ = new Subject();
  isLoading = false;
  constructor(private authService: AuthService, private uiService: UiService) { }
  ngOnInit() {
    this.uiService.loadingStateChanged$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
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
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
