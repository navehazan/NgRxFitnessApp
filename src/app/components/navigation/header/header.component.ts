import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

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
    this.authService.logut();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}