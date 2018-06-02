import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate;

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
