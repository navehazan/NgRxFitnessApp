import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { InfoService } from '../../services/info-service';
import { takeUntil } from 'rxjs/operators';
import { TrainingService } from '../../services/training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  constructor(private trainingService: TrainingService) { }
  goingTraining = false;
  ngOnInit() {
    const goingTraining = this.trainingService.goingTraining$$.pipe(takeUntil(this.ngUnsubscribe));
    goingTraining.subscribe((goingTraining) => {
      this.goingTraining = goingTraining;
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

  }
}
