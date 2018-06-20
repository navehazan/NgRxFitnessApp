import { UiService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
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
    const goingTraining = this.trainingService.currentTrainingChange$$.pipe(takeUntil(this.ngUnsubscribe));
    goingTraining.subscribe((goingTraining) => {
      goingTraining != null ? this.goingTraining = true : this.goingTraining = false;
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
