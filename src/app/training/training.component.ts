import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { InfoService } from '../services/info-service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  constructor(private infoService: InfoService) { }
  goingTraining = false;
  ngOnInit() {
    const goingTraining = this.infoService.goingTraining$$.pipe(takeUntil(this.ngUnsubscribe));
    goingTraining.subscribe((goingTraining) => {
      this.goingTraining = goingTraining;
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

  }
}
