import { NgModule } from '@angular/core';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from './shared.module';
@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularFireAuthModule
    ],
    exports: []
})
export class AuthModule { }
