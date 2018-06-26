import { UiService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../app.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  constructor(private trainingService: TrainingService, private store: Store<fromApp.State>) { }
  goingTraining = false;
  ngOnInit() {
    this.store.select("training").subscribe((state) => {
      if (state.currentExersice) {
        this.goingTraining = true;
      } else {
        this.goingTraining = false;
      }
    })
  }
}
