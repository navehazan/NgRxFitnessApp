import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { TrainingService } from '../../../services/training.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from "angularfire2/firestore";
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  availableExercise: Exercise[];
  db: AngularFirestore;
  constructor(private trainingService: TrainingService) { }


  ngOnInit() {
    this.newTrainingForm = new FormGroup({
      exercise: new FormControl(null)
    })
    // this.db.collection("aviableExersice").valueChanges().subscribe(results => {
    //   console.log(results)
    // })
  }
  onGoingTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

}
