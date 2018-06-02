import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private trainingService: TrainingService) { }
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ["date", "name", "calories", "duration", "state"];

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercise();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
