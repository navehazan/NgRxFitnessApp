import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from '../../../services/info-service';
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
  constructor(private trainingService: TrainingService) { }


  ngOnInit() {
    this.newTrainingForm = new FormGroup({
      exercise: new FormControl(null)
    })
    this.trainingService.getAviableExercise();
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

}
