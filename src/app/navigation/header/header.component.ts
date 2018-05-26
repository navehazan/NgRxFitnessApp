import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit() {
  }
  toggleSidenav() {
    this.infoService.sidenav$$.next("click");
  }
}
