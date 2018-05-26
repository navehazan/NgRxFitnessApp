import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { InfoService } from './services/info-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showSidenav = false;
  ngUnsubscribe: Subscription;
  constructor(private infoService: InfoService) { }
  ngOnInit() {
    this.ngUnsubscribe = this.infoService.sidenav$$.subscribe((showNav: string) => {
      this.showSidenav = !this.showSidenav;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}
