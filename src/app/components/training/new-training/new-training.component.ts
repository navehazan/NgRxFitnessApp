import { takeUntil } from 'rxjs/operators';
import { UiService } from './../../../services/ui.service';
import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/takeUntil';
import { Subject } from "rxjs";
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  newTrainingForm: FormGroup;
  availableExercise: Exercise[];
  ngUnsubscribe$ = new Subject();
  isLoading = false;
  constructor(private trainingService: TrainingService, private uiService: UiService) { }


  ngOnInit() {
    this.uiService.loadingStateChanged$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading
    })
    this.newTrainingForm = new FormGroup({
      exercise: new FormControl(null)
    })
    this.fetchExersices();
    this.trainingService.exercisesChanged$.takeUntil(this.ngUnsubscribe$).subscribe((exercises: Exercise[]) => {
      this.availableExercise = exercises;
    })
  }
  onGoingTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.exercise);
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  fetchExersices() {
    this.trainingService.getAviableExercise();
  }
}
