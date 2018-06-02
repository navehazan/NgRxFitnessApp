import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  constructor(private infoService: InfoService, private authService: AuthService) { }
  isLogin = false;
  ngUnsubscribe = new Subject();
  ngOnInit() {
    const isLogin = this.authService.isLogin.pipe(takeUntil(this.ngUnsubscribe));
    isLogin.subscribe((islog: boolean) => {
      this.isLogin = islog;
    })
  }
  toggleSidenav() {
    this.infoService.sidenav$$.next("click");
  }
  onLogout() {
    this.toggleSidenav();
    this.authService.logut();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
