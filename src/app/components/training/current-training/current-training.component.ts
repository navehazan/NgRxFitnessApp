import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';
import { Router } from "@angular/router";
import { TrainingService } from '../../../services/training.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, public router: Router, private trainingService: TrainingService) { }
  ngUnsubscribe = new Subject();
  progress = 0;
  timer;
  currentExercise: Exercise;
  ngOnInit() {
    const currentExersice = this.trainingService.currentTrainingChange$$.pipe(takeUntil(this.ngUnsubscribe));
    currentExersice.subscribe((exrsice: Exercise) => {
      this.currentExercise = exrsice;
    })
    this.startExercise();
  }
  startExercise() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 20
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  stopExercise() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe(resultes => {
      if (resultes) {
        this.trainingService.currentTrainingChange$$.next(null);
      } else {
        this.startExercise();
      }
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
