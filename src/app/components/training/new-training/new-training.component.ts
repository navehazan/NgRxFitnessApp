import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { TrainingService } from '../../../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercise: Exercise[];
  constructor(private trainingService: TrainingService) { }


  ngOnInit() {
    this.availableExercise = this.trainingService.getAviableExercise();
  }
  onGoingTraining() {
    this.trainingService.goingTraining$$.next(true);
  }

}
