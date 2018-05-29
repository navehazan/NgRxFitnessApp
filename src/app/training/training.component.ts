import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { InfoService } from '../services/info-service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subscription;
  constructor(private infoService: InfoService) { }
  goingTraining = false;
  ngOnInit() {
    this.ngUnsubscribe = this.infoService.goingTraining$$.subscribe((goingTraining) => {
      this.goingTraining = goingTraining;
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}
