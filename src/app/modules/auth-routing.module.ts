import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { LoginComponent } from '../components/auth/login/login.component';


const routes: Routes = [
    { path: 'signup', component: SignupComponent, },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }