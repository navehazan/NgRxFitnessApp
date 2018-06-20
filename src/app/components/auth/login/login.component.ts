import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm;
  isLoading = false;
  ngUnsubscribe$ = new Subject();
  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.loadingStateChanged$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    })
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }
  onLoginSubmit() {
    this.authService.login(this.loginForm.value);
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
