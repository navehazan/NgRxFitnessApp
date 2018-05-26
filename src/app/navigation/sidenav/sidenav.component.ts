import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit() {

  }
  toggleSidenav() {
    this.infoService.sidenav$$.next("click");
  }

}
