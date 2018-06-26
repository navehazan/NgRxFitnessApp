import { UiService } from './../../../services/ui.service';
import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../app.reducer";
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  availableExercise: Exercise[];
  isLoading = false;
  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromApp.State>) { }


  ngOnInit() {
    this.store.select("ui").subscribe((state) => {
      this.isLoading = state && state.isLoading;
    })
    this.store.select("training").subscribe((state) => {
      this.availableExercise = state && state.availableExercise;
    })
    this.newTrainingForm = new FormGroup({
      exercise: new FormControl(null)
    })
    this.fetchExersices();
  }
  onGoingTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

  fetchExersices() {
    this.trainingService.getAviableExercise();
  }
}
