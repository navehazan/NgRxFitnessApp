import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  constructor(private trainingService: TrainingService) { }
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ["date", "name", "calories", "duration", "state"];

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercise();
    console.log(this.dataSource.data)
  }

}
