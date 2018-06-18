import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info-service';
import { TrainingService } from '../../../services/training.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from "angularfire2/firestore";
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  availableExercise: Exercise[];
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }


  ngOnInit() {
    this.newTrainingForm = new FormGroup({
      exercise: new FormControl(null)
    })
    this.db.collection("aviableExersice").snapshotChanges().map((results) => {
      return results.map((item) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })
    }).subscribe((results: Exercise[]) => {
      this.availableExercise = results;
    })
  }
  onGoingTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.exercise);
  }

}
