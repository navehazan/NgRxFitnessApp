import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.signupForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }
  onSignupSubmit() {
    console.log(this.signupForm.controls)
    console.log(this.maxDate)
  }
}
