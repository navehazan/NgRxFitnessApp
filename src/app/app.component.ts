import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { InfoService } from './services/info-service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showSidenav = false;
  ngUnsubscribe = new Subject();
  constructor(private infoService: InfoService, private authService: AuthService) { }
  ngOnInit() {
    const sidenav = this.infoService.sidenav$$.pipe(takeUntil(this.ngUnsubscribe))
    sidenav.subscribe((showNav: string) => {
      this.showSidenav = !this.showSidenav;
    });
    this.authService.initAuthListener();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
