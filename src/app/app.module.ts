import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { AuthService } from './services/auth.service';
import { TrainingService } from './services/training.service';
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { UiService } from './services/ui.service';
import { AuthModule } from "./modules/auth.module";
import { SharedModule } from './modules/shared.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TrainingModule } from './modules/training.nodule';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    TrainingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
